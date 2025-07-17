import { Github, Linkedin, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'

const Hero = () => {
  const [currentSpecialization, setCurrentSpecialization] = useState(0)
  const specializations = ['Mathematics', 'Communications', 'Machine Learning', 'Game Development']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpecialization((prev) => (prev + 1) % specializations.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [specializations.length])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 opacity-50" />
      
      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile image */}
          <div className="w-40 h-40 mx-auto mb-8 mt-16 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
            <img 
              src="/images/me.jpeg" 
              alt="Axel Sundqvist" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Name and title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in-up">
            <span className="gradient-text">Axel Sundqvist</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 fade-in-up">
            Applied Physics & Electrical Engineering Student
          </h2>
          
          {/* Animated Specialization */}
          <div className="mb-8 fade-in-up">
            <p className="text-lg md:text-xl text-muted-foreground mb-4">
              Specializing in
            </p>
            <div className="h-12 flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold text-primary animate-pulse">
                {specializations[currentSpecialization]}
              </span>
            </div>
          </div>
          
          {/* All Specializations */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 fade-in-up">
            {specializations.map((skill, index) => (
              <span
                key={skill}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  index === currentSpecialization
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-up">
            Passionate about cool things like machine learning, wireless communications and math.
            Check out my projects and blog to see what im working on!
            Available for Summer 2026 internships.
          </p>
          
          {/* Social links */}
          <div className="flex justify-center space-x-6 fade-in-up mb-8">
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
    </section>
  )
}

export default Hero
