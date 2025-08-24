import { useEffect, useState, useRef } from "react";
import Card from "../components/locker/Card";
import skinovi from "../data/skinovi.json";
import { getSkin, setSkin } from "../lib/selectedSkin";
import CustomButton from "../components/CustomButton";
import { Undo2, ChevronLeft, ChevronRight } from "lucide-react";

const Locker = () => {
  const [selectedSkin, setSelectedSkin] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const createInfiniteArray = () => {
    const copies = 10;
    const extendedArray: ((typeof skinovi)[0] & { copyId: string })[] = [];
    for (let i = 0; i < copies; i++) {
      extendedArray.push(
        ...skinovi.map((skin) => ({ ...skin, copyId: `start-${i}-${skin.id}` }))
      );
    }
    extendedArray.push(
      ...skinovi.map((skin) => ({ ...skin, copyId: `original-${skin.id}` }))
    );
    for (let i = 0; i < copies; i++) {
      extendedArray.push(
        ...skinovi.map((skin) => ({ ...skin, copyId: `end-${i}-${skin.id}` }))
      );
    }

    return extendedArray;
  };

  const infiniteSkins = createInfiniteArray();
  useEffect(() => {
    const raw = getSkin();
    const parsed =
      raw !== null && !Number.isNaN(Number(raw)) ? Number(raw) : null;
    setSelectedSkin(parsed);
  }, []);

  const handleSelect = (id: number) => {
    setSkin(id);
    setSelectedSkin(id);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.firstChild instanceof HTMLElement
          ? scrollContainerRef.current.firstChild.offsetWidth +
            parseInt(getComputedStyle(scrollContainerRef.current).gap || "16")
          : 350;
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.firstChild instanceof HTMLElement
          ? scrollContainerRef.current.firstChild.offsetWidth +
            parseInt(getComputedStyle(scrollContainerRef.current).gap || "16")
          : 350;
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current && windowWidth < 1024) {
      const originalStartIndex = 10 * skinovi.length;
      const cardWidth =
        windowWidth < 768
          ? scrollContainerRef.current.clientWidth * 0.8
          : scrollContainerRef.current.clientWidth * 0.4;
      const gap = windowWidth < 768 ? 64 : 24;
      const scrollPosition = originalStartIndex * (cardWidth + gap);

      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = scrollPosition;
        }
      }, 100);
    }
  }, [windowWidth]);

  return (
    <>
      <CustomButton to="/">
        <Undo2 size={32}/>
      </CustomButton>
      <main className="relative lg:px-0 flex flex-col lg:min-h-screen items-center justify-center">
        <h1 className="text-3xl lg:text-4xl font-black">IZGLEDI KARTICA</h1>

        <div className="relative mt-10 w-full max-w-6xl">
          {windowWidth < 1024 && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-primary text-baby-yellow p-2 rounded-3xl border border-light-gray"
              >
                <ChevronLeft size={36} />
              </button>
              <button
                onClick={scrollRight}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-primary text-baby-yellow p-2 rounded-3xl border border-light-gray"
              >
                <ChevronRight size={36} />
              </button>
            </>
          )}
          {windowWidth >= 1024 && (
            <div className="grid grid-cols-3 gap-8 py-10">
              {skinovi.map((skin) => (
                <Card
                  key={skin.id}
                  naziv={skin.naziv}
                  slika={skin.slika}
                  id={skin.id}
                  selected={selectedSkin === skin.id}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          )}
          {windowWidth < 1024 && (
            <div
              ref={scrollContainerRef}
              className="flex gap-16 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-20 pt-10 scrollbar-hide"
              style={{
                paddingLeft: windowWidth < 768 ? "50vw" : "25vw",
                paddingRight: windowWidth < 768 ? "50vw" : "25vw",
              }}
            >
              {infiniteSkins.map((skin: any, index) => (
                <div
                  key={skin.copyId || `${skin.id}-${index}`}
                  className={`
                    flex-shrink-0 
                    ${
                      windowWidth < 768
                        ? "w-[80vw] max-w-[300px]"
                        : "w-[40vw] max-w-[350px]"
                    }
                    snap-center
                  `}
                >
                  <Card
                    naziv={skin.naziv}
                    slika={skin.slika}
                    id={skin.id}
                    selected={selectedSkin === skin.id}
                    onSelect={handleSelect}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Locker;
