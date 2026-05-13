/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAPBOX_ACCESS_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.css' {
  const content: Record<string, string>
  export default content
}

declare module '*.css?inline' {
  const content: string
  export default content
}

declare module 'mapbox-gl' {
  export * from 'mapbox-gl'
}
