import { Undo2 } from "lucide-react";
import VictoryImage from "../assets/VictoryRoyaleSlate.png";

type Props = {
  open: boolean;
  time: string;
  accuracy: number;
  onReplay: () => void;
  onHome: () => void;
};

export default function VictoryModal({
  open,
  time,
  accuracy,
  onReplay,
  onHome,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed  inset-0 z-30 flex flex-col bg-primary/90 items-center justify-center text-center text-white">
      <img
        src={VictoryImage}
        alt="Victory Royale"
        className="w-[90%] victory max-w-[640px] drop-shadow-[0_14px_32px_rgba(0,0,0,0.65)] mb-1"
      />

      <div className="mt-2 w-full max-w-md lg:p-0 p-8">
        <p className="text-2xl lg:text-3xl font-extrabold tracking-sm uppercase">
          NOVI REKORD!
        </p>

        <p className="mt-0 text-7xl lg:text-8xl leading-sm font-black tabular-nums">
          {time}
        </p>

        <p className="mt-1 text-xl lg:text-3xl font-extrabold">
          POGAĐANJE:{" "}
          <span className="font-extrabold text-baby-yellow">
            {accuracy.toFixed(1)}%
          </span>
        </p>

        <button
          onClick={onReplay}
          className="bg-baby-yellow text-white mt-2 cursor-pointer py-4 px-8 w-full lg:text-xl font-black rounded-xl shadow-[0_6px_0_0_#9D6F3A] hover:shadow-[0_4px_0_0_#9D6F3A] hover:translate-y-[2px] transition-all duration-150 transform hover:scale-105 active:scale-95"
        >
          IGRAJ PONOVO
        </button>

        <button
          onClick={onHome}
          className="bg-secondary font-bold lg:text-xl w-full mt-4 border border-light-gray px-8 py-4 rounded-xl flex items-center cursor-pointer justify-center"
        >
          NAZAD NA POČETNU <Undo2 size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
}
