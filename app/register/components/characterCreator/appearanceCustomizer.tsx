import React from 'react';

const AppearanceCustomizer = () => {
  const options = [
    { id: 'hair', label: 'haier' },
    { id: 'eyes', label: 'eyes' },
    { id: 'nose', label: 'nose' },
    { id: 'mouth', label: 'mouth' },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-6 w-full max-w-150 px-4">
      {options.map((opt) => (
        <div key={opt.id} className="flex items-center justify-between group">
          
          <button className="w-10 h-10 flex items-center justify-center bg-slate-800 border-2 border-slate-600 rounded shadow-lg text-amber-500 font-bold hover:border-amber-500 hover:scale-110 transition-all active:scale-90">
            {"<"}
          </button>

          <div className="flex-1 mx-4 h-10 flex items-center justify-center bg-black/40 border-b-2 border-slate-700">
            <span className="text-slate-300 uppercase text-xs font-bold tracking-widest group-hover:text-amber-400 transition-colors">
              {opt.label}
            </span>
          </div>

          <button className="w-10 h-10 flex items-center justify-center bg-slate-800 border-2 border-slate-600 rounded shadow-lg text-amber-500 font-bold hover:border-amber-500 hover:scale-110 transition-all active:scale-90">
            {">"}
          </button>
          
        </div>
      ))}
    </div>
  );
};

export default AppearanceCustomizer;