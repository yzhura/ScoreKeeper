"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Home, Dice1, Timer, Settings } from "lucide-react";

interface BottomNavigationProps {
  activeTab: "counter" | "dice" | "timer" | "settings";
  setActiveTab: (tab: "counter" | "dice" | "timer" | "settings") => void;
}

export default function BottomNavigation({
  activeTab,
  setActiveTab,
}: BottomNavigationProps) {
  const { t } = useTranslation();

  const tabs = [
    { id: "counter" as const, icon: Home, label: t("counter") },
    { id: "dice" as const, icon: Dice1, label: t("dice") },
    { id: "timer" as const, icon: Timer, label: t("timer") },
    { id: "settings" as const, icon: Settings, label: t("settings") },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex justify-around items-center h-16 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-t-lg"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <motion.div
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="relative z-10"
              >
                <Icon
                  size={24}
                  className={
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  }
                />
              </motion.div>
              <span
                className={`text-xs mt-1 relative z-10 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
