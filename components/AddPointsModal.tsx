"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Input } from "@/components/ui/Input";
import { IconButton } from "@/components/ui/IconButton";
import { XStack } from "@/components/ui/Stack";

export default function AddPointsModal({
  playerId,
  onClose,
}: {
  playerId: string;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const { players, updateScore, appSettings } = useStore(); // appSettings still needed for defaultPoints
  const player = players.find((p) => p.id === playerId);
  const [customValue, setCustomValue] = useState("");

  if (!player) return null;

  // const vibrate = () => {
  //   if (
  //     appSettings.vibration &&
  //     typeof window !== "undefined" &&
  //     "vibrate" in navigator
  //   ) {
  //     navigator.vibrate(50);
  //   }
  // };

  const handleQuickAdd = (points: number) => {
    updateScore(playerId, points);
    // vibrate();
    onClose();
  };

  const handleCustomAdd = () => {
    const value = Number(customValue);
    if (!isNaN(value) && value !== 0) {
      updateScore(playerId, value);
      setCustomValue("");
      // vibrate();
      onClose();
    }
  };

  const handleCustomSubtract = () => {
    const value = Number(customValue);
    if (!isNaN(value) && value !== 0) {
      updateScore(playerId, -value);
      setCustomValue("");
      // vibrate();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {player && (
        <div
          key={`add-points-modal-${playerId}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
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
            <Card elevate className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t("addPoints")}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {player.name}
                  </p>
                </div>
                <IconButton onClick={onClose} aria-label="Close">
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </IconButton>
              </div>

              <div className="mb-6 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {t("currentScore")}
                </p>
                <motion.p
                  key={player.score}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-4xl font-bold text-gray-900 dark:text-white"
                >
                  {player.score}
                </motion.p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {t("addPoints")}
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {appSettings.defaultPoints.map((points) => (
                      <Button
                        key={points}
                        onClick={() => handleQuickAdd(points)}
                        size="lg"
                      >
                        +{points}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {t("customValue")}
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                      placeholder="0"
                      className="flex-1"
                    />
                    <IconButton
                      variant="danger"
                      onClick={handleCustomSubtract}
                      disabled={!customValue || Number(customValue) === 0}
                      size="md"
                    >
                      <Minus size={20} />
                    </IconButton>
                    <IconButton
                      variant="success"
                      onClick={handleCustomAdd}
                      disabled={!customValue || Number(customValue) === 0}
                      size="md"
                    >
                      <Plus size={20} />
                    </IconButton>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
