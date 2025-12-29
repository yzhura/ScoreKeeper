"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { ToggleButton } from "@/components/ui/ToggleButton";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Input } from "@/components/ui/Input";

interface DiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  diceCount: number;
  diceSides: number;
  onSettingsChange: (count: number, sides: number) => void;
}

export default function DiceSettingsModal({
  isOpen,
  onClose,
  diceCount,
  diceSides,
  onSettingsChange,
}: DiceSettingsModalProps) {
  const { t } = useTranslation();
  const [localDiceCount, setLocalDiceCount] = useState(diceCount);
  const [localDiceSides, setLocalDiceSides] = useState(diceSides);
  const [showCustomCount, setShowCustomCount] = useState(false);
  const [showCustomSides, setShowCustomSides] = useState(false);
  const [customCount, setCustomCount] = useState("");
  const [customSides, setCustomSides] = useState("");

  const diceCountOptions = [1, 2, 4];
  const diceSidesOptions = [4, 6, 8, 10, 12, 20];

  useEffect(() => {
    if (isOpen) {
      setLocalDiceCount(diceCount);
      setLocalDiceSides(diceSides);
      // Check if current values are custom
      const isCustomCount = !diceCountOptions.includes(diceCount);
      const isCustomSides = !diceSidesOptions.includes(diceSides);
      setShowCustomCount(isCustomCount);
      setShowCustomSides(isCustomSides);
      if (isCustomCount) {
        setCustomCount(diceCount.toString());
      } else {
        setCustomCount("");
      }
      if (isCustomSides) {
        setCustomSides(diceSides.toString());
      } else {
        setCustomSides("");
      }
    }
  }, [diceCount, diceSides, isOpen]);

  const handleCountSelect = (count: number | "custom") => {
    if (count === "custom") {
      setShowCustomCount(true);
      if (!customCount) {
        setCustomCount("1");
        setLocalDiceCount(1);
      }
    } else {
      setShowCustomCount(false);
      setLocalDiceCount(count);
      setCustomCount("");
    }
  };

  const handleSidesSelect = (sides: number | "custom") => {
    if (sides === "custom") {
      setShowCustomSides(true);
      if (!customSides) {
        setCustomSides("4");
        setLocalDiceSides(4);
      }
    } else {
      setShowCustomSides(false);
      setLocalDiceSides(sides);
      setCustomSides("");
    }
  };

  const handleCustomCountChange = (value: string) => {
    setCustomCount(value);
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 99) {
      setLocalDiceCount(numValue);
    }
  };

  const handleCustomSidesChange = (value: string) => {
    setCustomSides(value);
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue >= 2 && numValue <= 99) {
      setLocalDiceSides(numValue);
    }
  };

  const handleSave = () => {
    // Validate values before saving
    const finalCount = showCustomCount && customCount 
      ? Math.max(1, Math.min(99, Number(customCount) || 1))
      : localDiceCount;
    const finalSides = showCustomSides && customSides
      ? Math.max(2, Math.min(99, Number(customSides) || 4))
      : localDiceSides;
    
    onSettingsChange(finalCount, finalSides);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div key="dice-settings-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
                  {t("diceSettings") || "Dice Settings"}
                </h2>
                <IconButton onClick={onClose} aria-label="Close">
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </IconButton>
              </div>

              <div className="space-y-6">
                {/* Dice Count */}
                <div>
                  <Label>{t("diceCount")}</Label>
                  <ButtonGroup className="flex-wrap">
                    {diceCountOptions.map((count) => (
                      <ToggleButton
                        key={count}
                        onClick={() => handleCountSelect(count)}
                        isSelected={
                          !showCustomCount && localDiceCount === count
                        }
                      >
                        {count}x
                      </ToggleButton>
                    ))}
                    <ToggleButton
                      onClick={() => handleCountSelect("custom")}
                      isSelected={showCustomCount}
                    >
                      X
                    </ToggleButton>
                  </ButtonGroup>
                  {showCustomCount && (
                    <div className="mt-3">
                      <Input
                        type="number"
                        min="1"
                        max="99"
                        value={customCount}
                        onChange={(e) => handleCustomCountChange(e.target.value)}
                        placeholder="1-99"
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {t("enterValue") || "Enter value from 1 to 99"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Dice Sides */}
                <div>
                  <Label>{t("diceSides")}</Label>
                  <ButtonGroup className="flex-wrap">
                    {diceSidesOptions.map((sides) => (
                      <ToggleButton
                        key={sides}
                        onClick={() => handleSidesSelect(sides)}
                        isSelected={
                          !showCustomSides && localDiceSides === sides
                        }
                      >
                        d{sides}
                      </ToggleButton>
                    ))}
                    <ToggleButton
                      onClick={() => handleSidesSelect("custom")}
                      isSelected={showCustomSides}
                    >
                      X
                    </ToggleButton>
                  </ButtonGroup>
                  {showCustomSides && (
                    <div className="mt-3">
                      <Input
                        type="number"
                        min="2"
                        max="99"
                        value={customSides}
                        onChange={(e) => handleCustomSidesChange(e.target.value)}
                        placeholder="2-99"
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {t("enterValue") || "Enter value from 2 to 99"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <div className="pt-4">
                  <Button onClick={handleSave} className="w-full">
                    {t("save")}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

