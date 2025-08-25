import dzoni from "../../assets/dzoni.png";
import trofej from "../../assets/trophy.svg";
interface LeaderboardElementProps {
  number: number;
  name: string;
  time: string;
}

const LeaderboardElement = ({
  number,
  name,
  time,
}: LeaderboardElementProps) => {
  return (
    <div
      className={`flex w-full items-center px-6 py-2 gap-4 rounded-lg ${
        number === 1
          ? "bg-[#EBD065]"
          : number === 2
          ? "bg-[#9D6F3A]"
          : number === 3
          ? "bg-[#4C4C4C]"
          : " bg-tertiary"
      } shadow-[0_4px_0_0_#182235]`}
    >
      <span className="text-2xl lg:text-3xl font-bold">#{number}</span>
      <img
        src={dzoni}
        width={55}
        height={55}
        className="rounded-full md:w-16 w-10 border-2 border-white"
        alt="Ikonica"
      />
      <div className="flex flex-col">
        <span className="leading-tight md:text-lg lg:text-xl font-bold">
          {name}
        </span>
        <span className="leading-tight font-light text-xs md:text-sm lg:text-base">
          {time}
        </span>
      </div>
      {(number === 1 || number === 2 || number === 3) && (
        <img src={trofej} alt="trofej" height={35} width={35} className="ml-auto" />
      )}
    </div>
  );
};

export default LeaderboardElement;
