"use client";

import Sidebar from "../components/shared/sidebar";
import { useHeroInfo } from "../hooks/useGetHeroInfo";
import { Providers } from "../redux/reduxProvider";
import QueryProvider from "../providers/queryProvider";

export default function RealmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
    <Providers>
      <RealmContent>{children}</RealmContent>
    </Providers>
    </QueryProvider>
  );
}

function RealmContent({ children }: { children: React.ReactNode }) {
  const { isLoaded, isLoading , error } = useHeroInfo();

  if (isLoading && !isLoaded) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#050505] text-white font-serif">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-600"></div>
          <p className="text-xl tracking-widest uppercase">Entering to realm...</p>
        </div>
      </div>
    );
  }

  if (error) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-red-500 font-serif">
      <h2 className="text-2xl mb-4">The realm is unreachable...</h2>
      <p>{error instanceof Error ? error.message : "Connection lost"}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-6 py-2 bg-red-900 text-white rounded hover:bg-red-800"
      >
        Try Again
      </button>
    </div>
  );
}

  return (
    <div className="flex h-screen w-full bg-[#050505] overflow-hidden">
      <Sidebar />

      <main className="flex-1 relative overflow-y-auto custom-scrollbar bg-black/40">
        <div className="p-8 h-full">
          {children}
        </div>
      </main>
    </div>
  );
}