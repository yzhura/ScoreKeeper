"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store/useStore";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { Input } from "@/components/ui/Input";
import { IconButton } from "@/components/ui/IconButton";
import { Plus, Trash2, Github, MessageCircle } from "lucide-react";

const languages = [
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
  { code: "uk", name: "Українська" },
  { code: "be", name: "Беларуская" },
  { code: "ca", name: "Català" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "pl", name: "Polski" },
  { code: "ro", name: "Română" },
  { code: "nl", name: "Nederlands" },
  { code: "el", name: "Ελληνικά" },
  { code: "cs", name: "Čeština" },
  { code: "hu", name: "Magyar" },
  { code: "sv", name: "Svenska" },
  { code: "fi", name: "Suomi" },
  { code: "da", name: "Dansk" },
  { code: "bg", name: "Български" },
  { code: "hr", name: "Hrvatski" },
  { code: "sk", name: "Slovenčina" },
  { code: "sl", name: "Slovenščina" },
  { code: "lt", name: "Lietuvių" },
  { code: "lv", name: "Latviešu" },
  { code: "et", name: "Eesti" },
  { code: "ga", name: "Gaeilge" },
  { code: "mt", name: "Malti" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "tr", name: "Türkçe" },
  { code: "az", name: "Azərbaycan" },
  { code: "hy", name: "Հայերեն" },
  { code: "ka", name: "ქართული" },
  { code: "th", name: "ไทย" },
  { code: "si", name: "සිංහල" },
];

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const { appSettings, updateAppSettings } = useStore();
  const [editingPoints, setEditingPoints] = useState(false);

  const handleLanguageChange = (lang: string) => {
    updateAppSettings({ language: lang });
    i18n.changeLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  const handleKeepScreenActive = (enabled: boolean) => {
    updateAppSettings({ keepScreenActive: enabled });
    if (enabled && typeof window !== "undefined" && "wakeLock" in navigator) {
      // Request wake lock if supported
      (navigator as any).wakeLock?.request("screen").catch(() => {
        // Ignore errors
      });
    }
  };

  // const handleVibration = (enabled: boolean) => {
  //   updateAppSettings({ vibration: enabled });
  //   if (enabled && typeof window !== "undefined" && "vibrate" in navigator) {
  //     navigator.vibrate(50);
  //   }
  // };

  const handleAddPoint = (value: number) => {
    const newPoints = [...appSettings.defaultPoints, value].sort(
      (a, b) => a - b
    );
    updateAppSettings({ defaultPoints: newPoints });
  };

  const handleRemovePoint = (index: number) => {
    const newPoints = appSettings.defaultPoints.filter((_, i) => i !== index);
    updateAppSettings({ defaultPoints: newPoints });
  };

  const handleEditPoint = (index: number, newValue: number) => {
    const newPoints = [...appSettings.defaultPoints];
    newPoints[index] = newValue;
    newPoints.sort((a, b) => a - b);
    updateAppSettings({ defaultPoints: newPoints });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 mt-4">
          {t("settings")}
        </h1>

        <div className="space-y-6">
          {/* Language */}
          <Section title={t("language")}>
            <Select
              value={appSettings.language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              options={languages.map((lang) => ({
                value: lang.code,
                label: lang.name,
              }))}
            />
          </Section>

          {/* Keep Screen Active */}
          {typeof window !== "undefined" && "wakeLock" in navigator && (
            <Section>
              <Toggle
                label={t("keepScreenActive")}
                checked={appSettings.keepScreenActive}
                onChange={handleKeepScreenActive}
              />
            </Section>
          )}

          {/* Vibration */}
          {/* {typeof window !== "undefined" && "vibrate" in navigator && (
            <Section>
              <Toggle
                label={t("vibration")}
                checked={appSettings.vibration}
                onChange={handleVibration}
              />
            </Section>
          )} */}

          {/* Default Points */}
          <Section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("defaultPoints")}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingPoints(!editingPoints)}
              >
                {editingPoints ? "Done" : "Edit"}
              </Button>
            </div>
            <div className="space-y-2">
              {appSettings.defaultPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  {editingPoints ? (
                    <>
                      <Input
                        type="number"
                        value={point}
                        onChange={(e) =>
                          handleEditPoint(index, Number(e.target.value))
                        }
                        className="flex-1"
                      />
                      <IconButton
                        variant="danger"
                        onClick={() => handleRemovePoint(index)}
                        aria-label="Remove point"
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </>
                  ) : (
                    <div className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                      +{point}
                    </div>
                  )}
                </div>
              ))}
              {editingPoints && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    const newValue = prompt("Enter new point value:");
                    if (newValue && !isNaN(Number(newValue))) {
                      handleAddPoint(Number(newValue));
                    }
                  }}
                  className="w-full border-dashed"
                >
                  <Plus size={18} className="mr-2" />
                  Add Point
                </Button>
              )}
            </div>
          </Section>

          {/* Links Section */}
          <Section title={t("questionsAndImprovements")}>
            <div className="space-y-3">
              <a
                href="https://www.threads.com/@yarikzhuravlov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
              >
                <MessageCircle size={20} className="text-gray-600 dark:text-gray-400" />
                <span className="flex-1">Threads</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">@yarikzhuravlov</span>
              </a>
              <a
                href="https://github.com/yzhura/ScoreKeeper"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
              >
                <Github size={20} className="text-gray-600 dark:text-gray-400" />
                <span className="flex-1">GitHub</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">yzhura/ScoreKeeper</span>
              </a>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
