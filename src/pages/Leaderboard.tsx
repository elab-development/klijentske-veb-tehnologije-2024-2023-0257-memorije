import React from "react";
import { useGetFakePlayers } from "../hooks/getFakePlayers";
import LeaderboardElement from "../components/leaderboard/LeaderboardElement";

const Leaderboard = () => {
  const { players, loading } = useGetFakePlayers();

  return (
    <main className="relative flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-4xl font-black">LEADERBOARD</h1>
      <div className="mt-10 flex flex-col max-w-3xl w-full gap-6 max-h-96">
        {!loading
          ? players.map((player, index) => (
              <LeaderboardElement
                name={player.name}
                time={player.time}
                key={index}
                number={index + 1}
              />
            ))
          : "loading"}
      </div>
    </main>
  );
};

export default Leaderboard;
