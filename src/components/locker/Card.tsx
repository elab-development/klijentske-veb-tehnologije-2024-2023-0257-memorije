import { memo } from "react";

interface CardProps {
  slika: string;
  id: number;
  naziv: string;
  selected: boolean;
  onSelect: (id: number) => void;
}

const Card = ({ slika, id, naziv, selected, onSelect }: CardProps) => {
  const handleSelect = () => onSelect(id);
  return (
    <div
      className={`w-full h-[450px] lg:h-[600px] border-2 border-white/20 relative flex flex-col justify-end items-center rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
      selected
        ? "border-4 border-baby-yellow shadow-2xl shadow-baby-yellow/30 scale-105"
        : "hover:border-white/40"
      }`}
    >
      {selected ? (
      <div className="p-4 text-lg lg:text-2xl absolute z-20 left-0 right-0 top-2 lg:top-4 flex flex-col items-center w-full max-h-max font-black">
        <span className="bg-baby-yellow text-tertiary px-4 py-2 rounded-full shadow-lg animate-pulse">
        IZABRANI
        </span>
      </div>
      ) : null}
      
      <div className="p-6 absolute z-10 left-0 right-0 bottom-0 flex flex-col items-center w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
      <h2 className="text-2xl font-black text-white mb-4 text-center drop-shadow-lg">
        {naziv}
      </h2>
      <button
        onClick={handleSelect}
        className="bg-baby-yellow text-tertiary mt-2 cursor-pointer py-3 px-8 w-full lg:text-base font-black rounded-xl shadow-[0_6px_0_0_#9D6F3A] hover:shadow-[0_4px_0_0_#9D6F3A] hover:translate-y-[2px] transition-all duration-150 transform hover:scale-105 active:scale-95"
      >
        {selected ? "IZABRANO" : "IZABERI"}
      </button>
      </div>
      
      <img
      className="object-cover w-full h-full object-center transition-transform duration-300 hover:scale-110"
      src={slika}
      alt={naziv}
      />
    </div>
  );
};

export default memo(Card);
