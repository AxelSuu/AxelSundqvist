
import { Mail, MapPin, Github, Linkedin, Download, MessageCircle, ArrowUpRight } from 'lucide-react'
import { downloadResume } from '@/lib/resume-utils'
import { GlowCard } from '@/components/ui/glow-card'
import { TextReveal } from '@/components/ui/text-reveal'


const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <TextReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-accent-text heading-wave">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
              Let's discuss opportunities and collaborations
            </p>
          </div>
        </TextReveal>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[minmax(100px,auto)] max-w-5xl mx-auto">
          
          {/* Main CTA - Large */}
          <GlowCard 
            className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2 p-6 flex flex-col justify-between group cursor-pointer hover:scale-[1.02] transition-transform"
            glowColor="rgba(59, 130, 246, 0.4)"
          >
            <a 
              href="mailto:axesu672@student.liu.se?subject=Portfolio Contact&body=Hi Axel,%0D%0A%0D%0AI'm interested in discussing..."
              className="flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-500 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                  <Mail className="h-7 w-7 text-white" />
                </div>
                <ArrowUpRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-2">Send me an email</h3>
                <p className="text-muted-foreground mb-4">The best way to reach me for opportunities and collaborations.</p>
              </div>
              <div className="text-sm text-primary font-medium">axesu672@student.liu.se</div>
            </a>
          </GlowCard>

          {/* LinkedIn - Medium */}
          <GlowCard 
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 p-5 group cursor-pointer hover:scale-[1.02] transition-transform"
            glowColor="rgba(59, 130, 246, 0.3)"
          >
            <a 
              href="https://www.linkedin.com/in/axel-sundqvist/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-[#0A66C2] group-hover:scale-110 transition-transform">
                  <Linkedin className="h-5 w-5 text-white" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-[#0A66C2] transition-colors" />
              </div>
              <h4 className="font-semibold mb-1">LinkedIn</h4>
              <p className="text-xs text-muted-foreground flex-grow">Professional network & updates</p>
              <span className="text-xs text-primary mt-2">Connect →</span>
            </a>
          </GlowCard>

          {/* GitHub */}
          <GlowCard 
            className="col-span-1 p-4 group cursor-pointer hover:scale-105 transition-transform"
            glowColor="rgba(100, 100, 100, 0.3)"
          >
            <a 
              href="https://github.com/AxelSuu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <Github className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">GitHub</span>
            </a>
          </GlowCard>

          {/* Location Card */}
          <GlowCard 
            className="col-span-1 md:col-span-2 p-4 flex items-center gap-3"
            glowColor="rgba(239, 68, 68, 0.2)"
          >
            <div className="p-2 rounded-xl bg-red-500/10">
              <MapPin className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="font-medium text-sm">Linköping, Sweden</p>
            </div>
          </GlowCard>

          {/* Status Card */}
          <GlowCard 
            className="col-span-2 md:col-span-2 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10"
            glowColor="rgba(34, 197, 94, 0.3)"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping"></div>
              </div>
              <div>
                <p className="font-medium text-sm">Open to opportunities</p>
                <p className="text-xs text-muted-foreground">Summer 2026 Internships</p>
              </div>
            </div>
          </GlowCard>

          {/* Download Resume - Wide */}
          <GlowCard 
            className="col-span-2 md:col-span-2 lg:col-span-3 p-5 group cursor-pointer hover:scale-[1.02] transition-transform"
            glowColor="rgba(168, 85, 247, 0.3)"
          >
            <button 
              onClick={downloadResume}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10 group-hover:bg-purple-500 transition-colors">
                  <Download className="h-5 w-5 text-purple-500 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold">Download Resume</h4>
                  <p className="text-xs text-muted-foreground">Get my full CV in PDF</p>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-purple-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </button>
          </GlowCard>

          

          {/* Quick Message Ideas */}
          <GlowCard 
            className="col-span-2 p-4"
            glowColor="rgba(59, 130, 246, 0.1)"
          >
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Good topics to discuss</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-muted">Internships</span>
              <span className="text-xs px-2 py-1 rounded-full bg-muted">ML Projects</span>
              <span className="text-xs px-2 py-1 rounded-full bg-muted">Embedded</span>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  )
}

export default Contact
