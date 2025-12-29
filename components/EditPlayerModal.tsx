"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { useStore, defaultColors } from "@/store/useStore";
import { useTranslation } from "react-i18next";
import { HexColorPicker } from "react-colorful";
import ConfirmModal from "./ConfirmModal";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { IconButton } from "@/components/ui/IconButton";
import { ColorPicker } from "@/components/ui/ColorPicker";

export default function EditPlayerModal({
  playerId,
  onClose,
}: {
  playerId: string;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const { players, updatePlayer, deletePlayer } = useStore();
  const player = players.find((p) => p.id === playerId);

  const [name, setName] = useState("");
  const [color, setColor] = useState("#3B82F6");
  const [step, setStep] = useState(1);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (player) {
      setName(player.name);
      setColor(player.color);
      setStep(player.step);
    }
  }, [player]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlayer(playerId, { name, color, step });
    onClose();
  };

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    deletePlayer(playerId);
    onClose();
  };

  if (!player) return null;

  return (
    <AnimatePresence>
      {player && (
        <div
          key={`edit-player-modal-${playerId}`}
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t("editPlayer")}
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
                />

                <div>
                  <Label>Color</Label>
                  <div className="mb-2">
                    <ColorPicker
                      colors={defaultColors}
                      selectedColor={color}
                      onColorSelect={setColor}
                      onCustomColorClick={() =>
                        setShowColorPicker(!showColorPicker)
                      }
                    />
                  </div>
                  {showColorPicker && (
                    <div className="mt-2">
                      <HexColorPicker color={color} onChange={setColor} />
                    </div>
                  )}
                </div>

                <Input
                  label={t("step")}
                  type="number"
                  value={step}
                  onChange={(e) => setStep(Number(e.target.value))}
                  min="1"
                />

                <ButtonGroup className="pt-4 flex justify-between flex-wrap">
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={handleDelete}
                    className="flex justify-center items-center border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={16} className="mr-2 flex-shrink-0" />
                    {t("deletePlayer")}
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={onClose}
                    className="flex-1"
                  >
                    {t("cancel")}
                  </Button>
                  <Button type="submit" className="flex-1">
                    {t("save")}
                  </Button>
                </ButtonGroup>
              </form>
            </Card>
          </motion.div>
        </div>
      )}
      {showConfirmDelete && (
        <ConfirmModal
          key={`confirm-delete-player-${playerId}`}
          isOpen={showConfirmDelete}
          onClose={() => setShowConfirmDelete(false)}
          onConfirm={confirmDelete}
          title={t("deletePlayer")}
          message={t("deletePlayerConfirm")}
          variant="danger"
        />
      )}
    </AnimatePresence>
  );
}
