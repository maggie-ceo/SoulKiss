// src/lib/ai/image-gen.ts
// Pollinations.ai — Free image generation

const POLLINATIONS_BASE = 'https://image.pollinations.ai/prompt'

export interface ImageGenOptions {
  prompt: string
  width?: number
  height?: number
  seed?: number
}

export function generateImageUrl(options: ImageGenOptions): string {
  const { prompt, width = 512, height = 512, seed } = options
  const encodedPrompt = encodeURIComponent(prompt)
  return `${POLLINATIONS_BASE}/${encodedPrompt}?width=${width}&height=${height}${seed ? `&seed=${seed}` : ''}`
}

export function buildCharacterImagePrompt(
  name: string,
  personality: string,
  context?: string
): string {
  return `portrait of ${name}, ${personality}, beautiful, highly detailed, 8k, cinematic lighting, professional photography${context ? `, ${context}` : ''}`
}
