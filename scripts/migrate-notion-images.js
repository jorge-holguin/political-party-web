/**
 * Script to migrate Notion temporary images to Cloudinary
 * 
 * This script:
 * 1. Scans Notion database for images
 * 2. Detects temporary Notion URLs
 * 3. Downloads images
 * 4. Uploads to Cloudinary
 * 5. Updates Notion with permanent Cloudinary URLs
 * 
 * Usage: node scripts/migrate-notion-images.js
 * 
 * Required environment variables:
 * - NOTION_TOKEN
 * - NOTION_PRENSA_DATABASE_ID
 * - CLOUDINARY_CLOUD_NAME
 * - CLOUDINARY_API_KEY
 * - CLOUDINARY_API_SECRET
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

// Configuration from environment variables
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_PRENSA_DATABASE_ID;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// Check if URL is a temporary Notion URL
function isNotionTemporaryUrl(url) {
  if (!url) return false;
  return url.includes('secure.notion-static.com') || 
         url.includes('prod-files-secure.s3') ||
         url.includes('s3.us-west-2.amazonaws.com');
}

// Check if URL is already a Cloudinary URL
function isCloudinaryUrl(url) {
  if (!url) return false;
  return url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
}

// Download image from URL and return as Buffer
async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

// Upload image to Cloudinary
async function uploadToCloudinary(imageBuffer, filename) {
  return new Promise((resolve, reject) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = 'notion-images';
    
    // Create signature
    const crypto = require('crypto');
    const signatureString = `folder=${folder}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
    const signature = crypto.createHash('sha1').update(signatureString).digest('hex');
    
    // Prepare form data
    const boundary = '----CloudinaryBoundary' + Date.now();
    const base64Image = imageBuffer.toString('base64');
    
    const formData = [
      `--${boundary}`,
      `Content-Disposition: form-data; name="file"`,
      '',
      `data:image/jpeg;base64,${base64Image}`,
      `--${boundary}`,
      `Content-Disposition: form-data; name="api_key"`,
      '',
      CLOUDINARY_API_KEY,
      `--${boundary}`,
      `Content-Disposition: form-data; name="timestamp"`,
      '',
      timestamp.toString(),
      `--${boundary}`,
      `Content-Disposition: form-data; name="signature"`,
      '',
      signature,
      `--${boundary}`,
      `Content-Disposition: form-data; name="folder"`,
      '',
      folder,
      `--${boundary}--`
    ].join('\r\n');
    
    const options = {
      hostname: 'api.cloudinary.com',
      path: `/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': Buffer.byteLength(formData)
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.secure_url) {
            resolve(result.secure_url);
          } else {
            reject(new Error(result.error?.message || 'Upload failed'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });
    
    req.on('error', reject);
    req.write(formData);
    req.end();
  });
}

// Update Notion page with new image URL
async function updateNotionPage(pageId, propertyName, newUrl) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      properties: {
        [propertyName]: {
          files: [{
            type: 'external',
            name: 'image',
            external: { url: newUrl }
          }]
        }
      }
    });
    
    const options = {
      hostname: 'api.notion.com',
      path: `/v1/pages/${pageId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    
    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(responseData));
        } else {
          reject(new Error(`Notion update failed: ${res.statusCode} - ${responseData}`));
        }
      });
    });
    
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Query Notion database
async function queryDatabase(startCursor = undefined) {
  return new Promise((resolve, reject) => {
    const body = { page_size: 100 };
    if (startCursor) body.start_cursor = startCursor;
    
    const data = JSON.stringify(body);
    
    const options = {
      hostname: 'api.notion.com',
      path: `/v1/databases/${DATABASE_ID}/query`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    
    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(responseData));
        } else {
          reject(new Error(`Query failed: ${res.statusCode} - ${responseData}`));
        }
      });
    });
    
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Main migration function
async function migrateImages() {
  console.log('🚀 Starting Notion to Cloudinary image migration...\n');
  
  // Validate environment variables
  if (!NOTION_TOKEN || !DATABASE_ID || !CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.error('❌ Missing required environment variables!');
    console.log('Required: NOTION_TOKEN, NOTION_PRENSA_DATABASE_ID, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
    process.exit(1);
  }
  
  let hasMore = true;
  let startCursor = undefined;
  let totalProcessed = 0;
  let totalMigrated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;
  
  while (hasMore) {
    console.log('📖 Querying Notion database...');
    const response = await queryDatabase(startCursor);
    
    for (const page of response.results) {
      totalProcessed++;
      const pageId = page.id;
      const props = page.properties;
      
      // Get title for logging
      const title = props['Título']?.title?.[0]?.plain_text || 'Untitled';
      
      // Check Featured Image property
      const imageProperty = props['Featured Image'];
      if (!imageProperty?.files?.length) {
        console.log(`⏭️  [${totalProcessed}] "${title}" - No image`);
        totalSkipped++;
        continue;
      }
      
      const fileObj = imageProperty.files[0];
      let currentUrl = '';
      
      if (fileObj.type === 'file') {
        currentUrl = fileObj.file?.url || '';
      } else if (fileObj.type === 'external') {
        currentUrl = fileObj.external?.url || '';
      }
      
      // Skip if already on Cloudinary
      if (isCloudinaryUrl(currentUrl)) {
        console.log(`✅ [${totalProcessed}] "${title}" - Already on Cloudinary`);
        totalSkipped++;
        continue;
      }
      
      // Skip if not a temporary Notion URL
      if (!isNotionTemporaryUrl(currentUrl)) {
        console.log(`⏭️  [${totalProcessed}] "${title}" - External URL, skipping`);
        totalSkipped++;
        continue;
      }
      
      // Migrate the image
      console.log(`🔄 [${totalProcessed}] "${title}" - Migrating...`);
      
      try {
        // Download image
        const imageBuffer = await downloadImage(currentUrl);
        console.log(`   ⬇️  Downloaded (${Math.round(imageBuffer.length / 1024)}KB)`);
        
        // Upload to Cloudinary
        const cloudinaryUrl = await uploadToCloudinary(imageBuffer, `notion-${pageId}`);
        console.log(`   ⬆️  Uploaded to Cloudinary`);
        
        // Update Notion
        await updateNotionPage(pageId, 'Featured Image', cloudinaryUrl);
        console.log(`   ✅ Updated Notion with new URL`);
        
        totalMigrated++;
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}`);
        totalErrors++;
      }
    }
    
    hasMore = response.has_more;
    startCursor = response.next_cursor;
  }
  
  console.log('\n========================================');
  console.log('📊 Migration Complete!');
  console.log(`   Total processed: ${totalProcessed}`);
  console.log(`   Migrated: ${totalMigrated}`);
  console.log(`   Skipped: ${totalSkipped}`);
  console.log(`   Errors: ${totalErrors}`);
  console.log('========================================\n');
}

// Run the migration
migrateImages().catch(console.error);
