// src/lib/characters-data.ts
// Character data with real AI-generated portraits + SVG fallbacks
import { generatePlaceholderImage } from './image-generator'

export interface Character {
  id: string
  name: string
  age: number
  category: string
  personality: string
  tags: string[]
  isNsfw: boolean
  isPrivate: boolean
  isNew: boolean
  chatCount: number
  likeCount: number
  imageUrl: string
}

// Real images (generated via Microsoft Designer)
const REAL_IMAGES: Record<string, string> = {
  Sophia: '/characters/Sophia.png',
  Luna: '/characters/Luna.png',
  Raven: '/characters/Raven.png',
  Kai: '/characters/Kai.png',
  Aria: '/characters/Aria.png',
}

const characterData: Omit<Character, 'imageUrl'>[] = [
  {
    id: "1",
    name: "Sophia",
    age: 22,
    category: "girls",
    personality: "Sophia is a caring and supportive college student with a secret romantic side.",
    tags: ["caring", "romantic", "college", "art"],
    isNsfw: false,
    isPrivate: false,
    isNew: true,
    chatCount: 12500,
    likeCount: 3400,
  },
  {
    id: "2",
    name: "Luna",
    age: 19,
    category: "anime",
    personality: "Luna is a mysterious goth girl with a hidden sweet side.",
    tags: ["goth", "mysterious", "sweet", "poetry"],
    isNsfw: false,
    isPrivate: false,
    isNew: true,
    chatCount: 8900,
    likeCount: 2100,
  },
  {
    id: "3",
    name: "Raven",
    age: 28,
    category: "mature",
    personality: "Raven is a powerful, confident woman who commands every room.",
    tags: ["dominant", "CEO", "confident", "ambitious"],
    isNsfw: true,
    isPrivate: true,
    isNew: false,
    chatCount: 15200,
    likeCount: 4500,
  },
  {
    id: "4",
    name: "Kai",
    age: 24,
    category: "guys",
    personality: "Kai is a sweet and supportive guy next door.",
    tags: ["caring", "supportive", "neighbor", "sweet"],
    isNsfw: false,
    isPrivate: false,
    isNew: false,
    chatCount: 4300,
    likeCount: 1200,
  },
  {
    id: "5",
    name: "Aria",
    age: 20,
    category: "girls",
    personality: "Aria is a shy librarian who finds confidence in you.",
    tags: ["shy", "librarian", "bookworm", "gentle"],
    isNsfw: false,
    isPrivate: false,
    isNew: true,
    chatCount: 5600,
    likeCount: 1500,
  },
  {
    id: "6",
    name: "Mia",
    age: 25,
    category: "mature",
    personality: "Mia is a bold and passionate woman.",
    tags: ["bold", "passionate", "adventurous", "spontaneous"],
    isNsfw: true,
    isPrivate: true,
    isNew: false,
    chatCount: 3200,
    likeCount: 890,
  },
  {
    id: "7",
    name: "Zane",
    age: 27,
    category: "guys",
    personality: "Zane is a cool and charming guy with a mysterious edge.",
    tags: ["cool", "charming", "mysterious", "witty"],
    isNsfw: false,
    isPrivate: false,
    isNew: false,
    chatCount: 2800,
    likeCount: 750,
  },
  {
    id: "8",
    name: "Lila",
    age: 21,
    category: "girls",
    personality: "Lila is an energetic and bubbly college student.",
    tags: ["energetic", "bubbly", "optimistic", "funny"],
    isNsfw: false,
    isPrivate: false,
    isNew: true,
    chatCount: 4100,
    likeCount: 1100,
  },
  {
    id: "9",
    name: "Niko",
    age: 23,
    category: "guys",
    personality: "Niko is a brooding artist with a soft heart.",
    tags: ["artist", "brooding", "deep", "creative"],
    isNsfw: false,
    isPrivate: true,
    isNew: false,
    chatCount: 1900,
    likeCount: 520,
  },
  {
    id: "10",
    name: "Ember",
    age: 26,
    category: "anime",
    personality: "Ember is a fierce anime warrior with a gentle soul.",
    tags: ["fierce", "warrior", "loyal", "brave"],
    isNsfw: false,
    isPrivate: false,
    isNew: false,
    chatCount: 3400,
    likeCount: 950,
  },
  {
    id: "11",
    name: "Skye",
    age: 18,
    category: "girls",
    personality: "Skye is a dreamy and ethereal girl.",
    tags: ["dreamy", "ethereal", "creative", "whimsical"],
    isNsfw: false,
    isPrivate: false,
    isNew: true,
    chatCount: 2200,
    likeCount: 680,
  },
  {
    id: "12",
    name: "Rex",
    age: 29,
    category: "guys",
    personality: "Rex is a rugged and adventurous guy.",
    tags: ["rugged", "adventurous", "protective", "alpha"],
    isNsfw: false,
    isPrivate: true,
    isNew: false,
    chatCount: 2600,
    likeCount: 820,
  }
]

// Build final character list with images
export const CHARACTERS: Character[] = characterData.map((char) => ({
  ...char,
  imageUrl: REAL_IMAGES[char.name] || generatePlaceholderImage({ name: char.name, category: char.category }),
}))

export function getCharacterById(id: string): Character | undefined {
  return CHARACTERS.find((c) => c.id === id)
}

export function getCharactersByCategory(category: string): Character[] {
  return CHARACTERS.filter((c) => c.category === category)
}
