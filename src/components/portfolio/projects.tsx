import { Github, ExternalLink, Wifi, Cpu, Monitor, TrendingUp, BarChart3, Database, Gamepad2, Joystick, Zap } from 'lucide-react'

// ESP32-S3 Wireless Pong Section
export const ProjectESP32 = () => {
  return (
    <section id="project-esp32" className="min-h-[100dvh] md:h-screen w-full bg-background relative flex items-center overflow-hidden py-8 md:py-0">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 items-center">
          {/* Left: Content */}
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-3 mb-2 md:mb-2">
              <span className="text-sm font-mono text-purple-600 dark:text-purple-400 tracking-wider font-bold">02</span>
              <div className="h-px w-12 bg-gradient-to-r from-purple-600/80 to-purple-600/0" />
              <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold uppercase tracking-widest">Embedded Systems</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-3 leading-tight tracking-tight">
              ESP32-S3 Wireless Pong
            </h2>
            
            <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed max-w-xl">
              An embedded wireless Pong game on an ESP32-S3 using C++ with an SPI-connected 128×96 OLED display. 
              Implemented WebSockets to achieve sub-10ms input latency for the browser-based controller, ensuring a responsive real-time gaming experience.
            </p>

            <div className="space-y-2 md:space-y-2 mb-3 md:mb-4">
              <div className="flex items-start gap-2.5">
                <Wifi className="h-4 w-4 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Wi-Fi Access Point & WebSocket</p>
                  <p className="text-xs text-muted-foreground leading-relaxed hidden md:block">HTTP server for controls, WebSocket for sub-10ms real-time input</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Monitor className="h-4 w-4 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">SPI OLED Display (128×96)</p>
                  <p className="text-xs text-muted-foreground leading-relaxed hidden md:block">Direct SPI communication for smooth rendering</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Cpu className="h-4 w-4 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Predictive AI Opponent</p>
                  <p className="text-xs text-muted-foreground leading-relaxed hidden md:block">Developed predictive AI logic in C++ to simulate human-like difficulty scaling</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3 md:mb-4">
              {['C++', 'ESP32-S3', 'SPI', 'WebSocket', 'HTTP Server'].map((tech) => (
                <span 
                  key={tech} 
                  className="px-2.5 py-0.5 text-xs bg-purple-500/15 text-purple-700 dark:text-purple-300 rounded-full border border-purple-500/30 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a 
              href="https://github.com/AxelSuu/ESP32-Wi-Fi-Pong"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-purple-500 dark:hover:text-purple-400 transition-colors group min-h-[44px] min-w-[44px] py-2"
            >
              <Github className="h-5 w-5" />
              <span className="font-medium">View on GitHub</span>
              <ExternalLink className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          </div>

          {/* Right: Visual */}
          <div className="order-1 md:order-2">
            <div className="relative max-w-[280px] md:max-w-sm mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 rounded-2xl" />
              <div className="relative rounded-xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-500/10 max-h-[320px] md:max-h-none">
                <img 
                  src="/images/esp32.jpeg" 
                  alt="ESP32-S3 Wireless Pong Project" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// PyTorch Stock Forecasting Section
export const ProjectPyTorch = () => {
  return (
    <section id="project-pytorch" className="min-h-[100dvh] md:h-screen w-full bg-background relative flex items-center overflow-hidden py-8 md:py-0">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 items-center">
          {/* Left: Visual */}
          <div className="order-1">
            <div className="relative max-w-[280px] md:max-w-sm mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/20 rounded-2xl" />
              <div className="relative rounded-xl overflow-hidden border border-blue-500/20 shadow-2xl shadow-blue-500/10">
                <img 
                  src="/images/pystock.png" 
                  alt="PyTorch Stock Forecasting Project" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-2">
            <div className="flex items-center gap-3 mb-2 md:mb-2">
              <span className="text-sm font-mono text-blue-600 dark:text-blue-400 tracking-wider font-bold">03</span>
              <div className="h-px w-12 bg-gradient-to-r from-blue-600/80 to-blue-600/0" />
              <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-widest">Machine Learning</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-3 leading-tight tracking-tight">
              PyTorch Stock Forecasting
            </h2>
            
            <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed max-w-xl">
              A pattern learning project exploring time series prediction for stock prices. 
              Built as a learning experience with PyTorch and implementing neural networks.
            </p>

            <div className="space-y-2 md:space-y-2 mb-3 md:mb-4">
              <div className="flex items-start gap-2.5">
                <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">LSTM Neural Networks</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Model for long short term pattern recognition</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Database className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Live Market Data Integration</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Using Yahoo Finance for real-time stock data</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Easy API to call</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Model exposes easy to use frontend interface</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3 md:mb-4">
              {['Python', 'PyTorch', 'NumPy', 'Pandas', 'Yahoo Finance'].map((tech) => (
                <span 
                  key={tech} 
                  className="px-2.5 py-0.5 text-xs bg-blue-500/15 text-blue-700 dark:text-blue-300 rounded-full border border-blue-500/30 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a 
              href="https://github.com/AxelSuu/Pytorch-Quant-Model"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-blue-500 dark:hover:text-blue-400 transition-colors group min-h-[44px] min-w-[44px] py-2"
            >
              <Github className="h-5 w-5" />
              <span className="font-medium">View on GitHub</span>
              <ExternalLink className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// 2D Platformer Game Section
export const ProjectPlatformer = () => {
  return (
    <section id="project-platformer" className="min-h-[100dvh] md:h-screen w-full bg-background relative flex items-center overflow-hidden py-12 md:py-0">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 items-center">
          {/* Left: Content */}
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-3 mb-2 md:mb-2">
              <span className="text-sm font-mono text-green-600 dark:text-green-400 tracking-wider font-bold">04</span>
              <div className="h-px w-12 bg-gradient-to-r from-green-600/80 to-green-600/0" />
              <span className="text-xs text-green-600 dark:text-green-400 font-semibold uppercase tracking-widest">Game Development</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-3 leading-tight tracking-tight">
              2D Platformer
            </h2>
            
            <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed max-w-xl">
              A 2D platformer game built with Python and Pygame. Features classic platforming mechanics 
              with procedural level generation, data storage, achievements and animations.
            </p>

            <div className="space-y-2 md:space-y-2 mb-3 md:mb-4">
              <div className="flex items-start gap-2.5">
                <Joystick className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Beautiful art and animations</p>
                  <p className="text-xs text-muted-foreground leading-relaxed hidden md:block">Lot of animations, art, characters</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Gamepad2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Procedural level generation</p>
                  <p className="text-xs text-muted-foreground leading-relaxed hidden md:block">Automatically generating progressive levels</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Zap className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">State management Architecture</p>
                  <p className="text-xs text-muted-foreground leading-relaxed hidden md:block">Architecture built upon object oriented thinking</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3 md:mb-4">
              {['Python', 'Pygame', 'Sprite Animation', 'Physics'].map((tech) => (
                <span 
                  key={tech} 
                  className="px-2.5 py-0.5 text-xs bg-green-500/15 text-green-700 dark:text-green-300 rounded-full border border-green-500/30 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <a 
                href="https://github.com/AxelSuu/Skybound-2.0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground hover:text-green-500 dark:hover:text-green-400 transition-colors group min-h-[44px] min-w-[44px] py-2"
              >
                <Github className="h-5 w-5" />
                <span className="font-medium">View on GitHub</span>
                <ExternalLink className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
              
              <a 
                href="https://github.com/AxelSuu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>More projects →</span>
              </a>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="order-1 md:order-2">
            <div className="relative max-w-[280px] md:max-w-sm mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-br from-green-500/20 via-transparent to-emerald-500/20 rounded-2xl" />
              <div className="relative rounded-xl overflow-hidden border border-green-500/20 shadow-2xl shadow-green-500/10 max-h-[320px] md:max-h-none">
                <img 
                  src="/images/skybound.png" 
                  alt="Skybound 2.0 Platformer Game" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Default export for backwards compatibility
const Projects = () => {
  return (
    <>
      <ProjectESP32 />
      <ProjectPyTorch />
      <ProjectPlatformer />
    </>
  )
}

export default Projects
