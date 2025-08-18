import { useEffect, useState } from "react";

export type Player = {
  id: string;
  name: string;
  time: string; 
};

export function useGetFakePlayers(amount: number = 5) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  function formatMs(ms: number) {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  function parseTime(time: string) {
    const [min, sec] = time.split(":").map(Number);
    return min * 60 + sec;
  }

  useEffect(() => {
    async function fetchPlayers() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://fakerapi.it/api/v2/persons?_quantity=${amount}`
        );
        const data = await res.json();

        const mapped: Player[] = data.data.map((p: any, i: number) => {
          const randomMs = Math.floor(Math.random() * 90_000) + 30_000; // 30-120s
          return {
            id: String(p.id ?? i),
            name: `${p.firstname} ${p.lastname}`,
            time: formatMs(randomMs),
          };
        });

        mapped.sort((a, b) => parseTime(a.time) - parseTime(b.time));

        console.log(mapped);
        setPlayers(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayers();
  }, [amount]);

  return { players, loading };
}
