// src/types/edge-tts.d.ts
declare module 'edge-tts' {
  import { Readable } from 'stream'

  interface MetadataOptions {
    rate?: string
    pitch?: string
    volume?: string
  }

  class EdgeTTS {
    constructor()
    setMetadata(voice: string, options?: MetadataOptions): Promise<void>
    toBuffer(text: string): Promise<Buffer>
    toStream(text: string): Promise<Readable>
    toRaw(text: string): Promise<Readable>
  }

  export { EdgeTTS as default, MetadataOptions }
}
