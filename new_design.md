# Personal Portfolio Website Revamp Prompt

## Main objective

Revamp the copy, structure, and UI/UX of my personal portfolio website.

**The Ericsson R&D summer internship is the main professional update and should be one of the most prominent pieces of content on the entire site.** It should not be treated as a minor bullet point inside an About section. The site should clearly show that I recently completed a substantive R&D internship at Ericsson Radio and that this experience is now a central part of my professional profile.

Do not turn the website into a generic developer portfolio, flashy AI landing page, or resume dumped into HTML. Preserve the existing distinctive editorial / technical visual identity, but make it more mature, intentional, readable, and aligned with my current profile.

The desired impression within roughly 10 seconds is:

> M.Sc. engineering student at Linköping University with real Ericsson R&D experience in radio hardware drivers and embedded Linux, who also builds wireless and embedded systems independently.

The tone should be understated, technically credible, personal, and confident without sounding corporate, exaggerated, or AI-generated.

---

# 1. Ericsson R&D summer internship — PRIMARY CONTENT

## Internship

**R&D Summer Intern — Radio Hardware Drivers, Ericsson Radio**  
Stockholm, Sweden  
June 2026 – August 2026

Worked in Ericsson Business Area Networks (BNEW), in the Radio Unit software organization, on radio hardware drivers.

This is my most important recent professional experience and should receive significantly more visual and editorial weight than my older student work.

### What I actually worked on

- Radio driver implementation and testing in `xcs-rhd`, supporting 20+ radio platforms
- Developed C / Bash / Unix / Linux hardware and interface tests
- Developed link-layer networking test tools
- Developed CI jobs and validation
- Removed dependence on expensive external equipment by automating manual hardware-configuration testing through a nightly CI pipeline
- Contributed to build infrastructure, software patterns, development workflow, and documentation
- Investigated nightly CI failures through logs

### What this communicates

The site should make clear that:

- This was real R&D work, not an internal hobby project
- I worked directly on software used by Ericsson Radio platforms
- The work was close to Ericsson's core commercial radio products
- The role involved embedded Linux, C, low-level software, hardware interfaces, networking, testing, and CI
- I worked on a concrete part of a commercial radio stack
- I had hands-on responsibility for development and validation tasks

### Important accuracy boundary

Do **not** claim or imply that I personally generated Ericsson's revenue or that my work directly produced billions of dollars of revenue.

It is fine to communicate the commercial importance of the platform, for example:

> Worked with radio hardware drivers for Ericsson's radios, which are at the core of Ericsson's products.

or, if useful in a more detailed section:

> Worked on radio hardware drivers for platforms used across Ericsson's commercial radio products.

The point is to communicate **proximity to real commercial products and core technology**, not to claim personal business impact.

Do not use phrases such as:

- “generated billions in revenue”
- “drove billions of revenue”
- “responsible for billions”
- “single-handedly”
- “mission critical” unless directly justified
- “designed Ericsson's radio platform”
- “architected Ericsson's Radio Unit”

---

# 2. Ericsson section should be one of the visual anchors of the homepage

The homepage should not bury Ericsson below several student projects.

Recommended hierarchy:

### Hero
Current identity and concise Ericsson credibility signal.

### Featured experience
**01 — Ericsson Radio / Radio Hardware Drivers**

### Personal projects
**02 — ESP32-S3 Wireless Embedded System**
**03 — PyQuant**

### Earlier R&D experience
**04 — Infrasonik**

Ericsson should be the first and strongest work section after the hero.

It may be worth visually separating **Professional Experience** from **Projects**, even if the website remains a single scrolling page.

For example:

> SELECTED EXPERIENCE
>
> 01 / ERICSSON RADIO

followed later by:

> SELECTED PROJECTS
>
> 02 / ESP32-S3
> 03 / PYQUANT

This immediately establishes that Ericsson is professional experience rather than another side project.

---

# 3. Recommended Ericsson copy direction

Possible concise main description:

> Worked with radio hardware drivers for Ericsson's radios, which are at the core of Ericsson's products.

Possible more technical version:

> Worked with radio hardware drivers for Ericsson Radio Unit platforms, developing and validating low-level software, hardware tests, link-layer networking tools, and CI validation.

Do not use both as full paragraphs. Pick one concise primary description and use the supporting rows to provide detail.

Suggested supporting rows:

### RADIO DRIVERS
Implementation and testing across 20+ radio platforms

### HARDWARE TESTING
C / Bash / Linux interface and validation tests

### CI AUTOMATION
Automated hardware-configuration testing and nightly validation

Alternative fourth row if useful:

### NETWORKING
Link-layer test tools and Ethernet / interface validation

Use only 3–4 rows. Do not turn this into another CV.

---

# 4. Ericsson visual treatment

The existing project layout is good and should be reused for Ericsson, but with stronger hierarchy.

Recommended structure:

- Large Ericsson / Radio Unit image, screenshot, architecture graphic, or appropriate visual on one side
- On the other side:
  - DATE / LOCATION / ROLE
  - ERICSSON RADIO
  - short description
  - 3 concise contribution rows
  - tags
  - optional LinkedIn / experience link if appropriate

Suggested tags:

> RADIO HARDWARE
> EMBEDDED LINUX
> C / BASH
> TESTING
> CI
> NETWORKING

Do not visually present Ericsson as merely “Project 01”. It is professional experience.

A subtle label such as:

> PROFESSIONAL EXPERIENCE

could be useful.

---

# 5. Current professional profile

I am an M.Sc. student in Applied Physics and Electrical Engineering at Linköping University, specializing in Communication Systems.

My strongest technical interests and experience are:

- Embedded systems
- Embedded Linux
- Wireless communication
- Radio / telecom
- Systems engineering
- Hardware/software interaction
- Testing and validation
- C / C++
- ESP32 / ESP-IDF / FreeRTOS

The website should communicate this profile rather than listing every technology I have touched.

Do not make me sound like:

- a generic full-stack developer
- an AI/ML influencer
- a startup founder
- an overly academic researcher
- a “10x engineer”
- someone who only lists technologies

---

# 6. Hero section

Current hero copy:

> Axel Sundqvist
>
> R&D intern @ Ericsson Business Area Networks (BNEW).
>
> M.Sc. student in Applied Physics and Electrical Engineering @ LiU.

This is outdated because the internship has ended.

Do not describe me as a current intern.

A good direction:

> Axel Sundqvist
>
> M.Sc. student in Applied Physics & Electrical Engineering at Linköping University.
>
> R&D experience in embedded Linux, radio hardware drivers and wireless systems at Ericsson.

The exact wording can be improved, but keep it compact.

The hero should communicate both **current student identity** and **recent Ericsson R&D credibility** immediately.

Do not fill the hero with a long technology list.

---

# 7. Hero tags

Current:

> Telecom
> Embedded Systems
> 5G RAN
> Wi-Fi / Bluetooth
> ESP-IDF / FreeRTOS

These can remain stylistically, but the selection should be tightened.

Possible direction:

> EMBEDDED SYSTEMS
> WIRELESS / RADIO
> EMBEDDED LINUX
> ESP-IDF / FREERTOS
> C / C++

Only use genuinely relevant skills.

---

# 8. Existing visual identity

The screenshots show a distinctive visual language:

- Oversized typography
- Large black display text
- Monospace secondary text
- Light neutral / off-white background
- Thin grid lines
- Green accent color
- Sparse editorial layout
- Large project imagery
- Project numbering
- Thin borders
- Small technical labels
- Minimal line icons

Preserve this identity.

Do not replace it with:

- generic dark developer portfolio styling
- SaaS landing-page styling
- glassmorphism
- excessive gradients
- giant collections of cards
- animated gimmicks
- template-like component libraries

The site should feel like an evolved version of the existing design.

---

# 9. Hero UI / UX

The oversized “AXEL SUNDQVIST” is visually strong and should remain a major element.

Improve it by:

- keeping the oversized name
- moving the professional identity slightly closer to the name if appropriate
- making GitHub / LinkedIn / email icons clearly discoverable
- adding useful hover states
- ensuring icons have sufficient contrast
- avoiding a first viewport that is almost entirely the name
- reducing typography appropriately on mobile

The hero should answer:

1. Who is this?
2. What does he study?
3. What kind of engineer is he becoming?
4. Why does he have credible real-world experience?

Ericsson is the key credibility signal and should be visible without scrolling very far.

---

# 10. Background grid

The technical grid is a good part of the site's identity.

Keep it subtle:

- low contrast
- never competing with text
- no excessive decorative noise
- consistent across sections
- readable on mobile

It should feel like a visual motif, not a dashboard background.

---

# 11. Personal projects

## 02 — ESP32-S3 Wireless Embedded System

This is one of the strongest personal projects.

Possible copy:

> A fully wireless embedded system built on ESP-IDF and FreeRTOS. The ESP32 acts as a Wi-Fi access point and communicates with a browser-based controller over WebSocket.

Supporting rows:

### EMBEDDED
C / ESP-IDF / FreeRTOS

### NETWORKING
Wi-Fi AP and WebSocket communication

### REAL-TIME SYSTEM
Shared-state synchronization, reconnect handling, and latency measurements

Tags:

> C
> ESP-IDF
> FREERTOS
> WI-FI
> WEBSOCKET
> SPI

---

# 12. PyQuant

Possible copy:

> A forecasting pipeline built around a Temporal Fusion Transformer, producing multi-horizon probabilistic forecasts with automated testing and nightly CI validation.

Supporting rows:

### FORECASTING
p10 / p50 / p90 multi-horizon forecasts

### DATA
Leakage-audited daily panel from four vendors

### ENGINEERING
570+ tests, nightly CI, CLI and FastAPI service

Tags:

> PYTHON
> PYTORCH
> TIME SERIES
> CI
> FASTAPI

Do not make the project sound like an AI startup.

---

# 13. Infrasonik

Keep this as earlier R&D experience, not equal in prominence to Ericsson.

Possible copy:

> Worked with a small R&D team developing and testing infrasound-based grain drying technology. The work contributed to trials targeting a 50% reduction in energy consumption.

Supporting rows:

### PROTOTYPE DEVELOPMENT
From specification to functional prototype

### TECHNICAL DOCUMENTATION
Reports, documentation, and project specifications

### LAB TESTING
Testing contributing to grain-drying trials

Tags:

> INFRASOUND
> PROTOTYPE DEV
> LAB TESTING
> R&D

---

# 14. Remove or de-emphasize old projects

The existing OpenAirInterface 5G RAN fork and old LSTM stock project are no longer the strongest representation of me.

Prefer removing them or placing them behind a small “More projects” / GitHub link.

Do not make the site look like an archive of every university exercise.

The most convincing story is:

**Ericsson professional R&D → own embedded/wireless systems → stronger software/ML project → earlier physical R&D**

---

# 15. About section

Current copy is too dense and reads like compressed CV copy.

Potential direction:

> I'm an M.Sc. student in Applied Physics & Electrical Engineering at Linköping University, focusing on Communication Systems.
>
> My main interests are embedded systems, wireless communication and systems-level software. During my R&D internship at Ericsson, I worked with radio hardware drivers and embedded Linux for Radio Unit platforms. Outside university, I build my own embedded and wireless systems around ESP32, ESP-IDF and FreeRTOS.

Keep it human and concise.

Do not add generic phrases such as:

- passionate about technology
- lifelong learner
- passionate problem solver
- driven by innovation
- excited by challenges

---

# 16. Skills

Do not use a giant keyword cloud like:

> C C++ ESP-IDF / FreeRTOS Embedded Systems Wi-Fi Bluetooth Networking Python MATLAB 5G Toolkit PyTorch Valgrind CMake

Group skills instead.

Suggested structure:

### LANGUAGES
C · C++ · Python · Bash · MATLAB

### EMBEDDED & SYSTEMS
Embedded Linux · ESP-IDF · FreeRTOS · Git · Make · CMake · Jenkins

### WIRELESS & NETWORKING
Wi-Fi · Bluetooth · TCP/IP · Radio systems · O-RAN

### DATA & ML
PyTorch · NumPy · SciPy · Pandas

Only list skills that genuinely represent current competence.

---

# 17. Education

Current site says:

> B.Sc. Applied Physics & EE (2023 – 2026)
> M.Sc. Communication Systems (2026 – 2028)

Update to:

> **M.Sc. Applied Physics & Electrical Engineering**
> Communication Systems
> Linköping University · 2023–2028

Optionally include a few relevant courses. Do not turn it into a transcript.

---

# 18. Student engagement

Keep if it fits visually:

> **Student engagement**
> Bartending at VilleValla student pub in Linköping.

This adds human context and is intentionally less technical.

---

# 19. Navigation / information architecture

Keep navigation minimal.

Recommended:

- Home
- Experience / Work
- Projects
- About
- GitHub
- LinkedIn
- Email

A single-page scrolling site is completely appropriate.

If the site is already single-page, do not create unnecessary subpages.

Do not over-engineer navigation.

---

# 20. Project section UX

The current two-column editorial project layout is good:

- image on one side
- metadata/title/copy on the other
- supporting rows
- tags
- repository link

Keep the structure but establish clearer hierarchy:

1. Section number / date
2. Experience type
3. Title
4. Strong one- or two-sentence description
5. 2–3 concise highlights
6. Tags
7. Link

For Ericsson, explicitly label the section as **Professional Experience** rather than letting it visually look like another side project.

Avoid repeating the same information in multiple places.

---

# 21. Responsive design

The oversized typography and two-column sections need careful mobile handling.

On mobile:

- stack image and text
- reduce heading sizes substantially
- preserve readable line lengths
- keep important links easy to tap
- avoid horizontal scrolling
- avoid huge blank gaps
- preserve project image quality
- do not simply scale the desktop layout down proportionally

The Ericsson section should remain the first major content section on mobile too.

---

# 22. Typography

The contrast between large display typography and monospace technical copy is a major part of the identity.

Keep it, but improve readability:

- no long body paragraphs in monospace
- comfortable line height
- limited text width
- use size / weight for hierarchy
- keep green as an accent
- avoid tiny metadata that is hard to read

Technical does not need to mean difficult to read.

---

# 23. Visual consistency

Maintain a consistent visual system using:

- green accent
- thin borders
- 01 / 02 / 03 numbering
- compact metadata
- technical tags
- editorial image/text split
- restrained icons

Apply the same system to Ericsson, ESP32, PyQuant, and Infrasonik, while making the Ericsson section visually strongest.

---

# 24. Copywriting rules

Write like a young engineer describing real work.

Prefer:

- concrete
- concise
- factual
- confident
- understated
- natural English

Avoid generic portfolio / LinkedIn language such as:

- passionate about
- driven by
- cutting-edge
- innovative solutions
- dynamic environment
- invaluable experience
- where technology meets...
- transforming ideas into reality
- solving complex problems
- passionate problem solver
- lifelong learner
- multidisciplinary
- at the intersection of...
- empowering
- leveraging
- exciting journey
- impactful
- state-of-the-art

Do not invent personality.
Do not exaggerate.
Do not use marketing language when a factual sentence is better.

---

# 25. Accuracy rules

Never imply:

- that I designed an entire Ericsson radio platform
- that I personally generated Ericsson revenue
- that I owned product-level decisions
- that I was a senior engineer
- that every project was production-critical
- that experimental work was a commercial product

Correct positioning:

- I worked on radio hardware drivers and validation
- the work supported 20+ radio platforms
- the work was part of Ericsson's commercial radio stack
- I built embedded and wireless systems independently
- I have practical R&D experience

---

# 26. Final target

After the revamp, the website should tell a coherent story:

**Axel is an M.Sc. engineering student at LiU. He recently worked in Ericsson Radio R&D on radio hardware drivers and embedded Linux for commercial radio platforms. Outside work, he builds his own wireless embedded systems and substantial software projects.**

The site should feel:

- technically credible
- understated
- modern
- personal
- professional
- slightly unconventional
- clearly engineered

It should not feel:

- corporate
- generic
- buzzword-heavy
- over-designed
- AI-generated
- like a student CV pasted into a website

---

# 27. Implementation order

Do not mechanically rewrite every section.

First understand the existing design language and hierarchy.

Then implement in this order:

1. Make Ericsson the primary professional experience on the site
2. Update the hero to reflect the completed Ericsson internship
3. Build a strong Ericsson section using the existing project visual language
4. Separate professional experience from personal projects visually
5. Reorder projects around the current professional story
6. Rewrite copy to be concise and factual
7. Remove/de-emphasize outdated projects
8. Improve responsive layout
9. Improve typography and hierarchy
10. Keep the page lightweight and fast

The result should feel like an evolution of the existing site, with the Ericsson R&D internship clearly acting as the biggest update and strongest professional signal.

