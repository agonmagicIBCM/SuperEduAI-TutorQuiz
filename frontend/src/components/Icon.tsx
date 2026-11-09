import type { ReactNode, SVGProps } from 'react'
import type { IconName } from '../types/dashboard'

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName
  size?: number
}

function Icon({ name, size = 20, ...props }: IconProps) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.7,
  }

  const content: Record<IconName, ReactNode> = {
    dashboard: <><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="5" rx="2" /><rect x="13" y="10" width="8" height="11" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /></>,
    courses: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" /><path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20M8 7h8m-8 4h6" /></>,
    tutor: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z" /><path d="m19 14 1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" /></>,
    assignment: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4.5V3h6v1.5M8.5 10h7m-7 4h7m-7 4h4" /></>,
    quiz: <><path d="M9 5h11M9 12h11M9 19h11" /><path d="m3.5 5 .8.8L6 4m-2.5 8 .8.8L6 11m-2.5 8 .8.8L6 18" /></>,
    resources: <><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M3 10h18" /></>,
    messages: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3.3-.6L4 20l1.4-3.6A7.1 7.1 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s8 3.1 8 7z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></>,
    profile: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.7 9a2.4 2.4 0 1 1 4.1 1.7c-1 .9-1.8 1.2-1.8 2.8m0 3h.01" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12a2 2 0 0 0 4 0" /></>,
    chevron: <path d="m8 10 4 4 4-4" />,
    arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    code: <><path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 12" /></>,
    web: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18m0-18a14 14 0 0 0 0 18" /></>,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
    brain: <><path d="M12 5.5A3.5 3.5 0 0 0 6 3.8 4 4 0 0 0 4 11a4 4 0 0 0 2 7.2 3.5 3.5 0 0 0 6-1.7zm0 0A3.5 3.5 0 0 1 18 3.8 4 4 0 0 1 20 11a4 4 0 0 1-2 7.2 3.5 3.5 0 0 1-6-1.7zM8 8c2 0 4 1.5 4 4m4-4c-2 0-4 1.5-4 4m-4 2h4m4 0h-4" /></>,
    project: <><rect x="3" y="4" width="8" height="7" rx="1.5" /><rect x="13" y="4" width="8" height="7" rx="1.5" /><rect x="3" y="13" width="8" height="7" rx="1.5" /><rect x="13" y="13" width="8" height="7" rx="1.5" /></>,
    interaction: <><circle cx="8" cy="8" r="2.2" /><path d="M4.2 16.2a3.8 3.8 0 0 1 7.6 0" /><rect x="13.5" y="5.5" width="7" height="5.5" rx="1" /><path d="M15.5 14h3" /></>,
    send: <><path d="m21 3-7.2 18-3.7-7.1L3 10.2z" /><path d="M21 3 10.1 13.9" /></>,
    sparkle: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" /><path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20M8 7h8" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01" /></>,
    play: <><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4z" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...common}
      {...props}
    >
      {content[name]}
    </svg>
  )
}

export default Icon
