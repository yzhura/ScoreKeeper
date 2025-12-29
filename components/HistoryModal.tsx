"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import { useStore, HistoryEntry } from "@/store/useStore";
import ConfirmModal from "./ConfirmModal";

export default function HistoryModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const { history, clearHistory } = useStore();
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const handleClearHistory = () => {
    clearHistory();
    setShowConfirmClear(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          key="history-modal"
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
            <Card elevate className="p-6 max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t("history")}
                </h2>
                <div className="flex items-center gap-2">
                  {history.length > 0 && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => setShowConfirmClear(true)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      {t("clearHistory") || "Clear"}
                    </Button>
                  )}
                  <IconButton onClick={onClose} aria-label="Close">
                    <X size={20} className="text-gray-500 dark:text-gray-400" />
                  </IconButton>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2">
                {history.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                    {t("noHistory")}
                  </p>
                ) : (
                  history.map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {entry.playerName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTime(entry.timestamp)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm font-semibold ${
                            entry.change > 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {entry.change > 0 ? "+" : ""}
                          {entry.change}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {t("total")}: {entry.newScore}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      )}
      {showConfirmClear && (
        <ConfirmModal
          key="confirm-clear-history"
          isOpen={showConfirmClear}
          onClose={() => setShowConfirmClear(false)}
          onConfirm={handleClearHistory}
          title={t("clearHistory") || "Clear History"}
          message={
            t("clearHistoryConfirm") ||
            "This will delete all history entries. This action cannot be undone."
          }
          variant="danger"
        />
      )}
    </AnimatePresence>
  );
}
