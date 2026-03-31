type LegacyScreen = 'browse' | 'ar';

type BrowseScreenProps = {
  onNavigate: (screen: LegacyScreen) => void;
};

const products = [
  { name: 'Whichbone sofa', color: '#1D9E75' },
  { name: 'Coktown sofa', color: '#E5D8C8' },
  { name: 'Nomaad Foa', color: '#8A78B5' },
  { name: 'Wood wire chair', color: '#E0A547' },
];

function ChairThumb({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 52" className="h-12 w-16" fill="none">
      <ellipse cx="33" cy="45" rx="18" ry="4" fill="rgba(0,0,0,.2)" />
      <path d="M12 25c0-8 5-14 13-14h13c8 0 13 6 13 14v9H12v-9Z" fill={color} />
      <path d="M16 22c0-5 3-9 9-9h13c6 0 9 4 9 9v6H16v-6Z" fill="rgba(255,255,255,.22)" />
      <path d="M17 35h4l-3 12h-4l3-12Zm28 0h4l3 12h-4l-3-12Z" fill={color} />
    </svg>
  );
}

export function BrowseScreen({ onNavigate }: BrowseScreenProps) {
  return (
    <div className="relative flex h-full flex-col bg-primary px-[18px] pb-3 pt-7">
      <div className="flex items-center justify-between">
        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5" aria-label="Menu">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5" aria-label="Search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>
        </button>
      </div>

      <h2 className="mt-3 text-[18px] font-bold">Explore live with AR</h2>

      <div className="mt-3 flex flex-col items-center">
        <div className="relative grid h-[130px] w-[130px] place-items-center rounded-full border-2 border-teal">
          <div className="absolute inset-[-10px] rounded-full border border-teal/20" />
          <ChairThumb color="#E8DECE" />
        </div>
        <p className="mt-2 text-[20px] font-bold leading-none">50% <span className="text-[11px] font-medium text-white/45">Discount</span></p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal">Summer Sales</p>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[10px] font-semibold">
        <button className="rounded-full bg-teal px-2 py-2">All</button>
        <button className="rounded-full border border-white/20 bg-white/10 px-2 py-2 text-white/45">Living room</button>
        <button className="rounded-full border border-white/20 bg-white/10 px-2 py-2 text-white/45">Bedroom</button>
        <button className="rounded-full border border-white/20 bg-white/10 px-2 py-2 text-white/45">Dining room</button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {products.map((p) => (
          <div key={p.name} className="rounded-2xl bg-[#1E2238] p-3">
            <ChairThumb color={p.color} />
            <p className="mt-1 text-xs font-bold">$24</p>
            <p className="text-[9px] text-white/45">{p.name}</p>
            <div className="mt-2 flex justify-end gap-2">
              <button className="h-[22px] w-[22px] rounded-full bg-white/10" aria-label="Like" />
              <button className="h-[22px] w-[22px] rounded-full bg-white/10" aria-label="Save" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex h-[52px] items-center justify-around rounded-t-2xl border-t border-white/10 bg-[#1E2238]">
        <button className="relative text-teal" aria-label="Home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3v-10.5Z"/></svg>
          <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-teal" />
        </button>
        <button className="text-white/55" aria-label="Settings"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="M2 12h3m14 0h3M12 2v3m0 14v3M4.9 4.9l2.1 2.1m10 10 2.1 2.1m0-14.2L16.9 7m-10 10L4.9 19.1"/></svg></button>
        <button className="text-white/55" aria-label="Search"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg></button>
        <button onClick={() => onNavigate('ar')} className="text-white/55" aria-label="Profile"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.8-3.7 5-5.5 8-5.5S18.2 17.3 20 21"/></svg></button>
      </div>
    </div>
  );
}
