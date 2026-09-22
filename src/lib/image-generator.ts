// src/lib/image-generator.ts
export function generatePlaceholderImage(options: { name: string; category: string }): string {
  const { name, category } = options
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const hue1 = hash % 360
  const hue2 = (hue1 + 40) % 360
  
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="768">' +
    '<defs><linearGradient id="g' + hash + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
    '<stop offset="0%" stop-color="hsl(' + hue1 + ',50%,25%)"/>' +
    '<stop offset="100%" stop-color="hsl(' + hue2 + ',50%,15%)"/>' +
    '</linearGradient></defs>' +
    '<rect width="512" height="768" fill="url(#g' + hash + ')"/>' +
    '<text x="256" y="350" text-anchor="middle" font-size="120" fill="white">' + 
    (category === 'girls' ? '&#128103;' : category === 'guys' ? '&#128104;' : '&#127912;') + 
    '</text>' +
    '<text x="256" y="600" text-anchor="middle" font-size="40" fill="white" font-weight="bold">' + name + '</text>' +
    '</svg>'
  
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
}
