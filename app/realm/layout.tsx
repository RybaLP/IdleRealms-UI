"use client";

import Sidebar from "../components/shared/sidebar";
import { useGetHeroInfo } from "../hooks/useGetHeroInfo";
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
  const { isLoaded, loading, error } = useGetHeroInfo();

  if (loading && !isLoaded) {
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
    return <div className="text-red-500">Error: {error}</div>;
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