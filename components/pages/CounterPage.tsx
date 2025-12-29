"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useStore, defaultColors } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  History,
  Settings as SettingsIcon,
  Edit2,
  X,
  Check,
  Trophy,
  TrendingDown,
  Equal,
  Users,
} from "lucide-react";
import PlayerCard from "@/components/PlayerCard";
import AddPlayerModal from "@/components/AddPlayerModal";
import EditPlayerModal from "@/components/EditPlayerModal";
import AddPointsModal from "@/components/AddPointsModal";
import UISettingsModal from "@/components/UISettingsModal";
import ConfirmModal from "@/components/ConfirmModal";
import HistoryModal from "@/components/HistoryModal";
import PlayersListModal from "@/components/PlayersListModal";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";

export default function CounterPage() {
  const { t } = useTranslation();
  const {
    players,
    currentPlayerId,
    gameSettings,
    setCurrentPlayer,
    resetScores,
    deleteAllPlayers,
    addPlayer,
  } = useStore();
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [showUISettings, setShowUISettings] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [addingPointsPlayerId, setAddingPointsPlayerId] = useState<
    string | null
  >(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    variant?: "danger" | "warning" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    variant: "warning",
  });
  const [scoreOrder, setScoreOrder] = useState<
    "highest-first" | "lowest-first"
  >("highest-first");
  const [showPlayersList, setShowPlayersList] = useState(false);
  const [playersListData, setPlayersListData] = useState<{
    players: typeof players;
    score: number;
    type: "highest" | "lowest";
  } | null>(null);
  const theme = useTheme();
  const playersContainerRef = useRef<HTMLDivElement>(null);
  const previousPlayersCountRef = useRef(players.length);

  const handleQuickAddPlayer = () => {
    // Color will be automatically selected to avoid duplicates
    addPlayer({
      name: "",
      color: "", // Empty color will trigger automatic selection
      score: 0,
      step: 1,
    });
  };

  // Scroll to bottom when a new player is added
  useEffect(() => {
    if (
      players.length > previousPlayersCountRef.current &&
      players.length > 0
    ) {
      // A new player was added
      setTimeout(() => {
        const lastPlayerCard = playersContainerRef.current?.querySelector(
          "[data-player-card]:last-child"
        ) as HTMLElement;

        if (lastPlayerCard) {
          // Scroll to the last player card
          lastPlayerCard.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        } else {
          // Fallback: scroll window to bottom
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 150); // Small delay to ensure DOM is updated and animation started
    }
    previousPlayersCountRef.current = players.length;
  }, [players.length]);

  const currentPlayer = players.find((p) => p.id === currentPlayerId);
  const headerTitle = currentPlayer ? currentPlayer.name : t("appName");

  // Find players with highest and lowest scores
  const highestScore =
    players.length > 0 ? Math.max(...players.map((p) => p.score)) : 0;
  const lowestScore =
    players.length > 0 ? Math.min(...players.map((p) => p.score)) : 0;

  const highestScorePlayers = players.filter((p) => p.score === highestScore);
  const lowestScorePlayers = players.filter((p) => p.score === lowestScore);

  // Get first player name only
  const highestPlayerName =
    highestScorePlayers.length > 0 ? highestScorePlayers[0].name : "";
  const hasMultipleHighest = highestScorePlayers.length > 1;

  const lowestPlayerName =
    lowestScorePlayers.length > 0 ? lowestScorePlayers[0].name : "";
  const hasMultipleLowest = lowestScorePlayers.length > 1;

  const totalScore = players.reduce((sum, p) => sum + p.score, 0);

  // Check if any player has score != 0
  const hasNonZeroScore = players.some((p) => p.score !== 0);

  // Only show highest/lowest if there are non-zero scores
  const shouldShowScores =
    (gameSettings.showHighestLowest || hasNonZeroScore) && hasNonZeroScore;

  const handleResetScores = () => {
    setShowSettingsMenu(false);
    setConfirmModal({
      isOpen: true,
      title: t("resetScore"),
      message: t("resetScoreConfirm"),
      onConfirm: () => {
        resetScores();
      },
      variant: "warning",
    });
  };

  const handleDeleteAll = () => {
    setShowSettingsMenu(false);
    setConfirmModal({
      isOpen: true,
      title: t("deleteAll"),
      message: t("deleteAllConfirm"),
      onConfirm: () => {
        deleteAllPlayers();
      },
      variant: "danger",
    });
  };

  const isOdd = players.length % 2 !== 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex-1 min-w-0">
            <h1
              className={`text-lg font-semibold text-gray-900 dark:text-white truncate ${
                shouldShowScores && players.length > 0
                  ? "cursor-pointer hover:opacity-80 transition-opacity"
                  : ""
              }`}
              onClick={() => {
                if (shouldShowScores && players.length > 0) {
                  setScoreOrder(
                    scoreOrder === "highest-first"
                      ? "lowest-first"
                      : "highest-first"
                  );
                }
              }}
            >
              {shouldShowScores && players.length > 0 ? (
                scoreOrder === "highest-first" ? (
                  <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <Trophy size={18} className="inline" />
                    {highestPlayerName} ({highestScore})
                    {hasMultipleHighest && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayersListData({
                            players: highestScorePlayers,
                            score: highestScore,
                            type: "highest",
                          });
                          setShowPlayersList(true);
                        }}
                        className="ml-2 px-2 py-0.5 rounded-md bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors text-green-700 dark:text-green-300 font-medium text-xs flex items-center gap-1"
                        aria-label="Show all players with this score"
                        title={`${highestScorePlayers.length} ${
                          t("players") || "players"
                        } with this score`}
                      >
                        <Equal size={14} />
                        <span>{highestScorePlayers.length}</span>
                      </button>
                    )}
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <TrendingDown size={18} className="inline" />
                    {lowestPlayerName} ({lowestScore})
                    {hasMultipleLowest && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayersListData({
                            players: lowestScorePlayers,
                            score: lowestScore,
                            type: "lowest",
                          });
                          setShowPlayersList(true);
                        }}
                        className="ml-2 px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-red-700 dark:text-red-300 font-medium text-xs flex items-center gap-1"
                        aria-label="Show all players with this score"
                        title={`${lowestScorePlayers.length} ${
                          t("players") || "players"
                        } with this score`}
                      >
                        <Equal size={14} />
                        <span>{lowestScorePlayers.length}</span>
                      </button>
                    )}
                  </span>
                )
              ) : (
                headerTitle
              )}
            </h1>
            {gameSettings.showTotalScore && players.length > 0 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {t("total")}: {totalScore}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <IconButton
              onClick={handleQuickAddPlayer}
              onContextMenu={(e) => {
                e.preventDefault();
                setShowAddPlayer(true);
              }}
              aria-label={t("addPlayer")}
              title={`${t("addPlayer")} (Click) / ${t("addPlayer")} with ${t(
                "settings"
              )} (Right-click)`}
            >
              <Plus size={20} className="text-gray-700 dark:text-gray-300" />
            </IconButton>

            <IconButton
              onClick={() => setShowHistory(true)}
              aria-label={t("history")}
            >
              <History size={20} className="text-gray-700 dark:text-gray-300" />
            </IconButton>

            <div className="relative">
              <IconButton
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                aria-label={t("settings")}
              >
                <SettingsIcon
                  size={20}
                  className="text-gray-700 dark:text-gray-300"
                />
              </IconButton>

              <AnimatePresence>
                {showSettingsMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowSettingsMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 overflow-hidden"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowUISettings(true);
                          setShowSettingsMenu(false);
                        }}
                        className="w-full justify-start"
                      >
                        {t("uiSettings")}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleResetScores}
                        className="w-full justify-start"
                      >
                        {t("resetScore")}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDeleteAll}
                        className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        {t("deleteAll")}
                      </Button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Players Grid/Table */}
      <div className="p-4" ref={playersContainerRef}>
        {players.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-64 text-center"
          >
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {t("addPlayer")}
            </p>
            <Button onClick={handleQuickAddPlayer} size="lg">
              <Plus size={20} className="inline mr-2" />
              {t("addPlayer")}
            </Button>
          </motion.div>
        ) : (
          <div
            className={
              gameSettings.viewMode === "grid"
                ? `grid gap-4 ${
                    isOdd && players.length > 1
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-2"
                  }`
                : "flex flex-col gap-4"
            }
          >
            <AnimatePresence>
              {players.map((player, index) => (
                <motion.div
                  key={player.id}
                  data-player-card
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className={
                    gameSettings.viewMode === "grid" &&
                    isOdd &&
                    index === players.length - 1
                      ? "md:col-span-2"
                      : ""
                  }
                >
                  <PlayerCard
                    player={player}
                    onEdit={() => setEditingPlayerId(player.id)}
                    onScoreClick={() => setAddingPointsPlayerId(player.id)}
                    onSelect={() => setCurrentPlayer(player.id)}
                    isSelected={currentPlayerId === player.id}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence mode="wait">
        {showAddPlayer && (
          <AddPlayerModal
            key="add-player-modal"
            onClose={() => setShowAddPlayer(false)}
          />
        )}
        {editingPlayerId && (
          <EditPlayerModal
            key={`edit-player-modal-${editingPlayerId}`}
            playerId={editingPlayerId}
            onClose={() => setEditingPlayerId(null)}
          />
        )}
        {addingPointsPlayerId && (
          <AddPointsModal
            key={`add-points-modal-${addingPointsPlayerId}`}
            playerId={addingPointsPlayerId}
            onClose={() => setAddingPointsPlayerId(null)}
          />
        )}
        {showUISettings && (
          <UISettingsModal
            key="ui-settings-modal"
            onClose={() => setShowUISettings(false)}
          />
        )}
        {showHistory && (
          <HistoryModal
            key="history-modal"
            isOpen={showHistory}
            onClose={() => setShowHistory(false)}
          />
        )}
        {showPlayersList && playersListData && (
          <PlayersListModal
            key="players-list-modal"
            isOpen={showPlayersList}
            onClose={() => {
              setShowPlayersList(false);
              setPlayersListData(null);
            }}
            players={playersListData.players}
            score={playersListData.score}
            type={playersListData.type}
          />
        )}
        {confirmModal.isOpen && (
          <ConfirmModal
            key="confirm-modal"
            isOpen={confirmModal.isOpen}
            onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
            onConfirm={confirmModal.onConfirm}
            title={confirmModal.title}
            message={confirmModal.message}
            variant={confirmModal.variant}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
