import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Player {
  id: string
  name: string
  score: number
  color: string
  step: number
}

export interface GameSettings {
  viewMode: 'table' | 'grid'
  showHighestLowest: boolean
  showTotalScore: boolean
}

export interface AppSettings {
  theme: 'auto' | 'light' | 'dark'
  language: string
  keepScreenActive: boolean
  vibration: boolean
  defaultPoints: number[]
}

export interface HistoryEntry {
  id: string
  playerId: string
  playerName: string
  change: number
  newScore: number
  timestamp: number
}

interface AppState {
  players: Player[]
  currentPlayerId: string | null
  gameSettings: GameSettings
  appSettings: AppSettings
  history: HistoryEntry[]
  addPlayer: (player: Omit<Player, 'id'>) => void
  updatePlayer: (id: string, updates: Partial<Player>) => void
  deletePlayer: (id: string) => void
  deleteAllPlayers: () => void
  updateScore: (id: string, points: number) => void
  resetScores: () => void
  setCurrentPlayer: (id: string | null) => void
  updateGameSettings: (settings: Partial<GameSettings>) => void
  updateAppSettings: (settings: Partial<AppSettings>) => void
  clearHistory: () => void
}

const defaultPlayerNames = [
  // Video game characters (largest group)
  // Nintendo
  'Mario', 'Luigi', 'Peach', 'Bowser', 'Yoshi', 'Donkey Kong', 'Wario', 'Waluigi',
  'Link', 'Zelda', 'Ganondorf', 'Samus', 'Kirby', 'Pikachu', 'Charizard', 'Mewtwo',
  'Fox', 'Falco', 'Captain Falcon', 'Ness', 'Lucas', 'Marth', 'Ike', 'Lucina',
  'Shulk', 'Ridley', 'K. Rool', 'Inkling', 'Isabelle', 'Villager', 'Tom Nook',
  // PlayStation exclusives
  'Kratos', 'Atreus', 'Ellie', 'Joel', 'Nathan Drake', 'Aloy', 'Ratchet', 'Clank',
  'Sackboy', 'Spider-Man', 'Jin', 'Delsin', 'Cole', 'Crash', 'Spyro', 'Jak',
  'Daxter', 'Sly', 'Cloud', 'Sephiroth', 'Aerith', 'Tifa', 'Barret', 'Zack',
  // Xbox exclusives
  'Master Chief', 'Cortana', 'Marcus', 'Dom', 'Marcus Fenix', 'Commander Shepard',
  'Geralt', 'Ciri', 'Yennefer', 'Triss', 'Vesemir', 'Dandelion',
  // RPG classics
  'Dragonborn', 'Lydia', 'Serana', 'Paarthurnax', 'Alduin', 'Miraak',
  'Vault Boy', 'Dogmeat', 'Piper', 'Nick', 'Curie', 'Preston',
  'Hawke', 'Alistair', 'Morrigan', 'Leliana', 'Varric', 'Cassandra',
  // Action/Adventure
  'Lara Croft', 'Ezio', 'Altair', 'Edward Kenway', 'Bayek', 'Kassandra',
  'Arthur Morgan', 'John Marston', 'Dutch', 'Micah', 'Sadie', 'Charles',
  'Solid Snake', 'Big Boss', 'Raiden', 'Revolver Ocelot', 'Quiet', 'Venom',
  'Dante', 'Vergil', 'Nero', 'Lady', 'Trish', 'Nico',
  // Fighting games
  'Ryu', 'Ken', 'Chun-Li', 'Guile', 'Akuma', 'M. Bison',
  'Scorpion', 'Sub-Zero', 'Raiden', 'Liu Kang', 'Johnny Cage', 'Sonya',
  'Terry', 'Iori', 'Kyo', 'Mai', 'Geese', 'Rugal',
  // Indie & modern
  'Cuphead', 'Mugman', 'Hollow Knight', 'Ori', 'Shovel Knight', 'Hat Kid',
  'Steve', 'Alex', 'Creeper', 'Enderman', 'Herobrine',
  'Doom Slayer', 'Doomguy', 'BJ Blazkowicz', 'Duke Nukem',
  // Strategy & MOBA
  'Arthas', 'Illidan', 'Thrall', 'Jaina', 'Sylvanas', 'Garrosh',
  'Garen', 'Lux', 'Yasuo', 'Zed', 'Ahri', 'Jinx',
  // Horror games
  'Leon', 'Claire', 'Jill', 'Chris', 'Ada', 'Wesker',
  'Isaac', 'Nemesis', 'Mr. X', 'Tyrant', 'Licker',
  // Original names (kept for compatibility)
  'Vito', 'CJ', 'Sonic', 'Tails', 'Ash', 'Naruto', 'Sasuke', 'Goku', 'Vegeta', 'Batman', 'Superman',
  // D&D characters (strange names)
  'Drizzt', 'Elminster', 'Mordenkainen', 'Tasha', 'Vecna', 'Strahd', 
  'Tiamat', 'Bahamut', 'Xanathar', 'Volo', 'Minsc', 'Boo', 'Drizzt Do\'Urden',
  'Raistlin', 'Tanis', 'Caramon', 'Tasslehoff', 'Fizban', 'Krynn',
  'Acererak', 'Lich', 'Demogorgon', 'Orcus', 'Graz\'zt', 'Yeenoghu',
  // Horror movie characters
  'Pennywise', 'Jigsaw', 'Ghostface', 'Freddy', 'Jason', 'Michael',
  'Leatherface', 'Chucky', 'Pinhead', 'Candyman', 'Samara', 'Regan',
  'Hannibal', 'Norman', 'Dracula', 'Frankenstein', 'Wolfman', 'Mummy',
  'Annabelle', 'Valak', 'Nun', 'Slender', 'Ringu', 'Sadako'
]

export const defaultColors = [
  "#3B82F6", // blue
  "#EF4444", // red
  "#10B981", // green
  "#F59E0B", // amber
  "#8B5CF6", // purple
  "#EC4899", // pink
  "#06B6D4", // cyan
  "#F97316", // orange
]

// Function to get an unused color
function getUnusedColor(usedColors: Set<string>): string {
  // First, try to find an unused color from default colors
  const availableColors = defaultColors.filter(c => !usedColors.has(c))
  if (availableColors.length > 0) {
    return availableColors[Math.floor(Math.random() * availableColors.length)]
  }
  
  // If all default colors are used, generate a random color
  // Try to generate a color that's visually distinct
  let attempts = 0
  while (attempts < 100) {
    const hue = Math.floor(Math.random() * 360)
    const saturation = 60 + Math.floor(Math.random() * 30) // 60-90%
    const lightness = 45 + Math.floor(Math.random() * 15) // 45-60%
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`
    
    if (!usedColors.has(color)) {
      return color
    }
    attempts++
  }
  
  // Fallback: return a random color
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      players: [],
      currentPlayerId: null,
      history: [],
      gameSettings: {
        viewMode: 'grid',
        showHighestLowest: true,
        showTotalScore: false,
      },
      appSettings: {
        theme: 'auto',
        language: 'en',
        keepScreenActive: false,
        vibration: false,
        defaultPoints: [5, 10, 15, 20, 50, 100, 200],
      },
      addPlayer: (player) => {
        const state = useStore.getState()
        const usedNames = new Set(state.players.map(p => p.name))
        const usedColors = new Set(state.players.map(p => p.color))
        
        let name = player.name || ''
        let attempts = 0
        
        // If name is empty, generate one
        if (!name) {
          name = defaultPlayerNames[Math.floor(Math.random() * defaultPlayerNames.length)]
        }
        
        // If name is already used, generate a new one
        while (usedNames.has(name) && attempts < 100) {
          name = defaultPlayerNames[Math.floor(Math.random() * defaultPlayerNames.length)]
          attempts++
        }
        
        // Fallback if all names are used
        if (usedNames.has(name)) {
          name = `Player ${state.players.length + 1}`
        }
        
        // If color is not provided or already used, get an unused color
        let color = player.color
        if (!color || usedColors.has(color)) {
          color = getUnusedColor(usedColors)
        }
        
        set((state) => ({
          players: [
            ...state.players,
            {
              ...player,
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
              name: name,
              color: color,
            },
          ],
        }))
      },
      updatePlayer: (id, updates) =>
        set((state) => ({
          players: state.players.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      deletePlayer: (id) =>
        set((state) => ({
          players: state.players.filter((p) => p.id !== id),
          currentPlayerId: state.currentPlayerId === id ? null : state.currentPlayerId,
        })),
      deleteAllPlayers: () =>
        set({ players: [], currentPlayerId: null, history: [] }),
      updateScore: (id, points) =>
        set((state) => {
          const player = state.players.find((p) => p.id === id)
          if (!player) return state
          
          const newScore = Math.max(0, player.score + points)
          const historyEntry: HistoryEntry = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            playerId: id,
            playerName: player.name,
            change: points,
            newScore: newScore,
            timestamp: Date.now(),
          }
          
          return {
            players: state.players.map((p) =>
              p.id === id ? { ...p, score: newScore } : p
            ),
            history: [historyEntry, ...state.history].slice(0, 100), // Keep last 100 entries
          }
        }),
      resetScores: () =>
        set((state) => ({
          players: state.players.map((p) => ({ ...p, score: 0 })),
        })),
      setCurrentPlayer: (id) => set({ currentPlayerId: id }),
      updateGameSettings: (settings) =>
        set((state) => ({
          gameSettings: { ...state.gameSettings, ...settings },
        })),
      updateAppSettings: (settings) =>
        set((state) => ({
          appSettings: { ...state.appSettings, ...settings },
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'scorekeeper-storage',
    }
  )
)

