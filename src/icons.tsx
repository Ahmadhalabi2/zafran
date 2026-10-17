import { Salad, Beef, Pizza, CakeSlice, CupSoda, BookOpen, Users, Crown, Flame, Sprout, Leaf, WheatOff, Sparkles, Award, type LucideIcon, type LucideProps } from 'lucide-react'
import type { Tag } from './data'

export const catIcon: Record<string, LucideIcon> = { Starters: Salad, Mains: Beef, Pizza, Desserts: CakeSlice, Drinks: CupSoda }
export const secIcon = { study: BookOpen, meeting: Users, vip: Crown }
export const tagIcon: Record<Tag, LucideIcon> = { spicy: Flame, vegan: Sprout, veg: Leaf, gf: WheatOff, new: Sparkles, signature: Award }

export const CatIcon = ({ c, ...p }: { c: string } & LucideProps) => { const I = catIcon[c] ?? Salad; return <I {...p} /> }
export const SecIcon = ({ s, ...p }: { s: keyof typeof secIcon } & LucideProps) => { const I = secIcon[s]; return <I {...p} /> }
