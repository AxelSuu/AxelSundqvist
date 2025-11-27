
import { Mail, MapPin, Github, Linkedin, MessageCircle, ArrowUpRight, Sparkles, Zap } from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { TextReveal } from '@/components/ui/text-reveal'
import { TiltCard } from '@/components/ui/tilt-card'
import { HolographicCard } from '@/components/ui/holographic-card'
import { AnimatedGradientBorder } from '@/components/ui/animated-gradient-border'
import { LiquidButton } from '@/components/ui/liquid-button'
import { StaggerText } from '@/components/ui/stagger-text'


const Contact = () => {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float-medium" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <TextReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Contact</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <StaggerText text="Let's Connect" className="animated-gradient-text" staggerDelay={40} />
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
              Let's discuss opportunities and collaborations
            </p>
          </div>
        </TextReveal>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[minmax(100px,auto)] max-w-5xl mx-auto">
          
          {/* Main CTA - Large with holographic */}
          <AnimatedGradientBorder containerClassName="col-span-2 md:col-span-2 lg:col-span-3 row-span-2">
            <TiltCard className="h-full" tiltMaxAngle={5}>
              <HolographicCard className="h-full">
                <GlowCard 
                  className="h-full p-6 flex flex-col justify-between group cursor-pointer bg-transparent border-0"
                  glowColor="rgba(59, 130, 246, 0.4)"
                >
                  <a 
                    href="mailto:axesu672@student.liu.se?subject=Portfolio Contact&body=Hi Axel,%0D%0A%0D%0AI'm interested in discussing..."
                    className="flex flex-col h-full"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all">
                        <Mail className="h-7 w-7 text-white" />
                      </div>
                      <ArrowUpRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold mb-2">Send me an email</h3>
                      <p className="text-muted-foreground mb-4">The best way to reach me for opportunities and collaborations.</p>
                    </div>
                    <div className="text-sm text-primary font-medium hover:underline">axesu672@student.liu.se</div>
                  </a>
                </GlowCard>
              </HolographicCard>
            </TiltCard>
          </AnimatedGradientBorder>

          {/* LinkedIn - Medium */}
          <TiltCard className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2" tiltMaxAngle={10}>
            <GlowCard 
              className="h-full p-5 group cursor-pointer card-shine"
              glowColor="rgba(59, 130, 246, 0.3)"
            >
              <a 
                href="https://www.linkedin.com/in/axel-sundqvist/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-[#0A66C2] group-hover:scale-110 group-hover:-rotate-3 transition-all shadow-lg shadow-[#0A66C2]/30">
                    <Linkedin className="h-5 w-5 text-white" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-[#0A66C2] transition-colors" />
                </div>
                <h4 className="font-semibold mb-1">LinkedIn</h4>
                <p className="text-xs text-muted-foreground flex-grow">Professional network & updates</p>
                <span className="text-xs text-primary mt-2 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Connect <ArrowUpRight className="h-3 w-3" />
                </span>
              </a>
            </GlowCard>
          </TiltCard>

          {/* GitHub */}
          <TiltCard className="col-span-1" tiltMaxAngle={20}>
            <GlowCard 
              className="h-full p-4 group cursor-pointer card-shine"
              glowColor="rgba(100, 100, 100, 0.3)"
            >
              <a 
                href="https://github.com/AxelSuu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <Github className="h-8 w-8 mb-2 group-hover:scale-110 group-hover:rotate-12 transition-all" />
                <span className="text-xs font-medium">GitHub</span>
              </a>
            </GlowCard>
          </TiltCard>

          {/* Location Card */}
          <TiltCard className="col-span-1 md:col-span-2" tiltMaxAngle={12}>
            <GlowCard 
              className="h-full p-4 flex items-center gap-3 card-shine"
              glowColor="rgba(239, 68, 68, 0.2)"
            >
              <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-orange-500">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-medium text-sm">Linköping, Sweden</p>
              </div>
            </GlowCard>
          </TiltCard>

          {/* Status Card with electric border */}
          <TiltCard className="col-span-2 md:col-span-2" tiltMaxAngle={8}>
            <GlowCard 
              className="h-full p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10"
              glowColor="rgba(34, 197, 94, 0.3)"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-green-500 animate-ping"></div>
                </div>
                <div>
                  <p className="font-medium text-sm">Open to opportunities</p>
                  <p className="text-xs text-muted-foreground">Summer 2026 Internships</p>
                </div>
              </div>
            </GlowCard>
          </TiltCard>

          {/* Quick Message Ideas with hover effects */}
          <TiltCard className="col-span-2" tiltMaxAngle={8}>
            <GlowCard 
              className="h-full p-4 card-shine"
              glowColor="rgba(59, 130, 246, 0.1)"
            >
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Good topics to discuss</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 hover:scale-105 transition-all cursor-default">
                  Internships
                </span>
                <span className="text-xs px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 hover:scale-105 transition-all cursor-default">
                  ML Projects
                </span>
                <span className="text-xs px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 hover:scale-105 transition-all cursor-default">
                  Embedded
                </span>
              </div>
            </GlowCard>
          </TiltCard>

          {/* Final CTA */}
          <div className="col-span-2 md:col-span-4 lg:col-span-6 flex justify-center mt-8">
            <LiquidButton 
              onClick={() => window.location.href = 'mailto:axesu672@student.liu.se'}
              variant="primary"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Start a Conversation
            </LiquidButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
