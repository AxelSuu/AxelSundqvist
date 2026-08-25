/* Single source of truth for everything the sheet prints. */

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

export const LEDE = [
  `Fourth-year M.Sc. student in Applied Physics and Electrical Engineering at Linköping University, specialising in communication systems. My work sits at the layer where software meets the hardware it runs on: radio drivers, embedded Linux, and the test rigs that prove any of it works.`,
  `Most recently in Ericsson's R&D organisation in Stockholm, writing target-agnostic drivers for the radio units that carry mobile traffic, and the nightly hardware CI that keeps them honest. Before that, prototype work on infrasound grain drying at Infrasonik.`,
]

export const ROLES = [
  {
    id: 'ericsson',
    kicker: 'Lead',
    org: 'Ericsson',
    unit: 'Radio Unit software, R&D',
    title: 'Drivers for the radios that carry the traffic',
    place: 'Stockholm, Sweden',
    period: 'Jun — Aug 2026',
    capacity: 'R&D Summer Intern',
    image: '/images/ericsson-team.jpeg',
    caption: 'The Radio Unit software team, Ericsson Kista campus.',
    body: [
      `Radio units are the part of the network that turns bits into radio and back again, and the driver layer is where the software finally touches silicon. I worked on that layer: implementing hardware drivers written to stay target-agnostic, so the same code serves more than one radio platform rather than forking per product.`,
      `The other half of the job was proving it. I built and extended dynamic hardware tests that run against real boards, and wired them into a nightly CI pipeline so a regression surfaces the following morning instead of at integration. Embedded Linux, C, and a great deal of Bash held it together.`,
    ],
    marks: [
      ['Radio drivers', 'Target-agnostic driver implementation across radio platforms.'],
      ['Hardware testing', 'Dynamic validation executed against physical boards.'],
      ['CI automation', 'Nightly hardware test runs, results back by morning.'],
    ],
    tags: ['Radio hardware', 'Embedded Linux', 'C', 'Bash', 'Hardware test', 'CI', 'Networking'],
    link: { href: 'https://www.linkedin.com/in/axel-sundqvist/', label: 'Record on LinkedIn' },
  },
  {
    id: 'infrasonik',
    kicker: 'Field',
    org: 'Infrasonik',
    unit: 'R&D',
    title: 'Drying grain with sound instead of heat',
    place: 'Sweden',
    period: 'Dec 2022 — Apr 2023',
    capacity: 'R&D Project Work',
    image: '/images/infradryer.png',
    caption: 'Infrasound dryer prototype under test.',
    body: [
      `A small R&D team developing infrasound-based grain drying — moving moisture with low-frequency pressure waves rather than brute heat. The trials it fed targeted a fifty per cent cut in energy consumption against conventional drying.`,
      `My part ran from specification through to a functional prototype, then into the lab: running the tests, and writing the reports and specifications that made the results usable by everyone else on the project.`,
    ],
    marks: [
      ['Prototype development', 'Specification through to a working unit.'],
      ['Lab testing', 'Measurements feeding the grain-drying trials.'],
      ['Documentation', 'Reports and project specifications.'],
    ],
    tags: ['Infrasound', 'Prototyping', 'Lab testing', 'R&D'],
    link: null,
  },
] as const

export const WORKS = [
  {
    id: 'esp32',
    title: 'ESP32-S3 wireless embedded system',
    image: '/images/esp32.jpeg',
    caption: 'ESP32-S3 target, bench build.',
    body: `A fully wireless embedded system on ESP-IDF and FreeRTOS. The board raises its own Wi-Fi access point and talks to a browser-based controller over a WebSocket, so nothing between the operator and the target is wired.`,
    tags: ['C', 'ESP-IDF', 'FreeRTOS', 'Wi-Fi', 'WebSocket', 'SPI'],
    href: 'https://github.com/AxelSuu/ESP32-Wi-Fi-Pong',
  },
  {
    id: 'pyquant',
    title: 'PyQuant forecasting pipeline',
    image: '/images/pystock.png',
    caption: 'Multi-horizon forecast output.',
    body: `A forecasting pipeline built around a Temporal Fusion Transformer, producing multi-horizon probabilistic forecasts. Automated tests and nightly CI validation run the whole pipeline unattended.`,
    tags: ['Python', 'PyTorch', 'Time series', 'FastAPI', 'CI'],
    href: 'https://github.com/AxelSuu/Pytorch-Quant-Model',
  },
] as const

export const SKILLS = [
  { title: 'Languages', items: ['C', 'C++', 'Rust', 'Python', 'Bash', 'MATLAB'] },
  { title: 'Embedded & systems', items: ['Embedded Linux', 'ESP-IDF', 'FreeRTOS', 'Git', 'Make', 'CMake', 'Jenkins'] },
  { title: 'Wireless & networking', items: ['Wi-Fi', 'Bluetooth', 'TCP/IP', 'Radio systems', 'O-RAN'] },
  { title: 'Data & ML', items: ['PyTorch', 'NumPy', 'SciPy', 'Pandas'] },
] as const

export const ABOUT = [
  `I came to communication systems from the physics side, which is probably why I like the parts of engineering where an abstraction has to answer to a measurement. Embedded work is honest in that way: the board either enumerates or it doesn't.`,
  `Outside the university I build my own embedded and wireless systems around ESP32, ESP-IDF and FreeRTOS — small enough to finish, awkward enough to teach something. I also pull shifts behind the bar at VilleValla, the student pub in Linköping.`,
]

/* --------------------------------------------------------------------------
   The catalogue: every part of the site as one addressable entry.
   -------------------------------------------------------------------------- */

export type Entry = {
  id: string
  no: string
  title: string
  subtitle: string
  meta: string
  image: string
  blurb: string
  specs: [string, string][]
  tags: string[]
  links: { label: string; href: string }[]
}

export const ENTRIES: Entry[] = [
  {
    id: 'ericsson',
    no: '01',
    title: 'Ericsson',
    subtitle: 'Radio hardware drivers, R&D',
    meta: 'Stockholm · 2026',
    image: '/images/ericsson-team.jpeg',
    blurb:
      'Radio units turn bits into radio and back. The driver layer is where the software finally touches silicon — I wrote drivers there, kept target-agnostic so one implementation serves several radio platforms, and built the dynamic hardware tests and nightly CI that prove they still work each morning.',
    specs: [
      ['Capacity', 'R&D Summer Intern'],
      ['Team', 'Radio Unit software'],
      ['Period', 'Jun — Aug 2026'],
      ['Work', 'Drivers · hardware test · CI'],
    ],
    tags: ['Embedded Linux', 'C', 'Bash', 'Radio hardware', 'Hardware test', 'CI'],
    links: [{ label: 'Record on LinkedIn', href: 'https://www.linkedin.com/in/axel-sundqvist/' }],
  },
  {
    id: 'infrasonik',
    no: '02',
    title: 'Infrasonik',
    subtitle: 'Infrasound grain drying, R&D',
    meta: 'Sweden · 2022—23',
    image: '/images/infradryer.png',
    blurb:
      'A small R&D team moving moisture out of grain with low-frequency pressure waves instead of brute heat, chasing a fifty per cent cut in drying energy. I took work from specification to a functional prototype, ran the lab tests behind the trials, and wrote the reports that made the results usable.',
    specs: [
      ['Capacity', 'R&D project work'],
      ['Period', 'Dec 2022 — Apr 2023'],
      ['Target', '−50% drying energy'],
      ['Work', 'Prototype · lab test · docs'],
    ],
    tags: ['Infrasound', 'Prototyping', 'Lab testing', 'R&D'],
    links: [],
  },
  {
    id: 'esp32',
    no: '03',
    title: 'ESP32-S3',
    subtitle: 'Wireless embedded system',
    meta: 'Own work',
    image: '/images/esp32.jpeg',
    blurb:
      'A fully wireless embedded system on ESP-IDF and FreeRTOS. The board raises its own Wi-Fi access point and talks to a browser-based controller over a WebSocket, so nothing between the operator and the target is wired.',
    specs: [
      ['Target', 'ESP32-S3'],
      ['Runtime', 'FreeRTOS / ESP-IDF'],
      ['Link', 'Wi-Fi AP · WebSocket'],
      ['Bus', 'SPI'],
    ],
    tags: ['C', 'ESP-IDF', 'FreeRTOS', 'Wi-Fi', 'WebSocket', 'SPI'],
    links: [{ label: 'Source', href: 'https://github.com/AxelSuu/ESP32-Wi-Fi-Pong' }],
  },
  {
    id: 'pyquant',
    no: '04',
    title: 'PyQuant',
    subtitle: 'Probabilistic forecasting pipeline',
    meta: 'Own work',
    image: '/images/pystock.png',
    blurb:
      'A forecasting pipeline built around a Temporal Fusion Transformer, producing multi-horizon probabilistic forecasts. Automated tests and nightly CI validation run the whole thing unattended.',
    specs: [
      ['Model', 'Temporal Fusion Transformer'],
      ['Stack', 'PyTorch · FastAPI'],
      ['Output', 'Multi-horizon, probabilistic'],
      ['Validation', 'Nightly CI'],
    ],
    tags: ['Python', 'PyTorch', 'Time series', 'FastAPI', 'CI'],
    links: [{ label: 'Source', href: 'https://github.com/AxelSuu/Pytorch-Quant-Model' }],
  },
  {
    id: 'profile',
    no: '05',
    title: 'The engineer',
    subtitle: 'Who is doing all this',
    meta: 'Linköping · Stockholm',
    image: '/images/me2.png',
    blurb:
      'Fourth-year M.Sc. student in Applied Physics and Electrical Engineering, specialising in communication systems. I came to it from the physics side, which is probably why I like the parts of engineering where an abstraction has to answer to a measurement. Outside the university I build my own embedded systems around ESP32 — and pull shifts behind the bar at VilleValla.',
    specs: [
      ['Reading', 'M.Sc. Applied Physics & EE'],
      ['Track', 'Communication systems'],
      ['At', 'Linköping University, 2023—2028'],
      ['Based', 'Linköping / Stockholm'],
    ],
    tags: ['C', 'C++', 'Rust', 'Python', 'Embedded Linux', 'ESP-IDF', 'FreeRTOS', 'PyTorch', 'O-RAN'],
    links: [
      { label: 'GitHub', href: 'https://github.com/AxelSuu' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/axel-sundqvist/' },
    ],
  },
]

/* --------------------------------------------------------------------------
   Chapters — the same work, cut for a dark room.
   -------------------------------------------------------------------------- */

export type Chapter = {
  id: string
  no: string
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
    no: '01',
    kicker: 'Ericsson · Stockholm · 2026',
    title: 'Where the software\nfinally touches silicon',
    line: 'Radio units turn bits into radio and back again. I wrote drivers at that layer — kept target-agnostic, so one implementation serves several radio platforms — and the hardware tests and nightly CI that prove they still work each morning.',
    image: '/images/ericsson-team.jpeg',
    fit: 'cover',
    facts: [
      ['Role', 'R&D Summer Intern'],
      ['Team', 'Radio Unit software'],
      ['Stack', 'Embedded Linux · C · Bash'],
    ],
    tags: ['Radio hardware', 'Drivers', 'Hardware test', 'CI'],
    href: 'https://www.linkedin.com/in/axel-sundqvist/',
  },
  {
    id: 'esp32',
    no: '02',
    kicker: 'Own work · ESP32-S3',
    title: 'A machine with\nno wires left',
    line: 'The board raises its own Wi-Fi access point and speaks WebSocket to a browser. Tasks, queues and priorities laid out by hand on FreeRTOS, because at this size nothing decides them for you.',
    image: '/images/esp32.jpeg',
    fit: 'cover',
    facts: [
      ['Target', 'ESP32-S3'],
      ['Runtime', 'FreeRTOS / ESP-IDF'],
      ['Link', 'Wi-Fi AP · WebSocket · SPI'],
    ],
    tags: ['C', 'ESP-IDF', 'FreeRTOS', 'Wi-Fi'],
    href: 'https://github.com/AxelSuu/ESP32-Wi-Fi-Pong',
  },
  {
    id: 'infrasonik',
    no: '03',
    kicker: 'Infrasonik · R&D · 2022—23',
    title: 'Drying grain\nwith sound',
    line: 'Moving moisture with low-frequency pressure waves instead of brute heat, against a target of half the drying energy. Specification through prototype, then into the lab to find out whether it was true.',
    image: '/images/infradryer.png',
    fit: 'cover',
    facts: [
      ['Role', 'R&D project work'],
      ['Target', '−50% drying energy'],
      ['Work', 'Prototype · lab test · docs'],
    ],
    tags: ['Infrasound', 'Prototyping', 'Lab testing'],
  },
  {
    id: 'pyquant',
    no: '04',
    kicker: 'Own work · PyQuant',
    title: 'Forecasts that\nadmit their doubt',
    line: 'A Temporal Fusion Transformer producing multi-horizon probabilistic forecasts — not one number, a distribution. Served over FastAPI, revalidated by CI every night with nobody watching.',
    image: '/images/pystock.png',
    fit: 'contain',
    facts: [
      ['Model', 'Temporal Fusion Transformer'],
      ['Stack', 'PyTorch · FastAPI'],
      ['Validation', 'Nightly CI'],
    ],
    tags: ['Python', 'PyTorch', 'Time series', 'CI'],
    href: 'https://github.com/AxelSuu/Pytorch-Quant-Model',
  },
  {
    id: 'profile',
    no: '05',
    kicker: 'Linköping · Stockholm',
    title: 'The one doing\nall of this',
    line: 'Fourth-year M.Sc. student in Applied Physics and Electrical Engineering, on the communication systems track. I came to it from the physics side, which is probably why I like the parts of engineering where an abstraction has to answer to a measurement.',
    image: '/images/me2.png',
    fit: 'cover',
    facts: [
      ['Reading', 'M.Sc. Applied Physics & EE'],
      ['At', 'Linköping University, 2023—2028'],
      ['Also', 'Behind the bar at VilleValla'],
    ],
    tags: ['C', 'C++', 'Rust', 'Embedded Linux', 'ESP-IDF', 'PyTorch'],
  },
]
