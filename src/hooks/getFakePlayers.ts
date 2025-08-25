import { useEffect, useState } from "react";
import { getCurrentUser } from "../lib/authStorage";

export type Player = {
  id: string;
  name: string;
  time: string;
  timeSec: number;
};

export function useGetFakePlayers(pageSize: number = 5) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const formatSec = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  async function fetchPlayers(count: number, minSec: number) {
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
        timeSec,
      } as Player;
    });
  }
  let fetched = false;
  useEffect(() => {
    !fetched &&
      (async () => {
        setLoading(true);
        fetched = true;
        const first = await fetchPlayers(pageSize, 30);
        const userData = getCurrentUser();
        const filteredUserData =
          userData?.games
            ?.filter((game) => game.mode === "Srednje")
            ?.map((game, index) => ({
              id: `user-${index}`,
              name: `${userData.firstName} ${userData.lastName}`,
              time: formatSec(game.timeMs / 1000),
              timeSec: game.timeMs / 1000,
            })) || [];
        first.push(...filteredUserData);
        first.sort((a: Player, b: Player) => a.timeSec - b.timeSec);
        setPlayers(first);
        setLoading(false);
      })();
  }, [pageSize]);

  async function loadMore() {
    setLoadingMore(true);

    const currentMax = players.length
      ? players[players.length - 1].timeSec
      : 30;

    const more = await fetchPlayers(pageSize, currentMax + 1);
    setPlayers((prev) => {
      const merged = [...prev, ...more];
      merged.sort((a, b) => a.timeSec - b.timeSec);
      return merged;
    });

    setLoadingMore(false);
  }

  return { players, loading, loadingMore, loadMore };
}
