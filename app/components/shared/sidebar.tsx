"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useGetHeroInfo } from "@/app/hooks/useGetHeroInfo";
import { logoutUser } from "@/app/services/authService"; 
import { useAppDispatch } from "@/app/redux/reduxStore";
import { logoutHero } from "@/app/store/heroSlice";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { gold, loading } = useGetHeroInfo();

  const handleLogout = async () => {
    try {
      await logoutUser(); 
      dispatch(logoutHero()); 
      router.push("/"); 
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const menuItems = [
    { name: "Character", href: "/realm/character", icon: "👤" }, 
    { name: "Tavern", href: "/realm/tavern", icon: "🍺" },
    { name: "Shop", href: "/realm/shop", icon: "⚔️" },
    { name: "Dungeons", href: "/realm/dungeons", icon: "💀" },
  ];

  return (
    <aside className="w-64 h-full bg-slate-950 border-r-4 border-slate-900 flex flex-col z-10 shadow-2xl">
      <div className="p-6 border-b border-slate-800 bg-linear-to-b from-black/40 to-transparent">
        <div className="flex justify-center mb-6">
          <Link href="/realm" className="relative group">
            <div className={`w-12 h-12 bg-amber-600 rounded-lg shadow-[0_0_15px_rgba(217,119,6,0.3)] flex items-center justify-center border-2 border-amber-400 rotate-45 hover:rotate-[225deg] transition-transform duration-700 ${pathname === "/realm" ? "border-white scale-110" : ""}`}>
              <span className="-rotate-45 group-hover:rotate-[-225deg] transition-transform duration-700 text-2xl">🏰</span>
            </div>
            {pathname === "/realm" && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_5px_#f59e0b]" />
            )}
          </Link>
        </div>
        
        <div className="bg-black/60 border border-amber-900/50 p-3 rounded flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-mono font-bold text-lg">
              {loading ? "..." : gold.toLocaleString()}
            </span>
            <span className="text-yellow-500 animate-pulse">💰</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-3 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 p-3 border-2 transition-all duration-300 group relative
                ${isActive 
                  ? "bg-amber-900/10 border-amber-600 text-amber-500 shadow-[0_0_15px_rgba(217,119,6,0.05)]" 
                  : "bg-transparent border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-200"
                }
              `}
            >
              {isActive && (
                <div className="absolute -left-1 top-0 bottom-0 w-1 bg-amber-500 shadow-[0_0_10px_#f59e0b]" />
              )}
              
              <span className={`text-xl transition-transform group-hover:scale-125 duration-300`}>
                {item.icon}
              </span>
              <span className="uppercase text-[11px] font-black tracking-[0.2em]">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-900 bg-black/20">
        <button 
          onClick={handleLogout}
          className="w-full text-left flex items-center gap-2 text-[10px] text-slate-600 uppercase font-bold hover:text-red-500 transition-colors group"
        >
          <span className="group-hover:animate-bounce">🚪</span>
          Exit Realm
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;