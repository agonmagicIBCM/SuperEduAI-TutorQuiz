export type Theme = 'light' | 'dark' | 'astral' | 'abyss'

export type ThemeOption = {
  id: Theme
  name: string
  mood: string
  browserColor: string
}

export const themeOptions: ThemeOption[] = [
  { id: 'light', name: 'Light', mood: 'Daylight', browserColor: '#F4EAF5' },
  { id: 'dark', name: 'Dark', mood: 'Midnight', browserColor: '#190F1D' },
  { id: 'astral', name: 'Astral', mood: 'Cosmic realm', browserColor: '#0B1022' },
  { id: 'abyss', name: 'Abyss', mood: 'Crimson eclipse', browserColor: '#100D12' },
]

export function isTheme(value: string | undefined): value is Theme {
  return themeOptions.some((option) => option.id === value)
}
