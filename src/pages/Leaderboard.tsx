import { Undo2 } from "lucide-react";
import CustomButton from "../components/CustomButton";
import LeaderboardElement from "../components/leaderboard/LeaderboardElement";
import { useGetFakePlayers } from "../hooks/getFakePlayers";
import { useState } from "react";

const Leaderboard = () => {
  const [selectedMode, setSelectedMode] = useState<string>("Lako");
  const { players, loading, loadingMore, loadMore } = useGetFakePlayers(3, selectedMode);
  const modes: string[] = ["Lako", "Srednje", "Teško"];
  return (
    <>
      <CustomButton to="/">
        <Undo2 size={32} />
      </CustomButton>
      <main className="relative flex flex-col p-8 lg:min-h-screen items-center justify-start py-16">
        <h1 className="text-3xl lg:text-4xl font-black">LEADERBOARD</h1>
        <div className="max-w-xl mt-10 w-full flex items-center gap-4">
          {modes.map((mode: string, idx) => (
            <button
              key={idx}
              className={`px-2 font-bold w-full hover:bg-baby-yellow transition-colors duration-300 ease-in-out cursor-pointer hover:text-white py-1 rounded-md ${
                selectedMode === mode
                  ? "bg-baby-yellow"
                  : "bg-tertiary text-white/20"
              }`}
              onClick={() => setSelectedMode(mode)}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="mt-10 flex flex-col max-w-3xl w-full gap-4 pb-4 max-h-[32rem] overflow-auto px-2">
          {loading ? (
            <p className="text-center opacity-70">Učitavanje…</p>
          ) : (
            players.map((p, i) => (
              <LeaderboardElement
                key={p.id + p.time}
                name={p.name}
                time={p.time}
                number={i + 1}
              />
            ))
          )}
        </div>

        <button
          onClick={() => loadMore(selectedMode)}
          disabled={loading || loadingMore}
          className="mt-6 px-6 py-2 rounded-full bg-light-gray font-black text-xl disabled:opacity-60"
        >
          {loadingMore ? "Učitavanje…" : "UČITAJ JOŠ"}
        </button>
      </main>
    </>
  );
};

export default Leaderboard;
