"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useStore, defaultColors } from "@/store/useStore";
import { useTranslation } from "react-i18next";
import { HexColorPicker } from "react-colorful";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { IconButton } from "@/components/ui/IconButton";
import { ColorPicker } from "@/components/ui/ColorPicker";


export default function AddPlayerModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const { addPlayer, players } = useStore();
  // Auto-select unused color on open - use useEffect to avoid hydration issues
  const [color, setColor] = useState(defaultColors[0]);
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Set unused color on mount (client-side only)
  useEffect(() => {
    const usedColors = new Set(players.map(p => p.color));
    // Find first unused color from default colors
    const availableColor = defaultColors.find(c => !usedColors.has(c)) || defaultColors[0];
    setColor(availableColor);
  }, [players]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPlayer({ name, color, score: 0, step });
    onClose();
  };

  return (
    <AnimatePresence>
      <div key="add-player-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t("addPlayer")}
              </h2>
              <IconButton onClick={onClose} aria-label="Close">
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </IconButton>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={t("playerName")}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Auto-generated if empty"
              />

              <div>
                <Label>Color</Label>
                <div className="mb-2">
                  <ColorPicker
                    colors={defaultColors}
                    selectedColor={color}
                    onColorSelect={setColor}
                    onCustomColorClick={() => setShowColorPicker(!showColorPicker)}
                  />
                </div>
                {showColorPicker && (
                  <div className="mt-2">
                    <HexColorPicker color={color} onChange={setColor} />
                  </div>
                )}
              </div>

              <Input
                label="Step"
                type="number"
                value={step}
                onChange={(e) => setStep(Number(e.target.value))}
                min="1"
              />

              <ButtonGroup className="pt-4">
                <Button variant="outlined" onClick={onClose} className="flex-1">
                  {t("cancel")}
                </Button>
                <Button type="submit" className="flex-1">
                  {t("addPlayer")}
                </Button>
              </ButtonGroup>
            </form>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
