import { getCurrentUser } from "../lib/authStorage";
import dzoni from "../assets/dzoni.png";
import GameHistory from "../components/profile/GameHistory";
import type { Partija } from "../types/auth";
import CustomButton from "../components/CustomButton";
import { Undo2 } from "lucide-react";

export default function Profile() {
  const userData = getCurrentUser();
  const formatSec = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };
  return (
    <>
      <CustomButton to="/">
        <Undo2 size={32} />
      </CustomButton>
      <div className="p-14 relative flex flex-col items-center min-h-screen">
        <div className="flex flex-col items-center gap-10">
          <img
            src={dzoni}
            alt="Profilna ikonica"
            width={300}
            height={300}
            className="rounded-full border-4 border-white"
          />
          <h1 className="font-bold text-3xl">
            {userData?.firstName} {userData?.lastName}
          </h1>
        </div>
        <div className="grid xl:grid-cols-2 mt-16 w-full gap-10 md:gap-4 lg:gap-10 xl:gap-40">
          <div className="flex max-h-96 pr-2 overflow-auto flex-col gap-4 w-full items-center">
            {userData?.games.map((game: Partija, idx: number) => (
              <GameHistory
                played={new Date(game.playedAt)}
                mode={game.mode}
                accuracy={game.accuracy}
                key={idx}
                time={formatSec(game.timeMs / 1000)}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl flex-col bg-tertiary p-4 flex items-center justify-center gap-4 w-full">
              <span className="text-3xl lg:text-5xl xl:text-7xl font-black">
                {userData?.games.length || 0}
              </span>
              <h2 className="font-black text-xl text-center text-[#989898]">
                ODIGRANE IGRE
              </h2>
            </div>
            <div className="rounded-xl flex-col bg-tertiary p-4 flex items-center justify-center gap-4 w-full">
              <span className="text-3xl lg:text-5xl xl:text-7xl font-black">
                {userData?.games.length
                  ? formatSec(
                      Math.floor(
                        userData.games.reduce(
                          (acc, game) => acc + game.timeMs,
                          0
                        ) /
                          userData.games.length /
                          1000
                      )
                    )
                  : "00:00"}
              </span>
              <h2 className="font-black text-xl text-center text-[#989898]">
                PROSEČNO VREME
              </h2>
            </div>
            <div className="rounded-xl flex-col bg-tertiary p-4 flex items-center justify-center gap-4 w-full">
              <span className="text-3xl lg:text-5xl xl:text-7xl font-black">
                {userData?.games.length
                  ? (
                      userData.games.reduce(
                        (acc, game) => acc + game.accuracy,
                        0
                      ) / userData.games.length
                    ).toFixed(1)
                  : "0"}
                %
              </span>
              <h2 className="font-black text-xl text-center text-[#989898]">
                PROCENAT POGODAKA
              </h2>
            </div>
            <div className="rounded-xl flex-col bg-tertiary p-4 flex items-center justify-center gap-4 w-full">
              <span className="text-3xl lg:text-5xl xl:text-7xl font-black">
                {userData?.games.length
                  ? formatSec(
                      Math.min(
                        ...userData.games.map((game) => game.timeMs / 1000)
                      )
                    )
                  : "00:00"}
              </span>
              <h2 className="font-black text-xl text-center text-[#989898]">
                NAJBOLJI REZULTAT
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}