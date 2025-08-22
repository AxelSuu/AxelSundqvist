# Axel Sundqvist - Personal Portfolio

A modern, responsive personal website for Axel Sundqvist, showcasing work in Applied Physics & Electrical Engineering with specializations in Communications, Signal Processing, Machine Learning, and Applied Mathematics. Includes rich, interactive technical demos (wireless communications, signal processing, algorithm visualizations) and a growing technical blog.

![Portfolio Preview](https://via.placeholder.com/800x400/1e293b/f8fafc?text=Axel+Sundqvist+Portfolio)

## 🚀 Features

- **Modern Design**: Clean, professional layout with dark/light theme support
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Technical Demos**: Real‑time canvas simulations (Wireless Communication Simulator, Signal Processing Demo, Algorithm Visualizations)
- **Animated Backgrounds**: Code rain matrix + subtle animated particle layers
- **Scroll & Typing Effects**: Scroll progress bar and delayed typewriter intro
- **Portfolio Showcase**: Featured & other project grids with tech badges
- **Blog System**: In‑page modal reader, search/filter, tag badges
- **Theme Toggle**: Seamless dark/light mode switching with persistence
- **Accessibility Considerations**: Keyboard focus styles & ARIA where needed
- **Academic Focus**: Tailored for engineering / research audience

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: Hot reload, ESLint, PostCSS
- **Deployment**: Ready for Vercel, Netlify, or GitHub Pages

## 📁 Project Structure

```
axel-sundqvist-portfolio/
├── public/
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── portfolio/           # Portfolio-specific components
│   │   │   ├── hero.tsx        # Hero (typing + scroll progress)
│   │   │   ├── about.tsx       # About (education, skills, achievements)
│   │   │   ├── projects.tsx    # Projects + interactive simulations
│   │   │   ├── blog.tsx        # Blog (search + modal reader)
│   │   │   ├── contact.tsx     # Contact form
│   │   │   ├── footer.tsx      # Footer
│   │   │   └── navigation.tsx  # Navigation bar
│   │   ├── ui/visualizations/  # (If extracted later) visualization building blocks
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   └── [other-ui-components]
│   │   ├── theme-provider.tsx  # Theme context provider
│   │   └── mode-toggle.tsx     # Theme toggle component
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   ├── pages/
│   │   ├── index.tsx
│   │   └── notfound.tsx
│   ├── app.tsx                # Main app component
│   ├── main.tsx              # Entry point
│   ├── index.css             # Global styles with CSS variables
│   └── app.css               # Component-specific styles
├── components.json            # shadcn/ui config
├── eslint.config.js          # ESLint configuration
├── index.html                # Main HTML template
├── package.json              # Dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── README.md                 # This file
└── CLAUDE.md                 # AI development guide
```

## 🎨 Website Sections

### 🏠 Hero Section
- Typewriter effect for name reveal
- Scroll progress indicator bar (top)
- Social links (GitHub / LinkedIn / Email)
- Thematic animated background (particles / gradient overlay)

### 👨‍🎓 About Section
- Education timeline (B.Sc. → upcoming MSE)
- Skill cards with icon + color code
- Personal + motivation narrative
- Achievements grid (hover elevation)

### 💼 Projects Section
- **Interactive Simulations (top)**:
  - Wireless Communication Simulator (channel effects, modulation, fading, rudimentary MIMO visualization)
  - Signal Processing Demo (time vs frequency domain, FFT, AM/FM etc.)
  - Algorithm Visualizations (data‑structures / algorithms showcase)
- **Featured Projects**:
  - Stock Price Predictor Suite (PyTorch forecasting stack)
  - Communication Systems Simulations (channels, equalizers, MIMO, practical systems)
- **Other Projects**:
  - 2D Platformer Game (Pygame custom physics engine)
  - Notepad App (lightweight text editing + file management)
- Animated code rain background + glassy card surfaces
- Tech badges, GitHub + Demo buttons

### 📝 Blog Section
- Featured + regular posts arrays (flag by `featured` boolean)
- Search filtering (client-side, term vs title/excerpt/tags)
- Modal dialog reader (rich HTML content injection)
- Tag badges + read time + date metadata
- Extensible structure for future MD/MDX or CMS integration

### 📧 Contact Section
- Direct email and social links
- (Form placeholder / extend as needed)

### 🔗 Footer
- Brand information and social links
- Quick navigation links
- Contact information summary
- Copyright and attribution

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/AxelSuu/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Production bundle + type check
- `npm run preview` - Serve built assets locally
- `npm run lint` - ESLint (TypeScript + React rules)

### Development Workflow

1. **Component Development**: All portfolio components are in `src/components/portfolio/`
2. **UI Components**: Reusable components in `src/components/ui/`
3. **Styling**: Tailwind CSS with custom CSS variables for theming
4. **Type Safety**: Full TypeScript support with strict configuration
5. **Linting**: ESLint with React and TypeScript rules

### Customization Guide

#### 1. Personal Information
Update content in portfolio components:
- `src/components/portfolio/hero.tsx` - Name, title, specializations
- `src/components/portfolio/about.tsx` - Education, skills, achievements
- `src/components/portfolio/contact.tsx` - Contact information

#### 2. Projects & Simulations
Modify project data in `src/components/portfolio/projects.tsx` (the `projects` array). Interactive simulations sit above the grids as standalone components—extend or swap them by importing your new component and adding it to the "Interactive Features" stack.

#### 3. Blog Posts
Posts are defined inline (`blogPosts` array). Each entry supports: `title`, `excerpt`, `date`, `readTime`, `tags`, `featured`, `href`, `fullContent` (HTML string), and optional `links` (GitHub/external). For scaling, consider extracting to JSON/MDX.

#### 4. Styling and Theming
Customize colors and themes in `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: "hsl(var(--primary))",
      // ... other colors
    }
  }
}
```

#### 5. Social Links
Update social media links in components:
- `src/components/portfolio/hero.tsx`
- `src/components/portfolio/contact.tsx`
- `src/components/portfolio/footer.tsx`

## 🎯 Academic Portfolio Features

- **Technical Focus**: Emphasizes signal processing, machine learning, and communications
- **Academic Credentials**: Clear education section with degree information
- **Research Showcase**: Dedicated space for academic projects and publications
- **Professional Presentation**: Clean, academic-friendly design
- **Contact Integration**: Professional contact methods for academic networking
- **Publication Ready**: Structured for academic CV and publication listings

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: Full-featured layout with hover effects
- **Tablets**: Adapted grid layouts and touch-friendly navigation
- **Mobile**: Simplified layouts with collapsible navigation
- **Different Orientations**: Landscape and portrait support

## 🌙 Theme System

- **Dark Mode**: Professional dark theme for extended viewing
- **Light Mode**: Clean light theme for presentations and printing
- **System Theme**: Automatic theme detection based on OS preferences
- **Smooth Transitions**: Animated theme switching with CSS transitions
- **Persistent Storage**: Theme preference saved in localStorage

## 🔗 Social Media Integration

The website includes integration for:
- **GitHub**: Code repositories and contributions
- **LinkedIn**: Professional networking and experience
- **Email**: Direct contact for opportunities
- **Twitter/X**: Academic and professional updates
- **Academic Networks**: ResearchGate, Google Scholar, ORCID

## 📊 Performance & SEO

- **Fast Loading**: Optimized images and code splitting
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Accessibility**: ARIA labels and keyboard navigation
- **PWA Ready**: Service worker and manifest file support
- **Analytics Ready**: Google Analytics integration support

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically with each push

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Deploy from GitHub repository

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json
3. Run `npm run deploy`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📧 Contact

**Axel Sundqvist**
- Email: axesu672@student.liu.se
- LinkedIn: [linkedin.com/in/axel-sundqvist](https://www.linkedin.com/in/axel-sundqvist/)
- GitHub: [github.com/AxelSuu](https://github.com/AxelSuu)

**Project Link**: [https://github.com/AxelSuu/portfolio](https://github.com/AxelSuu/portfolio)

---

*Built with ❤️, curiosity, and lots of coffee by Axel Sundqvist*
