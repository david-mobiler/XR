import type { Screen } from '../App';

type ARScreenProps = {
  onNavigate: (screen: Screen) => void;
};

function ChairScene() {
  return (
    <svg viewBox="0 0 220 170" className="h-[170px] w-[220px]" fill="none">
      <ellipse cx="112" cy="148" rx="52" ry="11" fill="rgba(0,0,0,.25)" />
      <path d="M54 72c0-17 11-29 27-29h44c17 0 27 12 27 29v35H54V72Z" fill="#E8E0D1" />
      <path d="M62 71c0-11 7-19 19-19h44c12 0 19 8 19 19v22H62V71Z" fill="#F3EBDD" />
      <path d="M75 105h8l-5 37h-7l4-37Zm60 0h8l4 37h-7l-5-37Z" fill="#DCCFB9" />
      <path d="M62 78h-9v27h9m82-27h9v27h-9" stroke="#EADFCB" strokeWidth="6" strokeLinecap="round"/>
    </svg>
  );
}

export function ARScreen({ onNavigate }: ARScreenProps) {
  return (
    <div className="relative h-full overflow-hidden bg-[#d4c8a8]">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-[40%] origin-left -skew-x-6 bg-[#c8bc96]" />
        <div className="absolute inset-y-0 right-0 w-[40%] origin-right skew-x-6 bg-[#c8bc96]" />
        <div className="absolute bottom-0 h-[55%] w-full bg-[#b8a882]" />
        <div className="absolute right-9 top-12 h-28 w-24 border border-[#d8d0c4] bg-[#f3ecdf]/60">
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#d0c6b5]" />
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#d0c6b5]" />
        </div>
      </div>

      <button onClick={() => onNavigate('browse')} className="absolute left-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-[#13162A]/80 text-white" aria-label="Back">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
      </button>

      <div className="absolute left-1/2 top-4 z-20 flex h-16 w-[180px] -translate-x-1/2 items-center justify-between rounded-2xl border border-white/15 bg-[rgba(20,22,40,0.7)] px-2">
        <button className="grid h-10 w-10 place-items-center text-white/80" aria-label="Prev">‹</button>
        <div className="flex gap-2">
          {['#e5ded0', '#2d4562', '#1D9E75'].map((c, i) => (
            <div key={c} className={`grid h-11 w-11 place-items-center rounded-[10px] bg-primary/70 ${i === 1 ? 'ring-[1.5px] ring-teal' : ''}`}>
              <div className="h-6 w-6 rounded-md" style={{ backgroundColor: c }} />
            </div>
          ))}
        </div>
        <button className="grid h-10 w-10 place-items-center text-white/80" aria-label="Next">›</button>
      </div>

      <div className="absolute inset-x-0 top-[30%] z-10 flex justify-center">
        <div className="relative">
          <ChairScene />
          <div className="pointer-events-none absolute inset-0">
            <span className="absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-white/80" />
            <span className="absolute right-0 top-0 h-7 w-7 border-r-2 border-t-2 border-white/80" />
            <span className="absolute bottom-0 left-0 h-7 w-7 border-b-2 border-l-2 border-white/80" />
            <span className="absolute bottom-0 right-0 h-7 w-7 border-b-2 border-r-2 border-white/80" />
          </div>
        </div>
      </div>

      <div className="absolute left-6 top-[58%] z-10">
        <svg viewBox="0 0 40 56" className="h-14 w-10" fill="none">
          <rect x="14" y="22" width="12" height="24" rx="3" fill="#6c5438" />
          <path d="M20 0c9 0 13 8 13 14 0 7-6 10-13 10S7 21 7 14C7 8 11 0 20 0Z" fill="#1f6b3b" />
          <path d="M14 9c5-1 12 1 12 7" stroke="#2a8f4f" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 rounded-t-[20px] bg-[rgba(13,14,26,0.92)] px-5 pb-4 pt-3 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-bold">ComfortMax Armchair</p>
            <p className="text-[16px] font-bold">$45</p>
          </div>
          <div className="flex items-center gap-2">
            {['#e5ded0', '#24334a', '#1D9E75', '#6a5392', '#2f2f37'].map((c, i) => (
              <span key={c} className={`h-3.5 w-3.5 rounded-full ${i === 0 ? 'ring-2 ring-white ring-offset-1 ring-offset-[#13162A]' : ''}`} style={{ backgroundColor: c }} />
            ))}
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-teal text-white" aria-label="Add to cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 7h13l-1.6 8H8.2L6 4H3"/><circle cx="10" cy="19" r="1.3"/><circle cx="17" cy="19" r="1.3"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

