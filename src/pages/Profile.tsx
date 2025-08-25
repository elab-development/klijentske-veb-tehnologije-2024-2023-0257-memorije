import { useState } from "react";
import VictoryModal from "../components/VictoryRoyale"; 

export default function Profile() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="px-6 py-3 bg-blue-500 text-white rounded-xl"
        >
          Završi igru (otvori modal)
        </button>
      )}

      <VictoryModal
        open={open}
        time="00:32"
        accuracy={92.3}
        onReplay={() => {
          setOpen(false);
        }}
        onHome={() => {
          setOpen(false);
        }}
      />
    </div>
  );
}
