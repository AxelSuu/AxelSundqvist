import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, Github, Linkedin, Twitter, Download } from 'lucide-react'
import { downloadResume } from '@/lib/resume-utils'

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'axesu672@student.liu.se',
      href: 'mailto:axesu672@student.liu.se',
      color: 'bg-blue-500',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Linköping, Sweden',
      href: 'https://maps.google.com/?q=Linköping,Sweden',
      color: 'bg-red-500',
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      href: 'https://github.com/AxelSuu',
      color: 'hover:bg-gray-800',
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/axel-sundqvist/',
      color: 'hover:bg-blue-600',
    },
    {
      icon: Twitter,
      name: 'Twitter',
      href: 'https://x.com',
      color: 'hover:bg-blue-400',
    },
  ]

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's discuss wireless, machine learning, or collaborations.
            Currently seeking internship opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold mb-8">Contact Information</h3>
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${info.color}`}>
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{info.title}</h4>
                        <a
                          href={info.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                          {info.content}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect with me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-muted text-muted-foreground ${link.color} hover:text-white transition-all duration-200 transform hover:scale-110`}
                    aria-label={link.name}
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl">Get In Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Ready to discuss your project or collaboration? I'd love to hear from you! 
                  Choose your preferred way to get in touch:
                </p>
                
                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full"
                    asChild
                  >
                    <a href="mailto:axesu672@student.liu.se?subject=Portfolio Contact&body=Hi Axel,%0D%0A%0D%0AI'm interested in discussing...">
                      <Mail className="mr-2 h-5 w-5" />
                      Send Email
                    </a>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                    asChild
                  >
                    <a 
                      href="https://www.linkedin.com/in/axel-sundqvist/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="mr-2 h-5 w-5" />
                      Message on LinkedIn
                    </a>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                    asChild
                  >
                    <a 
                      href="https://github.com/AxelSuu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-5 w-5" />
                      Connect on GitHub
                    </a>
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-full"
                    onClick={downloadResume}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </Button>
                </div>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">What to include in your message:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Your project or collaboration idea</li>
                    <li>• Timeline and scope</li>
                    <li>• Relevant technical details</li>
                    <li>• How we can work together</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Contact
