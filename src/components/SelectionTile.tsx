import React from 'react';

export function SelectionTile({ icon, title, label, onClick, noAnimation }: { icon: React.ReactNode; title: string; label: string; onClick: () => void; noAnimation?: boolean }) {
  return (
    <div 
      onClick={onClick} 
      className={`cloud-tile flex flex-col items-center justify-center gap-4 text-center group ${noAnimation ? 'hover:scale-100 active:scale-100 hover:shadow-none transition-none' : ''}`}
    >
      <div className={`p-4 bg-white/10 rounded-2xl transition-colors ${noAnimation ? '' : 'group-hover:bg-white/20'}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className={`text-xs font-medium mt-1 transition-opacity ${noAnimation ? 'opacity-60' : 'opacity-60 group-hover:opacity-100'}`}>{label}</p>
      </div>
    </div>
  );
}
