'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Play, Pause, Square, Plus } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { IconButton } from '@/components/ui/IconButton'

export default function TimerPage() {
  const { t } = useTranslation()
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlay = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleStop = () => {
    setIsRunning(false)
    setTime(0)
  }

  const handleAddMinute = () => {
    setTime((prev) => prev + 60)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          {t('timer')}
        </h1>

        {/* Timer Display */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <Card className="p-12 mb-8">
            <div className="text-center">
              <motion.div
                key={time}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-7xl font-mono font-bold text-gray-900 dark:text-white mb-4"
              >
                {formatTime(time)}
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          {!isRunning ? (
            <IconButton
              onClick={handlePlay}
              variant="success"
              size="lg"
              className="w-16 h-16 rounded-full"
            >
              <Play size={24} fill="white" />
            </IconButton>
          ) : (
            <IconButton
              onClick={handlePause}
              variant="default"
              size="lg"
              className="w-16 h-16 rounded-full bg-yellow-600 hover:bg-yellow-700"
            >
              <Pause size={24} fill="white" />
            </IconButton>
          )}

          <IconButton
            onClick={handleStop}
            variant="danger"
            size="lg"
            className="w-16 h-16 rounded-full"
          >
            <Square size={20} fill="white" />
          </IconButton>

          <IconButton
            onClick={handleAddMinute}
            variant="default"
            size="lg"
            className="w-16 h-16 rounded-full"
          >
            <Plus size={24} />
          </IconButton>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          {t('addMinute')}
        </p>
      </div>
    </div>
  )
}

