"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { IconButton } from "@/components/ui/IconButton";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  variant = "warning",
}: ConfirmModalProps) {
  const { t } = useTranslation();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const variantStyles = {
    danger: {
      button: "bg-red-600 hover:bg-red-700 text-white",
      icon: "text-red-600 dark:text-red-400",
    },
    warning: {
      button: "bg-yellow-600 hover:bg-yellow-700 text-white",
      icon: "text-yellow-600 dark:text-yellow-400",
    },
    info: {
      button: "bg-blue-600 hover:bg-blue-700 text-white",
      icon: "text-blue-600 dark:text-blue-400",
    },
  };

  const styles = variantStyles[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`p-2 rounded-full ${
                    variant === "danger"
                      ? "bg-red-50 dark:bg-red-900/20"
                      : variant === "warning"
                      ? "bg-yellow-50 dark:bg-yellow-900/20"
                      : "bg-blue-50 dark:bg-blue-900/20"
                  }`}
                >
                  <AlertTriangle size={24} className={styles.icon} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {message}
                  </p>
                </div>
                <IconButton onClick={onClose} aria-label="Close">
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </IconButton>
              </div>

              <ButtonGroup>
                <Button variant="outlined" onClick={onClose} className="flex-1">
                  {cancelText || t("cancel")}
                </Button>
                <Button
                  variant={variant === "danger" ? "danger" : variant === "warning" ? "default" : "default"}
                  onClick={handleConfirm}
                  className={`flex-1 ${variant === "warning" ? "bg-yellow-600 hover:bg-yellow-700" : ""}`}
                >
                  {confirmText || t("confirm")}
                </Button>
              </ButtonGroup>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

