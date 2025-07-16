# CLAUDE.md - AI Development Guide

This document provides comprehensive guidance for AI agents (like Claude) working on the Axel Sundqvist portfolio project. It includes project context, development patterns, and best practices for effective collaboration.

## 📋 Project Overview

**Project Name**: Axel Sundqvist Personal Portfolio  
**Type**: Academic/Professional Portfolio Website  
**Target Audience**: Academic institutions, employers, research collaborators  
**Domain**: Applied Physics & Electrical Engineering  
**Specializations**: Communications, Signal Processing, Machine Learning, Mathematics  

## 🎯 Project Context

### Primary Goals
- Showcase academic work and research projects
- Demonstrate technical expertise in signal processing and machine learning
- Provide professional contact and networking opportunities
- Establish online presence for academic career development

### Target User Personas
1. **Academic Recruiters**: Looking for graduate students or researchers
2. **Industry Employers**: Seeking candidates with signal processing expertise
3. **Research Collaborators**: Interested in joint projects or publications
4. **Academic Peers**: Students and researchers in similar fields

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **UI Components**: Radix UI primitives
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Theme**: Dark/Light mode support

### Project Structure
```
src/
├── components/
│   ├── portfolio/       # Domain-specific components
│   ├── ui/             # Reusable UI components
│   └── theme-provider.tsx
├── lib/utils.ts        # Utility functions
├── hooks/              # Custom React hooks
├── pages/              # Page components
└── [config files]
```

## 🔧 Development Patterns

### Component Development
- **Functional Components**: Use React functional components with hooks
- **TypeScript**: Strict typing for all components and props
- **Composition**: Prefer composition over inheritance
- **Separation of Concerns**: Keep components focused and single-purpose

### Styling Guidelines
- **Tailwind CSS**: Primary styling approach
- **CSS Variables**: For theme customization
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels and keyboard navigation

### File Organization
- **Co-location**: Keep related files together
- **Barrel Exports**: Use index.ts files for clean imports
- **Naming Conventions**: PascalCase for components, camelCase for functions

## 📝 Content Guidelines

### Academic Focus
- Emphasize technical expertise and research interests
- Use professional, academic language
- Include specific technologies and methodologies
- Reference academic institutions and credentials

### Project Descriptions
- **Technical Details**: Include algorithms, frameworks, and methodologies
- **Academic Context**: Mention courses, research, or academic applications
- **Results**: Quantifiable outcomes where possible
- **Technologies**: Specific tools and programming languages used

### Blog Content
- **Technical Topics**: Signal processing, machine learning, mathematics
- **Educational Content**: Tutorials and explanations
- **Research Updates**: Academic progress and findings
- **Industry Insights**: Trends in communications and signal processing

## 🎨 Design Principles

### Visual Design
- **Professional**: Clean, academic-friendly aesthetics
- **Technical**: Emphasize engineering and mathematical focus
- **Accessible**: High contrast, readable typography
- **Modern**: Contemporary design with subtle animations

### User Experience
- **Intuitive Navigation**: Clear section organization
- **Performance**: Fast loading and smooth interactions
- **Responsive**: Excellent mobile and tablet experience
- **Accessibility**: Screen reader friendly, keyboard navigation

## 🚀 Common Development Tasks

### Adding New Projects
1. Update `src/components/portfolio/projects.tsx`
2. Add project data to the projects array
3. Include relevant technologies and links
4. Consider featured vs. regular project placement

### Modifying Content
1. **Personal Info**: Update hero, about, and contact sections
2. **Skills**: Modify technical skills in about section
3. **Education**: Update academic credentials and achievements
4. **Social Links**: Update across hero, contact, and footer

### Styling Changes
1. **Theme Colors**: Modify CSS variables in `src/index.css`
2. **Tailwind Config**: Update `tailwind.config.ts` for custom styles
3. **Component Styles**: Use Tailwind classes with custom CSS fallbacks
4. **Responsive Design**: Test across different screen sizes

### Component Creation
1. **UI Components**: Add to `src/components/ui/` with proper TypeScript types
2. **Portfolio Components**: Add to `src/components/portfolio/` for specific features
3. **Hooks**: Custom hooks in `src/hooks/` for reusable logic
4. **Utilities**: Helper functions in `src/lib/utils.ts`

## 🧪 Testing & Quality Assurance

### Development Workflow
1. **ESLint**: Run linting with `npm run lint`
2. **TypeScript**: Check types with `npm run build`
3. **Manual Testing**: Test on different devices and browsers
4. **Accessibility**: Verify keyboard navigation and screen reader compatibility

### Performance Considerations
- **Bundle Size**: Monitor and optimize package imports
- **Images**: Optimize images and use appropriate formats
- **Lazy Loading**: Consider lazy loading for non-critical components
- **Caching**: Leverage browser caching for static assets

## 📦 Deployment & Maintenance

### Build Process
1. **Development**: `npm run dev` for local development
2. **Production Build**: `npm run build` for optimized build
3. **Preview**: `npm run preview` to test production build locally

### Deployment Platforms
- **Vercel**: Recommended for React apps (zero-config)
- **Netlify**: Alternative with good React support
- **GitHub Pages**: For static hosting with custom domain

### Maintenance Tasks
- **Dependencies**: Regular updates to maintain security
- **Content**: Keep projects and blog posts current
- **Performance**: Monitor and optimize loading times
- **SEO**: Update meta tags and improve search visibility

## 🔍 Common Issues & Solutions

### TypeScript Errors
- **Missing Types**: Install @types packages for external libraries
- **Import Errors**: Check file paths and export/import syntax
- **Strict Mode**: Address type errors with proper typing

### Styling Issues
- **Tailwind Not Loading**: Check PostCSS configuration
- **Theme Not Working**: Verify CSS variables and theme provider
- **Responsive Issues**: Test with browser dev tools

### Build Errors
- **Vite Config**: Check vite.config.ts for proper configuration
- **Path Aliases**: Ensure TypeScript paths match Vite aliases
- **Dependencies**: Verify all dependencies are installed

## 📚 Resources & References

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)

### Academic Portfolio Examples
- Look at portfolios of PhD students and researchers
- Focus on technical project presentations
- Emphasize publications and research contributions

### Signal Processing & ML Resources
- IEEE Signal Processing Society
- arXiv papers in signal processing and machine learning
- Academic conferences (ICASSP, ICML, NeurIPS)
- Technical blogs and tutorials

## 🤖 AI Agent Guidelines

### Code Generation
- **Follow Project Patterns**: Maintain consistency with existing code
- **TypeScript First**: Always include proper types
- **Accessibility**: Include ARIA labels and semantic HTML
- **Performance**: Avoid unnecessary re-renders and heavy computations

### Content Creation
- **Academic Focus**: Maintain professional, technical language
- **Accuracy**: Ensure technical accuracy in descriptions
- **Completeness**: Provide comprehensive information
- **Relevance**: Keep content relevant to target audience

### Problem Solving
- **Systematic Approach**: Break down complex problems
- **Documentation**: Document decisions and rationale
- **Testing**: Verify changes work as expected
- **Rollback Plan**: Consider how to revert changes if needed

### Communication
- **Clear Explanations**: Explain what changes are being made
- **Context**: Provide context for decisions
- **Alternatives**: Mention alternative approaches when relevant
- **Follow-up**: Suggest next steps or improvements

## 🔧 Development Environment Setup

### Required Tools
- Node.js (v16 or higher)
- npm or yarn package manager
- VS Code or similar editor
- Git for version control

### Recommended Extensions (VS Code)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Hero
- ESLint
- Prettier
- Auto Rename Tag

### Environment Variables
- Consider environment-specific configurations
- Use `.env` files for sensitive data
- Document required environment variables

## 📈 Future Enhancements

### Potential Features
- **Blog CMS**: Content management system for blog posts
- **Analytics**: Google Analytics or similar tracking
- **Search**: Site search functionality
- **Internationalization**: Multi-language support
- **PWA**: Progressive Web App features

### Technical Improvements
- **Performance**: Bundle optimization and lazy loading
- **SEO**: Enhanced search engine optimization
- **Accessibility**: Further accessibility improvements
- **Testing**: Automated testing implementation

### Content Expansion
- **Publications**: Academic publications section
- **Research**: Detailed research project pages
- **Teaching**: Teaching experience and materials
- **Awards**: Academic awards and recognition

## 📝 Change Log Template

When making changes, document them with:
- **Date**: When the change was made
- **Type**: Feature, Bug Fix, Enhancement, etc.
- **Description**: What was changed and why
- **Impact**: How it affects users or functionality
- **Files Modified**: List of changed files

## 🔗 Quick Reference

### Common Commands
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Important Files
- `src/app.tsx` - Main application component
- `src/components/portfolio/` - Portfolio-specific components
- `tailwind.config.ts` - Tailwind configuration
- `vite.config.ts` - Vite configuration
- `package.json` - Dependencies and scripts

### Key Directories
- `src/components/ui/` - Reusable UI components
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions
- `public/` - Static assets

---

*This guide is maintained for AI agents working on the Axel Sundqvist portfolio project. Update this document as the project evolves.*
