# Axel Sundqvist - Personal Portfolio

A modern, responsive personal website for Axel Sundqvist, showcasing his work in Applied Physics and Electrical Engineering with specializations in Communications, Signal Processing, and Machine Learning.

![Portfolio Preview](https://via.placeholder.com/800x400/1e293b/f8fafc?text=Axel+Sundqvist+Portfolio)

## 🚀 Features

- **Modern Design**: Clean, professional layout with dark/light theme support
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Smooth animations and hover effects
- **Portfolio Showcase**: Dedicated sections for projects and achievements
- **Blog Integration**: Ready for technical blog posts and articles
- **Contact Form**: Professional contact form with multiple contact methods
- **Theme Toggle**: Seamless dark/light mode switching
- **Academic Focus**: Tailored for academic and engineering professionals

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
│   │   │   ├── hero.tsx        # Hero section with intro
│   │   │   ├── about.tsx       # About section with skills
│   │   │   ├── projects.tsx    # Projects showcase
│   │   │   ├── blog.tsx        # Blog section
│   │   │   ├── contact.tsx     # Contact form
│   │   │   ├── footer.tsx      # Footer
│   │   │   └── navigation.tsx  # Navigation bar
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
- Personal introduction with animated gradient text
- Key specializations (Communications, Mathematics, Signal Processing, Machine Learning)
- Call-to-action buttons (Contact, Download CV)
- Social media links (GitHub, LinkedIn, Email)
- Animated scroll indicator

### 👨‍🎓 About Section
- Educational background at Linköping University (Liu)
- Technical skills with visual icons and color coding
- Research interests and academic focus
- Achievements and awards showcase

### 💼 Projects Section
- **Featured Projects**: Detailed showcase of major academic projects
  - Adaptive Signal Processing System
  - Machine Learning for Channel Estimation
- **Other Projects**: Grid layout for additional work
  - Spectral Analysis Toolkit
  - Real-time Digital Filter Design
- Technology badges and GitHub/demo links

### 📝 Blog Section
- **Featured Articles**: Highlighted technical blog posts
- **Recent Articles**: Additional posts with preview
- Reading time estimates and topic tags
- Academic and technical content focus

### 📧 Contact Section
- Contact information with icons (Email, Phone, Location)
- Social media links with hover effects
- Professional contact form with validation
- Academic networking integration

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
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint with TypeScript support

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

#### 2. Projects
Modify project data in `src/components/portfolio/projects.tsx`:
```typescript
const projects = [
  {
    title: 'Your Project Title',
    description: 'Project description...',
    technologies: ['React', 'TypeScript', 'Python'],
    icon: YourIcon,
    color: 'bg-blue-500',
    github: 'https://github.com/username/repo',
    demo: 'https://your-demo.com',
    featured: true,
  },
  // ... more projects
]
```

#### 3. Blog Posts
Update blog content in `src/components/portfolio/blog.tsx`:
```typescript
const blogPosts = [
  {
    title: 'Your Blog Post Title',
    excerpt: 'Post excerpt...',
    date: '2024-01-15',
    readTime: '8 min read',
    tags: ['Signal Processing', 'Mathematics'],
    featured: true,
  },
  // ... more posts
]
```

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

## � Deployment

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

## �📄 License

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
- Email: axesu672@liu.student.se
- LinkedIn: [linkedin.com/in/axel-sundqvist](https://www.linkedin.com/in/axel-sundqvist/)
- GitHub: [github.com/AxelSuu](https://github.com/AxelSuu)

**Project Link**: [https://github.com/AxelSuu/portfolio](https://github.com/AxelSuu/portfolio)

---

*Built with ❤️ and lots of coffee by Axel Sundqvist*
