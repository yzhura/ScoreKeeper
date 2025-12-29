"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { Player } from "@/store/useStore";

interface PlayersListModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  score: number;
  type: "highest" | "lowest";
}

export default function PlayersListModal({
  isOpen,
  onClose,
  players,
  score,
  type,
}: PlayersListModalProps) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <div key={`players-list-modal-${type}-${score}`} className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md z-10"
        >
          <Card elevate className="p-6 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {type === "highest"
                  ? t("highest") || "Highest"
                  : t("lowest") || "Lowest"}{" "}
                ({score})
              </h2>
              <IconButton onClick={onClose} aria-label="Close">
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </IconButton>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {players.map((player) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: player.color }}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {player.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t("score") || "Score"}: {player.score}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}

