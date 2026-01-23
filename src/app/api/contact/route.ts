import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

interface ContactFormData {
  nombre: string;
  email: string;
  mensaje: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { nombre, email, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_RECEIVER,
      replyTo: email,
      subject: `[Todo con el Pueblo] Nuevo mensaje de contacto de ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626, #1f2937); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Todo con el Pueblo</h1>
            <p style="color: #fecaca; margin: 5px 0 0 0;">Nuevo mensaje de contacto</p>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #1f2937; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
              Información del contacto
            </h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #374151;">Nombre:</td>
                <td style="padding: 10px 0; color: #1f2937;">${nombre}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 10px 0; color: #1f2937;">
                  <a href="mailto:${email}" style="color: #dc2626;">${email}</a>
                </td>
              </tr>
            </table>
            
            <h3 style="color: #1f2937; margin-top: 20px;">Mensaje:</h3>
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626;">
              <p style="color: #374151; line-height: 1.6; margin: 0; white-space: pre-wrap;">${mensaje}</p>
            </div>
          </div>
          
          <div style="background: #1f2937; padding: 15px; text-align: center;">
            <p style="color: #9ca3af; margin: 0; font-size: 12px;">
              Este mensaje fue enviado desde el formulario de contacto de todoconelpueblo.pe
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // También enviar confirmación al usuario
    const confirmationMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Gracias por contactar a Todo con el Pueblo",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626, #1f2937); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Todo con el Pueblo</h1>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #1f2937;">Hola ${nombre},</h2>
            <p style="color: #374151; line-height: 1.6;">
              Gracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje y 
              nos pondremos en contacto contigo lo antes posible.
            </p>
            <p style="color: #374151; line-height: 1.6;">
              Si tienes alguna consulta urgente, no dudes en contactarnos a través de 
              nuestras redes sociales.
            </p>
            <p style="color: #374151; margin-top: 30px;">
              Atentamente,<br/>
              <strong>Equipo Todo con el Pueblo</strong>
            </p>
          </div>
          
          <div style="background: #1f2937; padding: 15px; text-align: center;">
            <p style="color: #9ca3af; margin: 0; font-size: 12px;">
              © ${new Date().getFullYear()} Todo con el Pueblo. Todos los derechos reservados.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(confirmationMailOptions);

    return NextResponse.json({ success: true, message: "Mensaje enviado correctamente" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}
