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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center text-white pointer-events-none">
      <img
        src={VictoryImage}
        alt="Victory Royale"
        className="w-[90%] max-w-[640px] drop-shadow-[0_14px_32px_rgba(0,0,0,0.65)] pointer-events-auto mb-1"
      />

      <div className="mt-2 w-full max-w-[380px] px-2">
        <p
          className="text-[32px] font-extrabold tracking-[0.05em] uppercase"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,.6)" }}
        >
          NOVI REKORD!
        </p>

        <p
          className="mt-0 text-[84px] leading-[0.9] font-black tabular-nums"
          style={{ textShadow: "0 3px 12px rgba(0,0,0,.65)" }}
        >
          {time}
        </p>

        <p
          className="mt-1 text-[28px] font-extrabold"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,.6)" }}
        >
          POGAĐANJE:{" "}
          <span className="font-extrabold text-yellow-400">
            {accuracy.toFixed(1)}%
          </span>
        </p>

        <button
          onClick={onReplay}
          className="
            relative mt-5 w-full h-15 rounded-xl py-3 font-extrabold text-white text-[16px]
            bg-gradient-to-b from-[#FFD966] to-[#E6B800]
            shadow-[0_4px_0_#A67C00]
             hover:from-[#FFE680] hover:to-[#FFCC00]
             active:translate-y-[2px] active:shadow-[0_2px_0_#A67C00]
            transition-all
          "
        >
          IGRAJ PONOVO
        </button>

        <button
          onClick={onHome}
          className="
            mt-3 w-full h-12 rounded-[14px] py-3 font-semibold
            bg-[rgba(23,28,39,0.85)] hover:bg-[rgba(23,28,39,0.95)]
            text-white/95 border border-white/[0.08]
            pointer-events-auto
          "
        >
          Nazad na početnu ↩
        </button>
      </div>
    </div>
  );
}
