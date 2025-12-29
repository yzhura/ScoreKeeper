"use client";

import { useState } from "react";
import CounterPage from "@/components/pages/CounterPage";
import DicePage from "@/components/pages/DicePage";
import TimerPage from "@/components/pages/TimerPage";
import SettingsPage from "@/components/pages/SettingsPage";
import BottomNavigation from "@/components/BottomNavigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "counter" | "dice" | "timer" | "settings"
  >("counter");

  const pages = {
    counter: CounterPage,
    dice: DicePage,
    timer: TimerPage,
    settings: SettingsPage,
  };

  const ActivePage = pages[activeTab];

  return (
    <div className="flex flex-col h-screen bg-background">
      <main className="flex-1 overflow-y-auto pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="h-full"
          >
            <ActivePage />
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
