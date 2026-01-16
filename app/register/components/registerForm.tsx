const RegisterForm = () => {
  return (
    <div className="w-80 bg-slate-900/90 border-4 border-slate-700 p-6 shadow-2xl flex flex-col gap-4">

      <div className="flex flex-col gap-1">
        <label className="text-[10px] text-slate-400 uppercase ml-1">User</label>
        <input 
          type="text" 
          placeholder="Nickname..."
          className="bg-black/40 border-2 border-slate-600 p-2 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] text-slate-400 uppercase ml-1">Email</label>
        <input 
          type="email" 
          placeholder="Email..."
          className="bg-black/40 border-2 border-slate-600 p-2 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] text-slate-400 uppercase ml-1">Password</label>
        <input 
          type="password" 
          placeholder="Password..."
          className="bg-black/40 border-2 border-slate-600 p-2 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] text-slate-400 uppercase ml-1">Repeat password</label>
        <input 
          type="password" 
          placeholder="Repeat Password..."
          className="bg-black/40 border-2 border-slate-600 p-2 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="text-[10px] text-amber-600 uppercase ml-1 font-bold">Hero Nickname</label>
        <input 
          type="text" 
          placeholder="Hero Name..."
          className="bg-black/40 border-2 border-amber-900/50 p-2 text-amber-400 placeholder:text-amber-900 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

    </div>
  )
}

export default RegisterForm