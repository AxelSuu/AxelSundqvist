import type { Profile } from "./types"

export const profile: Profile = {
  name: "Axel Sundqvist",
  initials: "AS",
  role: "R&D Intern @ Ericsson · Applied Physics & EE",
  location: "Linköping / Stockholm, Sweden",
  email: "axesu672@student.liu.se",

  lede: [
    "R&D intern at Ericsson Business Area Networks, building the systems that move signals through the world.",
    "Applied Physics & Electrical Engineering at Linköping University — working where telecom, embedded systems and signal processing meet.",
  ],

  focus: [
    "Telecom",
    "Embedded Systems",
    "5G RAN",
    "Signal Processing",
    "Wi-Fi / Bluetooth",
  ],

  bio: [
    "I'm an Ericsson 2026 R&D summer intern with a background in signal processing, embedded systems and the ESP32 / ESP-IDF platform.",
    "I've written device drivers and ESP-IDF wireless projects, prototyped algorithms in PyTorch, and worked across build systems, testing, memory management and technical documentation — most at home where low-level hardware meets real-world radio.",
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/AxelSuu", handle: "AxelSuu", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/axel-sundqvist/", handle: "axel-sundqvist", icon: "linkedin" },
    { label: "Email", href: "mailto:axesu672@student.liu.se", handle: "axesu672@student.liu.se", icon: "mail" },
  ],

  education: [
    { degree: "B.Sc. Applied Physics & Electrical Engineering", period: "2023 — 2026", school: "Linköping University" },
    { degree: "M.Sc. Communication Systems", period: "2026 — 2028", school: "Linköping University" },
  ],

  skills: [
    "C", "C++", "ESP-IDF / FreeRTOS", "Embedded Systems", "Wi-Fi", "Bluetooth",
    "Networking", "Python", "MATLAB", "5G Toolkit", "PyTorch", "Valgrind", "CMake",
  ],

  engagement: [
    { title: "Student Engagement", lines: ["Bartending at VilleValla student pub"] },
  ],

  moreReposHref: "https://github.com/AxelSuu",
}
