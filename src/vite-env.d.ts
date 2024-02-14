/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_API_URL: string
    readonly VITE_APP_PATH: string
    // 다른 환경 변수들에 대한 타입 정의...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }