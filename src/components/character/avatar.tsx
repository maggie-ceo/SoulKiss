// src/components/character/avatar.tsx
// CSS-only character avatar with unique visual identity per character

interface AvatarProps {
  name: string
  category: string
  size?: 'sm' | 'md' | 'lg'
}

// Generate unique avatar based on name hash
function generateAvatarData(name: string, category: string) {
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  
  // Skin tones
  const skinTones = ['#FFDAB9', '#F5DEB3', '#DEB887', '#D2B48C', '#C4A484', '#8B7355', '#6B4423']
  const skinTone = skinTones[hash % skinTones.length]
  
  // Hair colors
  const hairColors = ['#2C1B18', '#4A3728', '#8B4513', '#D2691E', '#FFD700', '#FF6B35', '#8B008B', '#4B0082']
  const hairColor = hairColors[(hash * 7) % hairColors.length]
  
  // Background gradient based on category
  const bgColors: Record<string, string[]> = {
    girls: ['#ec4899', '#a855f7', '#6366f1'],
    guys: ['#3b82f6', '#06b6d4', '#10b981'],
    anime: ['#a855f7', '#ec4899', '#f43f5e'],
    mature: ['#f43f5e', '#ec4899', '#8b5cf6'],
    fantasy: ['#10b981', '#06b6d4', '#3b82f6'],
  }
  const bg = bgColors[category] || bgColors.girls
  
  return { skinTone, hairColor, bg, hash }
}

export function CharacterAvatar({ name, category, size = 'md' }: AvatarProps) {
  const { skinTone, hairColor, bg, hash } = generateAvatarData(name, category)
  
  const sizeClasses = {
    sm: 'h-10 w-10 text-lg',
    md: 'h-16 w-16 text-3xl',
    lg: 'h-24 w-24 text-5xl',
  }
  
  const initials = name.charAt(0).toUpperCase()
  
  // Hair style based on hash
  const hairStyle = hash % 3
  
  return (
    <div 
      className={`relative rounded-full ${sizeClasses[size]} overflow-hidden ring-2 ring-white/20 shadow-lg`}
      style={{ background: `linear-gradient(135deg, ${bg[0]}, ${bg[1]}, ${bg[2]})` }}
    >
      {/* Face */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {/* Hair Back */}
        {hairStyle === 0 && (
          <ellipse cx="50" cy="35" rx="35" ry="30" fill={hairColor} />
        )}
        {hairStyle === 1 && (
          <>
            <ellipse cx="50" cy="30" rx="32" ry="25" fill={hairColor} />
            <rect x="20" y="25" width="15" height="30" rx="5" fill={hairColor} />
            <rect x="65" y="25" width="15" height="30" rx="5" fill={hairColor} />
          </>
        )}
        {hairStyle === 2 && (
          <>
            <ellipse cx="50" cy="28" rx="30" ry="22" fill={hairColor} />
            <ellipse cx="30" cy="45" rx="8" ry="15" fill={hairColor} />
            <ellipse cx="70" cy="45" rx="8" ry="15" fill={hairColor} />
          </>
        )}
        
        {/* Face */}
        <ellipse cx="50" cy="55" rx="25" ry="28" fill={skinTone} />
        
        {/* Eyes */}
        <ellipse cx="40" cy="50" rx="4" ry="5" fill="#1a1a1a" />
        <ellipse cx="60" cy="50" rx="4" ry="5" fill="#1a1a1a" />
        <circle cx="41" cy="49" r="1.5" fill="white" />
        <circle cx="61" cy="49" r="1.5" fill="white" />
        
        {/* Mouth */}
        <path d="M 42 65 Q 50 72 58 65" stroke="#c44" strokeWidth="2" fill="none" strokeLinecap="round" />
        
        {/* Hair Front */}
        {hairStyle === 0 && (
          <path d="M 20 35 Q 50 10 80 35 Q 75 25 50 20 Q 25 25 20 35" fill={hairColor} />
        )}
        {hairStyle === 1 && (
          <path d="M 18 40 Q 50 15 82 40 Q 80 30 50 25 Q 20 30 18 40" fill={hairColor} />
        )}
        {hairStyle === 2 && (
          <path d="M 22 38 Q 50 18 78 38 Q 75 28 50 22 Q 25 28 22 38" fill={hairColor} />
        )}
      </svg>
      
      {/* Fallback initial */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white/30 font-bold">{initials}</span>
      </div>
    </div>
  )
}

export function CharacterAvatarCard({ name, category, size = 'md' }: AvatarProps) {
  const { skinTone, hairColor, bg, hash } = generateAvatarData(name, category)
  const initials = name.charAt(0).toUpperCase()
  const hairStyle = hash % 3
  
  return (
    <div 
      className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10"
      style={{ background: `linear-gradient(135deg, ${bg[0]}dd, ${bg[1]}99, ${bg[2]}dd)` }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-black/20 blur-2xl" />
      </div>
      
      {/* Face */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {/* Hair Back */}
        {hairStyle === 0 && (
          <ellipse cx="50" cy="35" rx="38" ry="32" fill={hairColor} />
        )}
        {hairStyle === 1 && (
          <>
            <ellipse cx="50" cy="30" rx="35" ry="28" fill={hairColor} />
            <rect x="15" y="25" width="18" height="35" rx="6" fill={hairColor} />
            <rect x="67" y="25" width="18" height="35" rx="6" fill={hairColor} />
          </>
        )}
        {hairStyle === 2 && (
          <>
            <ellipse cx="50" cy="28" rx="33" ry="25" fill={hairColor} />
            <ellipse cx="25" y="48" rx="10" ry="18" fill={hairColor} />
            <ellipse cx="75" y="48" rx="10" ry="18" fill={hairColor} />
          </>
        )}
        
        {/* Face */}
        <ellipse cx="50" cy="58" rx="28" ry="32" fill={skinTone} />
        
        {/* Eyes */}
        <ellipse cx="38" cy="52" rx="5" ry="6" fill="#1a1a1a" />
        <ellipse cx="62" cy="52" rx="5" ry="6" fill="#1a1a1a" />
        <circle cx="39" cy="51" r="2" fill="white" />
        <circle cx="63" cy="51" r="2" fill="white" />
        
        {/* Eyebrows */}
        <path d="M 30 44 Q 38 40 46 44" stroke="#1a1a1a" strokeWidth="2" fill="none" />
        <path d="M 54 44 Q 62 40 70 44" stroke="#1a1a1a" strokeWidth="2" fill="none" />
        
        {/* Nose */}
        <path d="M 50 55 Q 48 62 50 65 Q 52 62 50 55" fill={skinTone} stroke="#00000020" strokeWidth="0.5" />
        
        {/* Mouth */}
        <path d="M 40 72 Q 50 80 60 72" stroke="#c44" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        
        {/* Hair Front */}
        {hairStyle === 0 && (
          <path d="M 15 38 Q 50 5 85 38 Q 80 25 50 18 Q 20 25 15 38" fill={hairColor} />
        )}
        {hairStyle === 1 && (
          <path d="M 12 42 Q 50 8 88 42 Q 85 28 50 20 Q 15 28 12 42" fill={hairColor} />
        )}
        {hairStyle === 2 && (
          <path d="M 18 40 Q 50 10 82 40 Q 80 28 50 22 Q 20 28 18 40" fill={hairColor} />
        )}
      </svg>
      
      {/* Name overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
        <p className="text-center text-white text-xs font-medium drop-shadow">{name}</p>
      </div>
    </div>
  )
}
