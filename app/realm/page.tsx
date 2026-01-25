"use client";

import Image from "next/image";

const RealmPage = () => {
  return (
    <div className="relative w-full h-full min-h-150 flex items-center justify-center overflow-hidden rounded-xl border-2 border-slate-800 shadow-2xl bg-black">
      <Image
        src="/city-hub.jpg" 
        alt="City Map"
        fill
        priority
        className="object-cover pointer-events-none"
      />

      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-20"></div>
    </div>
  );
};

export default RealmPage;