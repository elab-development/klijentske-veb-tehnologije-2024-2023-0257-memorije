import { useEffect, useState, useRef } from "react";
import { getCurrentUser } from "../lib/authStorage";

export type Player = {
  id: string;
  mode: string;
  name: string;
  time: string;
  timeSec: number;
};

export function useGetFakePlayers(pageSize: number = 5, selectedMode?: string) {
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const fetchedRef = useRef(false);

  const formatSec = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  async function fetchPlayers(count: number, minSec: number, gameMode?: string) {
    const res = await fetch(
      `https://fakerapi.it/api/v2/persons?_quantity=${count}`
    );
    const data = await res.json();

    const SPREAD = 120;

    return (data?.data ?? []).map((p: any, i: number) => {
      const timeSec = minSec + Math.floor(Math.random() * SPREAD);
      return {
        id: String(p.id ?? `${Date.now()}-${i}`),
        name: `${p.firstname} ${p.lastname}`,
        time: formatSec(timeSec),
        mode: gameMode ? gameMode : ["Lako", "Srednje", "Teško"][Math.floor(Math.random() * 3)],
        timeSec,
      } as Player;
    });
  }
  useEffect(() => {
    if (!fetchedRef.current) {
      (async () => {
        setLoading(true);
        fetchedRef.current = true;
        const first = await fetchPlayers(pageSize, 30);
        const userData = getCurrentUser();
        const filteredUserData =
          userData?.games
            ?.map((game, index) => ({
              id: `user-${index}`,
              name: `${userData.firstName} ${userData.lastName}`,
              time: formatSec(game.timeMs / 1000),
              timeSec: game.timeMs / 1000,
              mode: game.mode,
            })) || [];
        first.push(...filteredUserData);
        first.sort((a: Player, b: Player) => a.timeSec - b.timeSec);
        setAllPlayers(first);
        setLoading(false);
      })();
    }
  }, [pageSize]);

  const players = selectedMode 
    ? allPlayers.filter((p) => p.mode === selectedMode)
    : allPlayers;

  async function loadMore(gameMode?: string) {
    setLoadingMore(true);

    const currentMax = allPlayers.length
      ? allPlayers[allPlayers.length - 1].timeSec
      : 30;

    const more = await fetchPlayers(pageSize, currentMax + 1, gameMode);
    setAllPlayers((prev) => {
      const merged = [...prev, ...more];
      merged.sort((a, b) => a.timeSec - b.timeSec);
      return merged;
    });

    setLoadingMore(false);
  }

  return { players, loading, loadingMore, loadMore };
}
