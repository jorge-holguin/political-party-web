export function PrensaSkeleton() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-12 bg-white/20 rounded-lg w-64 mb-4 animate-pulse"></div>
          <div className="h-6 bg-white/10 rounded-lg w-96 animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>

        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-80 bg-gray-200 animate-pulse"></div>
              <div className="p-8 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded-full w-32 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ComitesSkeleton() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-12 bg-white/20 rounded-lg w-64 mb-4 animate-pulse"></div>
          <div className="h-6 bg-white/10 rounded-lg w-96 animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
            <div className="h-96 bg-gray-100 rounded-xl animate-pulse"></div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="h-16 bg-gray-200 rounded-lg mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
              <div className="space-y-2 max-h-80">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RepresentantesSkeleton() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-12 bg-white/20 rounded-lg w-64 mb-4 animate-pulse"></div>
          <div className="h-6 bg-white/10 rounded-lg w-96 animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-gray-100">
          <div className="bg-gradient-to-br from-red-600 to-red-800 p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-white/20 rounded-full animate-pulse"></div>
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="h-6 bg-white/20 rounded-full w-48 mx-auto md:mx-0 animate-pulse"></div>
                <div className="h-10 bg-white/20 rounded w-64 mx-auto md:mx-0 animate-pulse"></div>
                <div className="flex gap-4 justify-center md:justify-start">
                  <div className="h-6 bg-white/20 rounded w-32 animate-pulse"></div>
                  <div className="h-6 bg-white/20 rounded w-32 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse"></div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
