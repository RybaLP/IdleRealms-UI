"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/redux/reduxStore";
import { registerCharacter } from "@/app/services/authService";

export default function CreateButton() {
  const router = useRouter();
  const registerData = useSelector((state: RootState) => state.register);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    // Podstawowa walidacja
    const { email, password, nickname, heroNickname } = registerData.credentials;
    if (!email || !password || !nickname || !heroNickname) {
      alert("Please fill in all details before embarking on your journey!");
      return;
    }

    setIsLoading(true);
    try {
      const result = await registerCharacter(registerData);
      console.log("Response from server:", result);
      alert("Character created successfully!");
      
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCreate}
      disabled={isLoading}
      className={`
        min-w-85 py-4
        bg-linear-to-b from-[#ff9d00] to-[#cc7a00] 
        border-[3px] border-[#1a2b3c]
        text-[#0a0a0a] font-black text-2xl uppercase tracking-tighter
        shadow-[0_0_30px_rgba(0,0,0,0.7),inset_0_2px_2px_rgba(255,255,255,0.4)]
        transition-all rounded-sm
        ${isLoading 
          ? "opacity-50 cursor-wait" 
          : "hover:from-[#ffb333] hover:to-[#e68a00] hover:scale-105 active:scale-95 cursor-pointer"
        }
      `}
    >
      {isLoading ? "Creating..." : "Create Character"}
    </button>
  );
}