import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Cpu, Brain, Calculator, Award, Gamepad2, Zap} from 'lucide-react'

const About = () => {
  const skills = [
    { name: 'Mathematics', icon: BookOpen, color: 'bg-blue-500', level: 90 },
    { name: 'Machine Learning', icon: Brain, color: 'bg-purple-500', level: 85 },
    { name: 'Python', icon: Calculator, color: 'bg-green-500', level: 88 },
    { name: 'Communications', icon: Zap, color: 'bg-orange-500', level: 82 },
    { name: 'Embedded Systems', icon: Cpu, color: 'bg-yellow-500', level: 75 },
    { name: 'Game Development', icon: Gamepad2, color: 'bg-red-500', level: 80 },
  ]

  const education = [
    {
      degree: 'MSE in Applied Physics and Electrical Engineering',
      institution: 'Linköping University (Liu)',
      period: '2026 - 2028',
      specialization: 'Going to study Communications Systems',
    },
    {
      degree: 'B.Sc. in Applied Physics and Electrical Engineering',
      institution: 'Linköping University (Liu)',
      period: '2023 - 2026',
      specialization: 'Foundation in Physics and Electrical Engineering',
    },
  ]

  const achievements = [
    {
      title: 'Linear Algebra Honours Course',
      description: 'Took an elective honours course in linear algebra',
      icon: Calculator,
      color: 'bg-blue-500'
    },
    {
      title: 'Research at Infrasonik',
      description: 'Participated in cutting-edge research projects',
      icon: Award,
      color: 'bg-purple-500'
    },
    {
      title: '2D Platformer Game Release',
      description: 'Successfully developed and released a complete game',
      icon: Gamepad2,
      color: 'bg-green-500'
    }
  ]

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enthusiastic about the intersection of mathematics, physics, and technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* About Text */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <BookOpen className="mr-2 h-6 w-6 text-primary" />
                My Journey
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a dedicated student of Applied Physics and Electrical Engineering at Linköping University (Liu), 
                where I'm pursuing my Master's of Science in Engineering degree in AP&EE.
                Going to do my masters in Communications Systems in 2026.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                My passion lies in exploring how mathematical principles can be applied to solve real-world problems, 
                particularly in the areas of signal processing, machine learning, and communications systems.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <Award className="mr-2 h-6 w-6 text-primary" />
                Research Interests
              </h3>
              <ul className="space-y-2 text-lg text-muted-foreground">
                <li>• Wireless Communication Systems</li>
                <li>• Probability Theory and Linear Algebra</li>
                <li>• Machine Learning</li>
                <li>• Embedded Systems and Hardware</li>
                <li>• Statistical Signal Processing</li>
              </ul>
            </div>
          </div>

          {/* Skills Grid */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${skill.color}`}>
                        <skill.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{edu.degree}</h4>
                  <p className="text-primary font-medium mb-2">{edu.institution}</p>
                  <p className="text-muted-foreground mb-3">{edu.period}</p>
                  <p className="text-sm text-muted-foreground">{edu.specialization}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${achievement.color} flex items-center justify-center`}>
                    <achievement.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
