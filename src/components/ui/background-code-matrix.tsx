import { useEffect, useRef } from 'react'

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

interface BackgroundCodeMatrixProps {
  mode?: 'code-rain' | 'neural-network' | 'data-flow'
  opacity?: number
  speed?: number
  className?: string
}

export const BackgroundCodeMatrix = ({ 
  mode = 'code-rain', 
  opacity = 0.3, 
  speed = 30,
  className = ''
}: BackgroundCodeMatrixProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<CodeParticle[]>([])
  const nodesRef = useRef<NetworkNode[]>([])

  // Code snippets for different programming concepts
  const codeElements = {
    variable: ['let', 'const', 'var', 'int', 'string', 'bool', 'array', 'list', 'dict', 'map', 'set'],
    function: ['function', 'return', 'void', 'async', 'await', 'lambda', 'def', 'fn', 'method', 'call'],
    keyword: ['if', 'else', 'for', 'while', 'class', 'import', 'export', 'try', 'catch', 'finally', 'switch'],
    operator: ['+', '-', '*', '/', '=', '==', '!=', '=>', '&&', '||', '++', '--', '+=', '-=', '?:'],
    string: ['"hello"', "'world'", '`template`', '/regex/', '[array]', '{obj}', '(param)', '<tag>', '123', '0x']
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
    const particleCount = 200 // Increased for more prevalent effect

    for (let i = 0; i < particleCount; i++) {
      const categories = Object.keys(codeElements) as Array<keyof typeof codeElements>
      const category = categories[Math.floor(Math.random() * categories.length)]
      const chars = codeElements[category]
      
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        speed: Math.random() * 2.5 + 1, // Increased speed range
        char: chars[Math.floor(Math.random() * chars.length)],
        opacity: Math.random() * 0.8 + 0.4, // Higher opacity range
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
    const layers = [2, 4, 3, 2] // Simplified network for background
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
          for (let j = 0; j < layers[layerIndex + 1]; j++) {
            connections.push(`${nodeId + nodeCount + j}`)
          }
        }

        nodesRef.current.push({
          id: nodeId.toString(),
          x,
          y,
          radius: 12, // Smaller for background
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
      // Reduced trailing effect for crisper particles
      ctx.fillStyle = 'rgba(15, 23, 42, 0.15)' // Increased opacity for less trailing
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Apply global opacity for background effect
      ctx.globalAlpha = opacity

      if (mode === 'code-rain') {
        animateCodeRain(ctx, canvas)
      } else if (mode === 'neural-network') {
        animateNeuralNetwork(ctx)
      } else if (mode === 'data-flow') {
        animateDataFlow(ctx, canvas)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mode, opacity, speed])

  const animateCodeRain = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    particlesRef.current.forEach((particle) => {
      // Update position with slight horizontal drift
      particle.y += particle.speed * (speed / 50)
      particle.x += (Math.random() - 0.5) * 0.5 // Slight horizontal movement
      
      // Occasional character changes while falling
      if (Math.random() < 0.002) {
        const chars = codeElements[particle.category]
        particle.char = chars[Math.floor(Math.random() * chars.length)]
      }
      
      // Reset particle if it goes off screen
      if (particle.y > canvas.height + 50) {
        particle.y = -50
        particle.x = Math.random() * canvas.width
        
        // Change character more frequently for dynamic effect
        if (Math.random() < 0.3) {
          const chars = codeElements[particle.category]
          particle.char = chars[Math.floor(Math.random() * chars.length)]
        }
      }

      // Draw particle
      ctx.fillStyle = particle.color
      ctx.globalAlpha = particle.opacity * opacity
      ctx.font = '16px Monaco, monospace' // Larger font
      ctx.fillText(particle.char, particle.x, particle.y)
      
      // Add stronger glow effect
      ctx.shadowColor = particle.color
      ctx.shadowBlur = 8
      ctx.fillText(particle.char, particle.x, particle.y)
      ctx.shadowBlur = 0
    })
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
          const weight = Math.sin(Date.now() * 0.0005 + parseInt(node.id)) * 0.5 + 0.5
          ctx.strokeStyle = `rgba(59, 130, 246, ${weight * 0.3 * opacity})`
          ctx.lineWidth = weight * 2
          ctx.stroke()
        }
      })
    })

    // Draw nodes
    nodesRef.current.forEach(node => {
      // Update activation
      node.activation = Math.sin(Date.now() * 0.001 + parseInt(node.id)) * 0.5 + 0.5

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
      ctx.globalAlpha = (0.2 + node.activation * 0.4) * opacity
      ctx.fill()

      // Draw border
      ctx.strokeStyle = nodeColors[node.type]
      ctx.lineWidth = 1
      ctx.globalAlpha = opacity
      ctx.stroke()
    })
  }

  const animateDataFlow = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Create flowing data packets
    const time = Date.now() * 0.0005 // Slower for background
    
    // Draw flowing lines
    for (let i = 0; i < 3; i++) { // Fewer lines for background
      const y = (canvas.height / 4) * (i + 1)
      
      ctx.beginPath()
      ctx.moveTo(0, y)
      
      for (let x = 0; x <= canvas.width; x += 15) {
        const waveY = y + Math.sin((x * 0.008) + (time * 2) + i) * 15
        ctx.lineTo(x, waveY)
      }
      
      ctx.strokeStyle = `hsla(${(i * 120 + time * 30) % 360}, 70%, 60%, ${opacity * 0.8})`
      ctx.lineWidth = 1
      ctx.stroke()
      
      // Add data packets
      const packetX = ((time * 50) + (i * 150)) % (canvas.width + 100)
      const packetY = y + Math.sin((packetX * 0.008) + (time * 2) + i) * 15
      
      ctx.beginPath()
      ctx.arc(packetX, packetY, 4, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${(i * 120 + time * 30) % 360}, 70%, 60%, ${opacity})`
      ctx.fill()
    }
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  )
}
