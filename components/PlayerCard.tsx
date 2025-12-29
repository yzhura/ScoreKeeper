'use client'

import { motion } from 'framer-motion'
import { Edit2, Minus, Plus } from 'lucide-react'
import { Player, useStore } from '@/store/useStore'
import { IconButton } from '@/components/ui/IconButton'
import { XStack } from '@/components/ui/Stack'

interface PlayerCardProps {
  player: Player
  onEdit: () => void
  onScoreClick: () => void
  onSelect: () => void
  isSelected: boolean
}

export default function PlayerCard({ player, onEdit, onScoreClick, onSelect, isSelected }: PlayerCardProps) {
  const { updateScore } = useStore()

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    updateScore(player.id, player.step)
    // if (appSettings.vibration && typeof window !== 'undefined' && 'vibrate' in navigator) {
    //   navigator.vibrate(50)
    // }
  }

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    updateScore(player.id, -player.step)
    // if (appSettings.vibration && typeof window !== 'undefined' && 'vibrate' in navigator) {
    //   navigator.vibrate(50)
    // }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-xl shadow-lg overflow-hidden border-2 transition-all ${
        isSelected
          ? 'border-blue-500 dark:border-blue-400 shadow-blue-200 dark:shadow-blue-900'
          : 'border-transparent'
      }`}
      style={{ backgroundColor: player.color }}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/10 dark:bg-black/20">
        <h3 className="text-lg font-semibold text-white drop-shadow-md">{player.name}</h3>
        <IconButton
          onClick={(e: any) => {
            e?.stopPropagation?.()
            onEdit()
          }}
          variant="ghost"
          size="sm"
          className="bg-white/20 hover:bg-white/30"
          aria-label="Edit player"
        >
          <Edit2 size={16} className="text-white" />
        </IconButton>
      </div>

      {/* Body */}
      <div className="flex items-center justify-between p-6 bg-white/10 dark:bg-white/5">
        <IconButton
          onClick={(e: any) => {
            e?.stopPropagation?.()
            handleDecrement(e)
          }}
          variant="ghost"
          size="md"
          className="rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40"
          aria-label="Decrease score"
        >
          <Minus size={24} className="text-white" />
        </IconButton>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onScoreClick()
          }}
          className="flex-1 mx-4"
        >
          <motion.div
            key={player.score}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-5xl font-bold text-white drop-shadow-lg text-center"
          >
            {player.score}
          </motion.div>
        </button>

        <IconButton
          onClick={(e: any) => {
            e?.stopPropagation?.()
            handleIncrement(e)
          }}
          variant="ghost"
          size="md"
          className="rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40"
          aria-label="Increase score"
        >
          <Plus size={24} className="text-white" />
        </IconButton>
      </div>
    </motion.div>
  )
}
