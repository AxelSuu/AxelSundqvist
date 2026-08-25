/* Single source of truth for everything the film shows. */

export const PERSON = {
  first: 'Axel',
  last: 'Sundqvist',
  role: 'M.Sc. Applied Physics & Electrical Engineering',
  track: 'Communication Systems',
  school: 'Linköping University',
  years: '2023 — 2028',
  based: 'Linköping / Stockholm, Sweden',
  email: 'axesu672@student.liu.se',
  github: 'https://github.com/AxelSuu',
  githubHandle: 'github.com/AxelSuu',
  linkedin: 'https://www.linkedin.com/in/axel-sundqvist/',
  linkedinHandle: 'linkedin.com/in/axel-sundqvist',
  portrait: '/images/me2.png',
}

/* --------------------------------------------------------------------------
   Chapters — the same work, cut for a dark room.
   -------------------------------------------------------------------------- */

export type Chapter = {
  id: string
  kicker: string
  title: string
  line: string
  image: string
  fit: 'cover' | 'contain'
  facts: [string, string][]
  tags: string[]
  href?: string
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'ericsson',
    kicker: 'Ericsson Summer R&D Internship · Stockholm · 2026',
    title: 'Where the software\ntouches silicon',
    line: 'I developed radio hardware drivers for Ericsson’s radios, kept target-agnostic so one implementation serves several platforms, and delivered the nightly CI hardware tests that verify them.',
    image: '/images/ericsson-team.jpeg',
    fit: 'cover',
    facts: [
      ['Role', 'R&D Summer Intern'],
      ['Team', 'Radio Unit XCS'],
      ['Stack', 'Embedded Linux · C · Bash'],
    ],
    tags: ['Radio hardware', 'Drivers', 'Hardware testing', 'CI'],
    href: 'https://www.linkedin.com/in/axel-sundqvist/',
  },
  {
    id: 'esp32',
    kicker: 'Personal embedded project · ESP32-S3',
    title: 'Embedded systems\nprototyping lab bench',
    line: 'I built a wireless ESP-IDF project: the board raises its own Wi-Fi access point and communicates over WebSocket, with FreeRTOS tasks, queues and priorities laid out by hand.',
    image: '/images/esp32.jpeg',
    fit: 'cover',
    facts: [
      ['Target', 'ESP32-S3'],
      ['Layer', 'FreeRTOS / ESP-IDF'],
      ['Protocol', 'Wi-Fi AP · WebSocket · SPI'],
    ],
    tags: ['C', 'ESP-IDF', 'FreeRTOS', 'Wi-Fi'],
    href: 'https://github.com/AxelSuu/ESP32-Wi-Fi-Pong',
  },
  {
    id: 'infrasonik',
    kicker: 'Infrasonik Intern · Stockholm · 2022—23',
    title: 'Drying grain\nwith sound',
    line: 'Moving moisture with low-frequency pressure waves instead of heat. I worked with a small R&D team developing and testing infrasound-based grain-drying technology.',
    image: '/images/infradryer.png',
    fit: 'cover',
    facts: [
      ['Role', 'Intern'],
      ['Work', 'Prototype · lab test · docs'],
      ['Result', 'Productization'],
    ],
    tags: ['Infrasound', 'Prototyping', 'Lab testing'],
  },
  {
    id: 'pyquant',
    kicker: 'Personal API project · PyQuant',
    title: 'Multi-horizon\ntrend forecasting',
    line: 'I built a forecasting pipeline around a Temporal Fusion Transformer, producing multi-horizon probabilistic forecasts with automated testing and nightly CI validation.',
    image: '/images/pystock.png',
    fit: 'contain',
    facts: [
      ['Model', 'Temporal Fusion Transformer'],
      ['Stack', 'PyTorch · Market data vendors'],
      ['Validation', 'Nightly CI'],
    ],
    tags: ['Python', 'PyTorch', 'Time series', 'CI'],
    href: 'https://github.com/AxelSuu/Pytorch-Quant-Model',
  },
  {
    id: 'profile',
    kicker: 'Linköping · Stockholm',
    title: 'Who is\nAxel Sundqvist',
    line: 'Fourth-year M.Sc. student in Applied Physics and Electrical Engineering, master’s profile in communication systems. I came to it from the physics side, interested in teamwork, new technologies and challenges.',
    image: '/images/me2.png',
    fit: 'cover',
    facts: [
      ['Studying', 'M.Sc. Applied Physics & EE'],
      ['At', 'Linköping University, 2023—2028'],
      ['Also', 'Behind the bar at VilleValla'],
    ],
    tags: ['C', 'C++', 'Rust', 'Embedded Linux', 'ESP-IDF', 'PyTorch'],
  },
]
