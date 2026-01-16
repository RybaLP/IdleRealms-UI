import Image from 'next/image';

// interface Props {
//   visualConfig: string; 
// }

export default function CharacterAvatarBox() {
//   const [armor, race, eyes, mouth, hair] = visualConfig.split(';').map(Number);

  return (
    <div className="relative w-full max-w-100 aspect-square mx-auto">
      <div className="absolute inset-0 border-4 border-[#1a2b3c] rounded-lg overflow-hidden bg-gradient-to-b from-[#1e3a5f] to-[#051422] shadow-2xl">
        
        <div className="relative w-full h-full p-4">
          <Image 
            src="/human.png" 
            alt="human base"
            fill 
            className="object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]"
            priority 
          />
          
        </div>
        <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
      </div>

      <div className="absolute -inset-1 border border-amber-500/20 rounded-xl pointer-events-none" />
    </div>
  );
}