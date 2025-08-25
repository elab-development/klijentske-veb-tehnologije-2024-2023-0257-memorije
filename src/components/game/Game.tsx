import { useState, useEffect } from "react";
import background from "../../assets/background.jpg";
import { getSkinData } from "../../lib/selectedSkin";
import { useGenerateGame } from "../../hooks/useGenerateGame";
import VictoryModal from "../VictoryRoyale";

interface GameProps {
  gameMode: string;
  setStartedGame: (started: boolean) => void;
}

const Game = ({ gameMode, setStartedGame }: GameProps) => {
  const [seconds, setSeconds] = useState(0);
  const [victory, setVictory] = useState(false);
  const skinData = getSkinData();
  const vratiBrojPolja = () => {
    switch (gameMode) {
      case "Lako":
        return 2;
      case "Srednje":
        return 4;
      case "Teško":
        return 6;
      default:
        return 2;
    }
  };
  const {
    matrix,
    hiddenMatrix,
    flipCard,
    regenerateGame,
    attempts,
    correctMatches,
  } = useGenerateGame(vratiBrojPolja());
  useEffect(() => {
    const timer = setInterval(() => {
      !victory ? setSeconds((prev) => prev + 1) : clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [victory]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  useEffect(() => {
    const isGameComplete = hiddenMatrix.every((row) =>
      row.every((cell) => cell === true)
    );

    if (isGameComplete) {
      console.log("Pobedili ste");
      setVictory(true);
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      );
      if (currentUser && currentUser.games) {
        currentUser.games.push({
          id: `g${currentUser.games.length + 1}`,
          mode: gameMode,
          timeMs: seconds * 1000,
          accuracy: Number((attempts > 0
            ? (correctMatches / attempts) * 100
            : 100
          ).toFixed(1)),
          playedAt: new Date().toISOString(),
        });
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      }
    }
  }, [hiddenMatrix]);
  const handleReplay = () => {
    setStartedGame(true);
    setVictory(false);
    setSeconds(0);
    regenerateGame();
  };
  return (
    <main className="relative flex lg:min-h-screen items-center justify-center">
      <VictoryModal
        time={formatTime(seconds)}
        accuracy={attempts > 0 ? (correctMatches / attempts) * 100 : 100}
        open={victory}
        onReplay={() => handleReplay()}
        onHome={() => setStartedGame(false)}
      />
      <div className="z-10 bg-primary md:border border-tertiary rounded-2xl p-2 md:p-4 lg:p-8 flex lg:flex-row flex-col w-full gap-4 max-w-5xl">
        <div className="flex lg:hidden gap-4 flex-row lg:flex-col items-center justify-between">
          <div className="p-2 flex w-64 rounded-xl bg-tertiary/10 border border-tertiary items-center justify-center">
            <span className="text-4xl font-black">{formatTime(seconds)}</span>
          </div>
          <div className="p-2 flex w-full flex-col justify-center">
            <span className="text-base font-bold leading-tight">POGAĐANJE</span>
            <span className="text-xl font-black">
              {attempts > 0
                ? ((correctMatches / attempts) * 100).toFixed(1)
                : 100}
              %
            </span>
          </div>
        </div>
        <div
          className={`grid p-2 md:p-4 rounded-xl bg-tertiary/10 border border-tertiary gap-0.5 md:gap-2 lg:gap-4 flex-1 ${
            vratiBrojPolja() === 2
              ? "grid-cols-2"
              : vratiBrojPolja() === 4
              ? "grid-cols-4"
              : "grid-cols-6"
          }`}
        >
          {matrix.map((row, rowIndex) =>
            row.map((col, colIndex) => {
              const isRevealed = hiddenMatrix[rowIndex][colIndex];
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  style={{
                    backgroundColor: skinData?.primary,
                    borderColor: skinData?.secondary,
                    color: skinData?.secondary,
                  }}
                  onClick={() => {
                    flipCard(rowIndex, colIndex);
                  }}
                  className="aspect-square card cursor-pointer group flex items-center justify-center font-bold rounded-lg md:rounded-xl lg:rounded-2xl bg-dark-blue"
                >
                  {isRevealed ? (
                    <img
                      src={col}
                      alt="card"
                      className="w-full h-full card--revealed object-cover"
                    />
                  ) : (
                    <span className="text-4xl aspect-square group-hover:-translate-y-2 transition-transform duration-300 md:text-7xl lg:text-[50px] leading-tight text-light-blue">
                      ?
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
        <div className="flex flex-col justify-between lg:ml-8 w-full lg:w-64">
          <div className="hidden lg:flex flex-col gap-4">
            <div className="p-4 flex w-full rounded-xl bg-tertiary/10 border border-tertiary items-center justify-center">
              <span className="text-7xl font-black">{formatTime(seconds)}</span>
            </div>
            <div className="p-4 flex flex-col w-full rounded-xl bg-tertiary/10 border border-tertiary justify-center">
              <span className="text-xl font-bold leading-tight">POGAĐANJE</span>
              <span className="text-2xl font-black">
                {attempts > 0
                  ? ((correctMatches / attempts) * 100).toFixed(1)
                  : 100}
                %
              </span>
            </div>
          </div>

          <button
            onClick={() => setStartedGame(false)}
            className="bg-light-red mb-2 cursor-pointer px-6 py-3 lg:py-4 text-base md:text-xl lg:text-2xl font-black rounded-xl shadow-[0_6px_0_0_#FF6C6C] hover:shadow-[0_4px_0_0_#ab4141] hover:translate-y-[2px] transition-all duration-150"
          >
            ODUSTANI
          </button>
        </div>
      </div>
      <img
        src={background}
        className="absolute md:flex hidden inset-0 opacity-5 object-cover w-full h-full"
      />
    </main>
  );
};

export default Game;
