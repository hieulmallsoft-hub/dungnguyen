const iconProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

const iconMap = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" {...iconProps} />
      <rect x="14" y="3" width="7" height="5" rx="2" {...iconProps} />
      <rect x="14" y="11" width="7" height="10" rx="2" {...iconProps} />
      <rect x="3" y="13" width="7" height="8" rx="2" {...iconProps} />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" {...iconProps} />
      <circle cx="9.5" cy="7" r="4" {...iconProps} />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" {...iconProps} />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" {...iconProps} />
    </>
  ),
  building: (
    <>
      <path d="M3 21h18" {...iconProps} />
      <path d="M5 21V7l7-4 7 4v14" {...iconProps} />
      <path d="M9 10h.01" {...iconProps} />
      <path d="M9 14h.01" {...iconProps} />
      <path d="M15 10h.01" {...iconProps} />
      <path d="M15 14h.01" {...iconProps} />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" {...iconProps} />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" {...iconProps} />
      <path d="M3 12h18" {...iconProps} />
    </>
  ),
  inbox: (
    <>
      <path d="M4 4h16v10a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V4z" {...iconProps} />
      <path d="M4 12h4l2 3h4l2-3h4" {...iconProps} />
    </>
  ),
  flag: (
    <>
      <path d="M4 21V5" {...iconProps} />
      <path d="M4 5h12l-1.5 3L16 11H4" {...iconProps} />
    </>
  ),
  folder: (
    <>
      <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v1H3V7z" {...iconProps} />
      <path d="M3 10h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7z" {...iconProps} />
    </>
  ),
  history: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7" {...iconProps} />
      <path d="M3 3v5h5" {...iconProps} />
      <path d="M12 7v5l3 3" {...iconProps} />
    </>
  ),
  search: <circle cx="11" cy="11" r="7" {...iconProps} />, 
  bell: (
    <>
      <path d="M15 17H5l1.4-1.4A2 2 0 0 0 7 14.2V11a5 5 0 0 1 10 0v3.2a2 2 0 0 0 .6 1.4L19 17h-4" {...iconProps} />
      <path d="M9 17a3 3 0 0 0 6 0" {...iconProps} />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" {...iconProps} />
      <path d="M4 12h16" {...iconProps} />
      <path d="M4 17h16" {...iconProps} />
    </>
  ),
  arrowUp: (
    <>
      <path d="M12 19V5" {...iconProps} />
      <path d="m5 12 7-7 7 7" {...iconProps} />
    </>
  ),
  arrowDown: (
    <>
      <path d="M12 5v14" {...iconProps} />
      <path d="m19 12-7 7-7-7" {...iconProps} />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" {...iconProps} />
      <path d="M5 12h14" {...iconProps} />
    </>
  ),
  filter: (
    <>
      <path d="M4 6h16" {...iconProps} />
      <path d="M7 12h10" {...iconProps} />
      <path d="M10 18h4" {...iconProps} />
    </>
  ),
  download: (
    <>
      <path d="M12 4v10" {...iconProps} />
      <path d="m8 10 4 4 4-4" {...iconProps} />
      <path d="M4 20h16" {...iconProps} />
    </>
  ),
  spark: (
    <>
      <path d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" {...iconProps} />
      <path d="m19 15 .8 1.8L22 17.5l-2.2.7L19 20l-.8-1.8-2.2-.7 2.2-.7L19 15z" {...iconProps} />
    </>
  )
};

function AdminIcon({ name, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" className={className} aria-hidden="true" focusable="false">
      {iconMap[name] || iconMap.dashboard}
      {name === 'search' ? <path d="m20 20-3.5-3.5" {...iconProps} /> : null}
    </svg>
  );
}

export default AdminIcon;
