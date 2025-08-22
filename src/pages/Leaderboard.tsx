import LeaderboardElement from "../components/leaderboard/LeaderboardElement";
import { useGetFakePlayers } from "../hooks/getFakePlayers";

const Leaderboard = () => {
  const { players, loading, loadingMore, loadMore } = useGetFakePlayers(5);

  return (
    <main className="relative flex flex-col min-h-screen items-center justify-start py-16">
      <h1 className="text-4xl font-black">LEADERBOARD</h1>

      <div className="mt-10 flex flex-col max-w-3xl w-full gap-6 max-h-[32rem] overflow-auto px-2">
        {loading ? (
          <p className="text-center opacity-70">Učitavanje…</p>
        ) : (
          players.map((p, i) => (
            <LeaderboardElement key={p.id} name={p.name} time={p.time} number={i + 1} />
          ))
        )}
      </div>

      <button
        onClick={loadMore}
        disabled={loading || loadingMore}
        className="mt-6 px-6 py-2 rounded-full bg-light-gray font-black text-xl disabled:opacity-60"
      >
        {loadingMore ? "Učitavanje…" : "UČITAJ JOŠ"}
      </button>
    </main>
  );
};

export default Leaderboard;
