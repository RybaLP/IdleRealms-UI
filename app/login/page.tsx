import Image from "next/image";
import LoginForm from "./loginForm";

const Page = () => {
  return (
    <main className="relative min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/landing-page-bg.png"
          fill
          className="object-cover opacity-50"
          alt="bg"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20">
        <div className="absolute inset-0 rounded-xl blur-2xl bg-amber-500/20" />
        <div className="relative">
          <LoginForm />
        </div>
      </div>

    </main>
  );
};

export default Page;
