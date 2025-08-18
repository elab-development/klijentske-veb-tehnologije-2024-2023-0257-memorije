import Card from "../components/locker/Card";
import skinovi from "../data/skinovi.json"

const Locker = () => {
  return (
    <main className="relative flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-4xl font-black">IZGLEDI KARTICA</h1>
      <div className="mt-10 grid grid-cols-3 gap-8 w-full max-w-6xl">
        {skinovi.map((skin,index)=>(
          <Card naziv={skin.naziv} slika={skin.slika} id={skin.id} key={index}/>
        ))}
      </div>
    </main>
  );
};

export default Locker;
