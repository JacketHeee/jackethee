/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_MAPBOX_ACCESS_TOKEN: string
  // thêm các biến khác của bạn ở đây...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
