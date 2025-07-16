import { Github, Linkedin, Mail } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 opacity-50" />
      
      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile image placeholder */}
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
            AS
          </div>
          
          {/* Name and title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in-up">
            <span className="gradient-text">Axel Sundqvist</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 fade-in-up">
            Applied Physics & Electrical Engineering Student
          </h2>
          
          {/* Specializations */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 fade-in-up">
            {['Communications', 'Mathematics', 'Signal Processing', 'Machine Learning'].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto fade-in-up">
            Passionate about how math, machine learning, and signal processing can solve real-world
            problems in communications and beyond. Check out my projects and blog to see my work in action!
          </p>
          
          {/* Social links */}
          <div className="flex justify-center space-x-6 fade-in-up mb-16">
            <a
              href="https://github.com/AxelSuu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/axel-sundqvist/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:axesu672@liu.student.se"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2" />
        </div>
      </div>
    </section>
  )
}

export default Hero
