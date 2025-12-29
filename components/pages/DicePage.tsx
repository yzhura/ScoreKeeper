"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Dice1 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import DiceSettingsModal from "@/components/DiceSettingsModal";

export default function DicePage() {
  const { t } = useTranslation();
  const [diceCount, setDiceCount] = useState(1);
  const [diceSides, setDiceSides] = useState(6);
  const [results, setResults] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    setHasRolled(true);
    const newResults: number[] = [];
    let newTotal = 0;

    for (let i = 0; i < diceCount; i++) {
      const roll = Math.floor(Math.random() * diceSides) + 1;
      newResults.push(roll);
      newTotal += roll;
    }

    setTimeout(() => {
      setResults(newResults);
      setTotal(newTotal);
      setIsRolling(false);
    }, 500);
  };

  const handleSettingsChange = (count: number, sides: number) => {
    setDiceCount(count);
    setDiceSides(sides);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("dice")}
          </h1>
        </div>

        {/* Current Settings Display */}
        <div className="text-center mb-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowSettings(true);
            }}
            className="text-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer"
          >
            {diceCount} x d{diceSides}
          </button>
        </div>

        {/* Roll Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            rollDice();
          }}
          disabled={isRolling}
          size="lg"
          className="w-full py-6 mb-6 rounded-2xl flex items-center justify-center"
          isLoading={isRolling}
        >
          <motion.div
            animate={{ rotate: isRolling ? 360 : 0 }}
            transition={{
              duration: 0.5,
              repeat: isRolling ? Infinity : 0,
              ease: "linear",
            }}
            className="mr-3"
          >
            <Dice1 size={32} />
          </motion.div>
          <span className="text-xl font-semibold">{t("rollDice")}</span>
        </Button>

        {/* Results */}
        {results.length > 0 && !isRolling && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="results-card"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-6">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Results
                </p>
                <div className="max-h-64 overflow-y-auto mb-4">
                  <div className="flex justify-center gap-3 flex-wrap p-2">
                    {results.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.02, duration: 0.3 }}
                        className="w-20 h-20 bg-blue-600 text-white rounded-xl flex items-center justify-center text-3xl font-bold shadow-md flex-shrink-0"
                      >
                        {result}
                      </motion.div>
                    ))}
                  </div>
                </div>
                {results.length > 1 && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Total
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {total}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Settings Modal */}
      <DiceSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        diceCount={diceCount}
        diceSides={diceSides}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
}
