export const LogoMark = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="36" height="36" rx="10" fill="#11131A" />
    <rect x="0.5" y="0.5" width="35" height="35" rx="9.5" stroke="#00F5A0" strokeOpacity="0.3" />
    <path d="M10 13L16 18L10 23" stroke="#00F5A0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 23H26" stroke="#FF5E36" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const Logo = ({ size = 36 }) => (
  <span className="flex items-center gap-2.5">
    <LogoMark size={size} />
    <span className="font-display text-[15px] font-bold tracking-tight text-white">
      harsh<span className="text-[#00F5A0]">.chaudhari</span>
      <span className="mono ml-1.5 hidden text-[10px] font-medium tracking-[0.2em] text-slate-500 sm:inline">
        /dev
      </span>
    </span>
  </span>
);