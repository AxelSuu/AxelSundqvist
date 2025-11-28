
import { Mail, MapPin, Github, Linkedin, MessageCircle, ArrowUpRight } from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { TiltCard } from '@/components/ui/tilt-card'


const Contact = () => {
  return (
    <section id="contact" className="h-[100dvh] md:h-screen w-full py-2 bg-background relative flex items-center overflow-hidden">

      <div className="container mx-auto px-3 md:px-4 relative z-10 max-h-full">
        {/* Bento Grid Layout - Simplified for mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1.5 md:gap-2 auto-rows-[minmax(45px,1fr)] md:auto-rows-[minmax(50px,1fr)] max-w-5xl mx-auto max-h-[80vh] md:max-h-[75vh] overflow-y-auto md:overflow-hidden scrollbar-hide">
          
          {/* Main CTA - Large */}
          <TiltCard className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2 h-full" tiltMaxAngle={5}>
              <GlowCard 
                className="h-full p-3 flex flex-col justify-between group cursor-pointer"
                glowColor="rgba(59, 130, 246, 0.4)"
              >
                  <a 
                    href="mailto:axesu672@student.liu.se?subject=Portfolio Contact&body=Hi Axel,%0D%0A%0D%0AI'm interested in discussing..."
                    className="flex flex-col h-full"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-all">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold mb-1">Send me an email</h3>
                      <p className="text-xs text-muted-foreground">Best way to reach me for opportunities.</p>
                    </div>
                    <div className="text-xs text-primary font-medium hover:underline">axesu672@student.liu.se</div>
                  </a>
                </GlowCard>
          </TiltCard>

          {/* LinkedIn - Medium */}
          <TiltCard className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2" tiltMaxAngle={10}>
            <GlowCard 
              className="h-full p-3 group cursor-pointer card-shine"
              glowColor="rgba(59, 130, 246, 0.3)"
            >
              <a 
                href="https://www.linkedin.com/in/axel-sundqvist/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-lg bg-[#0A66C2] group-hover:scale-110 transition-all shadow-lg shadow-[#0A66C2]/30">
                    <Linkedin className="h-4 w-4 text-white" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-[#0A66C2] transition-colors" />
                </div>
                <h4 className="font-semibold text-sm mb-1">LinkedIn</h4>
                <p className="text-[10px] text-muted-foreground flex-grow">Professional network</p>
                <span className="text-[10px] text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Connect <ArrowUpRight className="h-2.5 w-2.5" />
                </span>
              </a>
            </GlowCard>
          </TiltCard>

          {/* GitHub */}
          <TiltCard className="col-span-1" tiltMaxAngle={20}>
            <GlowCard 
              className="h-full p-2 group cursor-pointer card-shine"
              glowColor="rgba(100, 100, 100, 0.3)"
            >
              <a 
                href="https://github.com/AxelSuu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <Github className="h-6 w-6 mb-1 group-hover:scale-110 transition-all" />
                <span className="text-[10px] font-medium">GitHub</span>
              </a>
            </GlowCard>
          </TiltCard>

          {/* Location Card */}
          <TiltCard className="col-span-1 md:col-span-2" tiltMaxAngle={12}>
            <GlowCard 
              className="h-full p-2 flex items-center gap-2 card-shine"
              glowColor="rgba(239, 68, 68, 0.2)"
            >
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-red-500 to-orange-500">
                <MapPin className="h-3 w-3 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Location</p>
                <p className="font-medium text-xs">Linköping, Sweden</p>
              </div>
            </GlowCard>
          </TiltCard>

          {/* Status Card with electric border */}
          <TiltCard className="col-span-2 md:col-span-2" tiltMaxAngle={8}>
            <GlowCard 
              className="h-full p-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10"
              glowColor="rgba(34, 197, 94, 0.3)"
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping"></div>
                </div>
                <div>
                  <p className="font-medium text-xs">Open to opportunities</p>
                  <p className="text-[10px] text-muted-foreground">Summer 2026 Internships</p>
                </div>
              </div>
            </GlowCard>
          </TiltCard>

          {/* Quick Message Ideas with hover effects */}
          <TiltCard className="col-span-2" tiltMaxAngle={8}>
            <GlowCard 
              className="h-full p-2 card-shine"
              glowColor="rgba(59, 130, 246, 0.1)"
            >
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="h-3 w-3 text-muted-foreground" />
                <span className="text-[10px] font-medium text-muted-foreground">Topics</span>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all cursor-default">
                  Internships
                </span>
                <span className="text-[10px] px-2 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all cursor-default">
                  ML
                </span>
                <span className="text-[10px] px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all cursor-default">
                  Embedded
                </span>
              </div>
            </GlowCard>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}

export default Contact
