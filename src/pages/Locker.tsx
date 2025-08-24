import { useEffect, useState } from "react";
import Card from "../components/locker/Card";
import skinovi from "../data/skinovi.json";
import { getSkin, setSkin } from "../lib/selectedSkin";

const Locker = () => {
  const [selectedSkin, setSelectedSkin] = useState<number | null>(null);

  useEffect(() => {
    const raw = getSkin();
    const parsed = raw !== null && !Number.isNaN(Number(raw)) ? Number(raw) : null;
    setSelectedSkin(parsed);
  }, []);

  const handleSelect = (id: number) => {
    setSkin(id);
    setSelectedSkin(id);
  };
  return (
    <main className="relative flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-4xl font-black">IZGLEDI KARTICA</h1>
      <div className="mt-10 grid grid-cols-3 gap-8 w-full max-w-6xl">
        {skinovi.map((skin, index) => (
          <Card
            key={index}
            naziv={skin.naziv}
            slika={skin.slika}
            id={skin.id}
            selected={selectedSkin === skin.id}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </main>
  );
};

export default Locker;
