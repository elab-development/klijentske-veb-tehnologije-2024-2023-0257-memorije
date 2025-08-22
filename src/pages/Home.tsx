import { useState } from "react";
import logo from "../assets/Logo.png";
import LeaderboardElement from "../components/leaderboard/LeaderboardElement";
import Game from "../components/game/Game";
import { Profil } from "../components/Profil";

const Home = () => {
  const [selectedMode, setSelectedMode] = useState<string>("Lako");
  const [startedGame, setStartedGame] = useState<boolean>(false);
  const modes: string[] = ["Lako", "Srednje", "Teško"];

  return startedGame ? (
    <Game setStartedGame={setStartedGame} gameMode={selectedMode} />
  ) : (
    <main className="m-4 min-h-screen flex flex-col items-center justify-center">
      <img src={logo} width={500} height={500} />
      <Profil/>
      <div className="w-full lg:max-w-md flex flex-col gap-6">
        <button onClick={() => setStartedGame(true)} className="bg-light-blue cursor-pointer px-20 py-4 lg:py-6 w-full lg:text-2xl font-black rounded-xl shadow-[0_6px_0_0_#96E8FF] hover:shadow-[0_4px_0_0_rgb(135,206,250)] hover:translate-y-[2px] transition-all duration-150">
          ZAPOČNI IGRU
        </button>
        <div className="grid grid-cols-3 bg-[#272C36] p-1 rounded-md gap-1">
          {modes.map((mode: string, idx) => (
            <button
              key={idx}
              className={`px-2 font-bold hover:bg-baby-yellow transition-colors duration-300 ease-in-out cursor-pointer hover:text-white py-1 rounded-md ${
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
      </div>
      <div className="flex gap-4 mt-4 flex-col w-full lg:max-w-2xl">
        <h2 className="text-lg font-bold">Leaderboard</h2>
        <div className="flex overflow-hidden relative flex-col gap-4">
          <div className="bg-gradient-to-t from-primary to-primary/0 absolute inset-0"/>
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <LeaderboardElement
                key={index}
                number={index + 1}
                name={`Player ${index + 1}`}
                time={`00:0${index + 1}`}
              />
            ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
