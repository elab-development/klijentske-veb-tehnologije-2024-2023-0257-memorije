import joystick from "../../assets/joystick.svg";
interface GameHistoryProps {
  time: string;
  accuracy: number;
  played: Date;
  mode: string;
}

const GameHistory = ({ time, accuracy, played, mode }: GameHistoryProps) => {
  return (
    <div className="rounded-xl bg-tertiary px-6 py-4 gap-10 flex w-full">
      <img src={joystick} alt="dzojstik" width={55} height={55} />
      <div className="flex flex-col">
        <h3 className="font-bold text-lg lg:text-xl">
          {played.toLocaleDateString("en-GB").replaceAll("/", ".")}.
        </h3>
        <span className="text-lg lg:text-xl">{time}</span>
      </div>
      <div className="text-baby-yellow mx-auto flex flex-col">
        <h3 className="font-bold text-lg lg:text-xl">TEŽINA</h3>
        <span className="text-lg lg:text-xl">{mode}</span>
      </div>
      <div className="text-baby-yellow flex flex-col">
        <h3 className="font-bold text-lg lg:text-xl">POGOCI</h3>
        <span className="text-lg lg:text-xl">{accuracy}%</span>
      </div>
    </div>
  );
};

export default GameHistory;
