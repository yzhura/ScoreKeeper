"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Toggle } from "@/components/ui/Toggle";
import { ToggleButton } from "@/components/ui/ToggleButton";
import { IconButton } from "@/components/ui/IconButton";
import { Label } from "@/components/ui/Label";

export default function UISettingsModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const { gameSettings, updateGameSettings, appSettings, updateAppSettings } =
    useStore();

  const handleThemeChange = (theme: "auto" | "light" | "dark") => {
    updateAppSettings({ theme });
  };

  const handleSave = () => {
    // Settings are already updated via direct state changes
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        key="ui-settings-modal"
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
                {t("uiSettings")}
              </h2>
              <IconButton onClick={onClose} aria-label="Close">
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </IconButton>
            </div>

            <div className="space-y-6">
              {/* Theme */}
              <div>
                <Label>{t("theme")}</Label>
                <ButtonGroup>
                  {(["auto", "light", "dark"] as const).map((theme) => (
                    <ToggleButton
                      key={theme}
                      onClick={() => handleThemeChange(theme)}
                      isSelected={appSettings.theme === theme}
                    >
                      {t(theme)}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div>

              {/* View Mode */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>View Mode</Label>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  {t("viewModeHint")}
                </p>
                <ButtonGroup>
                  <ToggleButton
                    onClick={() => updateGameSettings({ viewMode: "table" })}
                    isSelected={gameSettings.viewMode === "table"}
                  >
                    {t("tableView")}
                  </ToggleButton>
                  <ToggleButton
                    onClick={() => updateGameSettings({ viewMode: "grid" })}
                    isSelected={gameSettings.viewMode === "grid"}
                  >
                    {t("gridView")}
                  </ToggleButton>
                </ButtonGroup>
              </div>

              <div className="space-y-3">
                <Toggle
                  label={t("showHighestLowest")}
                  checked={gameSettings.showHighestLowest}
                  onChange={(checked) =>
                    updateGameSettings({ showHighestLowest: checked })
                  }
                />

                <Toggle
                  label={t("showTotalScore")}
                  checked={gameSettings.showTotalScore}
                  onChange={(checked) =>
                    updateGameSettings({ showTotalScore: checked })
                  }
                />
              </div>

              <div className="pt-4">
                <Button onClick={onClose} className="w-full">
                  {t("save")}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
