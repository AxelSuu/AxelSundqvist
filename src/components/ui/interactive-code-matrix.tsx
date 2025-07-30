import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, Code, Terminal, Cpu } from 'lucide-react'

interface CodeParticle {
  x: number
  y: number
  speed: number
  char: string
  opacity: number
  color: string
  category: 'variable' | 'function' | 'keyword' | 'operator' | 'string'
}

interface NetworkNode {
  id: string
  x: number
  y: number
  radius: number
  connections: string[]
  data: string
  type: 'input' | 'hidden' | 'output'
  activation: number
}

export const InteractiveCodeMatrix = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mode, setMode] = useState<'code-rain' | 'neural-network' | 'data-flow'>('code-rain')
  const [speed, setSpeed] = useState(50)
  
  const animationRef = useRef<number>()
  const particlesRef = useRef<CodeParticle[]>([])
  const nodesRef = useRef<NetworkNode[]>([])

  // Code snippets for different programming concepts
  const codeElements = {
    variable: ['let', 'const', 'var', 'int', 'string', 'bool', 'array'],
    function: ['function', 'return', 'void', 'async', 'await', 'lambda', 'def'],
    keyword: ['if', 'else', 'for', 'while', 'class', 'import', 'export'],
    operator: ['+', '-', '*', '/', '=', '==', '!=', '=>', '&&', '||'],
    string: ['"hello"', "'world'", '`template`', '/regex/', '[array]', '{obj}']
  }

  const colors = {
    variable: '#10B981', // green
    function: '#3B82F6', // blue
    keyword: '#F59E0B', // amber
    operator: '#EF4444', // red
    string: '#8B5CF6'    // purple
  }

  // Initialize Code Rain
  const initCodeRain = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    particlesRef.current = []
    const particleCount = 100

    for (let i = 0; i < particleCount; i++) {
      const categories = Object.keys(codeElements) as Array<keyof typeof codeElements>
      const category = categories[Math.floor(Math.random() * categories.length)]
      const chars = codeElements[category]
      
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        speed: Math.random() * 2 + 1,
        char: chars[Math.floor(Math.random() * chars.length)],
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[category],
        category
      })
    }
  }

  // Initialize Neural Network
  const initNeuralNetwork = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    nodesRef.current = []
    const layers = [3, 5, 4, 2] // input, hidden1, hidden2, output
    const layerSpacing = canvas.width / (layers.length + 1)
    
    let nodeId = 0
    layers.forEach((nodeCount, layerIndex) => {
      const nodeSpacing = canvas.height / (nodeCount + 1)
      
      for (let i = 0; i < nodeCount; i++) {
        const x = layerSpacing * (layerIndex + 1)
        const y = nodeSpacing * (i + 1)
        
        let type: 'input' | 'hidden' | 'output'
        if (layerIndex === 0) type = 'input'
        else if (layerIndex === layers.length - 1) type = 'output'
        else type = 'hidden'

        const connections: string[] = []
        if (layerIndex < layers.length - 1) {
          // Connect to all nodes in next layer
          for (let j = 0; j < layers[layerIndex + 1]; j++) {
            connections.push(`${nodeId + nodeCount + j}`)
          }
        }

        nodesRef.current.push({
          id: nodeId.toString(),
          x,
          y,
          radius: 15,
          connections,
          data: type === 'input' ? 'x' + i : type === 'output' ? 'y' + i : 'h' + i,
          type,
          activation: Math.random()
        })
        
        nodeId++
      }
    })
  }

  // Animation loops
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      
      if (mode === 'code-rain') initCodeRain()
      else if (mode === 'neural-network') initNeuralNetwork()
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (mode === 'code-rain') {
        animateCodeRain(ctx, canvas)
      } else if (mode === 'neural-network') {
        animateNeuralNetwork(ctx)
      } else if (mode === 'data-flow') {
        animateDataFlow(ctx, canvas)
      }

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    if (isPlaying) {
      animate()
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, mode, speed])

  const animateCodeRain = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    particlesRef.current.forEach((particle) => {
      // Update position
      particle.y += particle.speed * (speed / 50)
      
      // Reset particle if it goes off screen
      if (particle.y > canvas.height + 50) {
        particle.y = -50
        particle.x = Math.random() * canvas.width
        
        // Change character occasionally
        if (Math.random() < 0.1) {
          const chars = codeElements[particle.category]
          particle.char = chars[Math.floor(Math.random() * chars.length)]
        }
      }

      // Draw particle
      ctx.fillStyle = particle.color
      ctx.globalAlpha = particle.opacity
      ctx.font = '14px Monaco, monospace'
      ctx.fillText(particle.char, particle.x, particle.y)
      
      // Add glow effect
      ctx.shadowColor = particle.color
      ctx.shadowBlur = 5
      ctx.fillText(particle.char, particle.x, particle.y)
      ctx.shadowBlur = 0
    })
    
    ctx.globalAlpha = 1
  }

  const animateNeuralNetwork = (ctx: CanvasRenderingContext2D) => {
    // Draw connections
    nodesRef.current.forEach(node => {
      node.connections.forEach(connectionId => {
        const targetNode = nodesRef.current.find(n => n.id === connectionId)
        if (targetNode) {
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(targetNode.x, targetNode.y)
          
          // Weight visualization
          const weight = Math.sin(Date.now() * 0.001 + parseInt(node.id)) * 0.5 + 0.5
          ctx.strokeStyle = `rgba(59, 130, 246, ${weight * 0.6})`
          ctx.lineWidth = weight * 3
          ctx.stroke()
        }
      })
    })

    // Draw nodes
    nodesRef.current.forEach(node => {
      // Update activation
      node.activation = Math.sin(Date.now() * 0.002 + parseInt(node.id)) * 0.5 + 0.5

      // Node colors based on type
      const nodeColors = {
        input: '#10B981',
        hidden: '#3B82F6', 
        output: '#F59E0B'
      }

      // Draw node
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
      ctx.fillStyle = nodeColors[node.type]
      ctx.globalAlpha = 0.3 + node.activation * 0.7
      ctx.fill()

      // Draw border
      ctx.strokeStyle = nodeColors[node.type]
      ctx.lineWidth = 2
      ctx.globalAlpha = 1
      ctx.stroke()

      // Draw label
      ctx.fillStyle = '#ffffff'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(node.data, node.x, node.y + 4)
    })
  }

  const animateDataFlow = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Create flowing data packets
    const time = Date.now() * 0.001
    
    // Draw flowing lines
    for (let i = 0; i < 5; i++) {
      const y = (canvas.height / 6) * (i + 1)
      
      ctx.beginPath()
      ctx.moveTo(0, y)
      
      for (let x = 0; x <= canvas.width; x += 10) {
        const waveY = y + Math.sin((x * 0.01) + (time * 2) + i) * 20
        ctx.lineTo(x, waveY)
      }
      
      ctx.strokeStyle = `hsl(${(i * 60 + time * 50) % 360}, 70%, 60%)`
      ctx.lineWidth = 2
      ctx.stroke()
      
      // Add data packets
      const packetX = ((time * 100) + (i * 100)) % (canvas.width + 100)
      const packetY = y + Math.sin((packetX * 0.01) + (time * 2) + i) * 20
      
      ctx.beginPath()
      ctx.arc(packetX, packetY, 8, 0, Math.PI * 2)
      ctx.fillStyle = `hsl(${(i * 60 + time * 50) % 360}, 70%, 60%)`
      ctx.fill()
      
      // Data labels
      const dataTypes = ['JSON', 'XML', 'CSV', 'SQL', 'API']
      ctx.fillStyle = '#ffffff'
      ctx.font = '10px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(dataTypes[i], packetX, packetY + 3)
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    if (mode === 'code-rain') initCodeRain()
    else if (mode === 'neural-network') initNeuralNetwork()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="w-5 h-5" />
            <span>Interactive Code Matrix</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Mode Selection */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { key: 'code-rain', label: 'Code Rain', icon: Terminal },
              { key: 'neural-network', label: 'Neural Network', icon: Cpu },
              { key: 'data-flow', label: 'Data Flow', icon: Code }
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                size="sm"
                variant={mode === key ? 'default' : 'outline'}
                onClick={() => setMode(key as any)}
                className="flex items-center space-x-1"
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4 mb-4">
            <Button onClick={handlePlayPause} size="sm">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            
            <Button onClick={handleReset} size="sm" variant="outline">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>

            <div className="flex items-center space-x-2">
              <span className="text-sm">Speed:</span>
              <input
                type="range"
                min="10"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-20"
              />
            </div>
          </div>

          {/* Visualization Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-80 border border-border rounded-lg bg-black"
          />

          {/* Information Panel */}
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Current Mode: {mode.replace('-', ' ').toUpperCase()}</h4>
            <div className="text-sm text-muted-foreground">
              {mode === 'code-rain' && (
                <div>
                  <p className="mb-2">🌧️ Falling code particles representing different programming concepts:</p>
                  <div className="flex flex-wrap gap-4">
                    <span className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded mr-1"></div>Variables</span>
                    <span className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>Functions</span>
                    <span className="flex items-center"><div className="w-3 h-3 bg-amber-500 rounded mr-1"></div>Keywords</span>
                    <span className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded mr-1"></div>Operators</span>
                    <span className="flex items-center"><div className="w-3 h-3 bg-purple-500 rounded mr-1"></div>Strings</span>
                  </div>
                </div>
              )}
              {mode === 'neural-network' && (
                <p>🧠 Simulated neural network with input layers, hidden layers, and output nodes. Watch the activations flow through the network!</p>
              )}
              {mode === 'data-flow' && (
                <p>📊 Data packets flowing through processing pipelines, showing different data formats and transmission patterns.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
