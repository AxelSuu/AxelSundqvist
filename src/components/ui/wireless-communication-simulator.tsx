import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, Radio, Antenna, Wifi, Signal } from 'lucide-react'

interface WirelessSignal {
  x: number
  y: number
  amplitude: number
  phase: number
  frequency: number
  power: number
  isNoise: boolean
}

export const WirelessCommunicationSimulator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const constellationRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [scenario, setScenario] = useState<'line-of-sight' | 'multipath' | 'fading' | 'mimo'>('line-of-sight')
  const [modulation, setModulation] = useState<'BPSK' | 'QPSK' | '16QAM' | '64QAM'>('QPSK')
  const [snr, setSNR] = useState(20)
  const [doppler, setDoppler] = useState(0)
  const [antennas, setAntennas] = useState(2)
  
  const animationRef = useRef<number>()
  const timeRef = useRef(0)
  const signalsRef = useRef<WirelessSignal[]>([])

  // Constellation points for different modulations
  const getConstellationPoints = (mod: string) => {
    switch (mod) {
      case 'BPSK':
        return [
          { x: -1, y: 0, symbol: '0' },
          { x: 1, y: 0, symbol: '1' }
        ]
      case 'QPSK':
        return [
          { x: -0.707, y: -0.707, symbol: '00' },
          { x: 0.707, y: -0.707, symbol: '01' },
          { x: -0.707, y: 0.707, symbol: '10' },
          { x: 0.707, y: 0.707, symbol: '11' }
        ]
      case '16QAM':
        const points16 = []
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            points16.push({
              x: (i - 1.5) / 1.5,
              y: (j - 1.5) / 1.5,
              symbol: i.toString(2).padStart(2, '0') + j.toString(2).padStart(2, '0')
            })
          }
        }
        return points16
      case '64QAM':
        const points64 = []
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            points64.push({
              x: (i - 3.5) / 3.5,
              y: (j - 3.5) / 3.5,
              symbol: i.toString(2).padStart(3, '0') + j.toString(2).padStart(3, '0')
            })
          }
        }
        return points64
      default:
        return []
    }
  }

  // Initialize wireless signals based on scenario
  const initializeSignals = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    signalsRef.current = []
    const centerY = canvas.height / 2

    switch (scenario) {
      case 'line-of-sight':
        // Single direct path
        for (let i = 0; i < 5; i++) {
          signalsRef.current.push({
            x: 50 + i * 10,
            y: centerY + Math.sin(i * 0.5) * 20,
            amplitude: 1,
            phase: i * 0.2,
            frequency: 2.4, // GHz
            power: 1,
            isNoise: false
          })
        }
        break

      case 'multipath':
        // Multiple paths with different delays
        const paths = [
          { delay: 0, power: 1, angle: 0 },
          { delay: 0.1, power: 0.6, angle: 15 },
          { delay: 0.3, power: 0.3, angle: -20 },
          { delay: 0.5, power: 0.2, angle: 30 }
        ]
        
        paths.forEach((path, pathIndex) => {
          for (let i = 0; i < 8; i++) {
            const angle = (path.angle * Math.PI) / 180
            signalsRef.current.push({
              x: 50 + i * 15 + path.delay * 100,
              y: centerY + Math.sin(angle) * 100 + Math.sin(i * 0.3 + pathIndex) * 30,
              amplitude: path.power,
              phase: i * 0.3 + path.delay * 2,
              frequency: 2.4,
              power: path.power,
              isNoise: false
            })
          }
        })
        break

      case 'fading':
        // Rayleigh fading environment
        for (let i = 0; i < 10; i++) {
          const fadingAmplitude = Math.exp(-Math.random() * 2) // Rayleigh distribution
          signalsRef.current.push({
            x: 50 + i * 12,
            y: centerY + (Math.random() - 0.5) * 200,
            amplitude: fadingAmplitude,
            phase: Math.random() * 2 * Math.PI,
            frequency: 2.4,
            power: fadingAmplitude * fadingAmplitude,
            isNoise: false
          })
        }
        break

      case 'mimo':
        // MIMO with multiple antennas
        for (let ant = 0; ant < antennas; ant++) {
          for (let i = 0; i < 6; i++) {
            signalsRef.current.push({
              x: 50 + i * 20,
              y: centerY + (ant - antennas/2 + 0.5) * 80 + Math.sin(i * 0.4 + ant) * 15,
              amplitude: 1 / Math.sqrt(antennas), // Power normalization
              phase: i * 0.4 + ant * Math.PI / 4,
              frequency: 2.4,
              power: 1 / antennas,
              isNoise: false
            })
          }
        }
        break
    }

    // Add noise signals
    const noiseLevel = Math.pow(10, -snr / 20)
    for (let i = 0; i < 20; i++) {
      signalsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        amplitude: noiseLevel * (Math.random() - 0.5),
        phase: Math.random() * 2 * Math.PI,
        frequency: 2.4 + (Math.random() - 0.5) * 0.1,
        power: noiseLevel * noiseLevel,
        isNoise: true
      })
    }
  }

  // Draw the wireless communication scenario
  const drawWirelessScenario = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background grid
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.2)'
    ctx.lineWidth = 1
    for (let i = 0; i <= canvas.width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i <= canvas.height; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Draw transmitter
    ctx.fillStyle = '#3B82F6'
    ctx.beginPath()
    ctx.arc(50, canvas.height / 2, 15, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.font = '12px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('TX', 50, canvas.height / 2 + 4)

    // Draw receiver
    ctx.fillStyle = '#10B981'
    ctx.beginPath()
    ctx.arc(canvas.width - 50, canvas.height / 2, 15, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.fillText('RX', canvas.width - 50, canvas.height / 2 + 4)

    // Draw MIMO antennas if applicable
    if (scenario === 'mimo') {
      for (let i = 0; i < antennas; i++) {
        const y = canvas.height / 2 + (i - antennas/2 + 0.5) * 80
        // TX antennas
        ctx.fillStyle = '#3B82F6'
        ctx.beginPath()
        ctx.arc(50, y, 8, 0, Math.PI * 2)
        ctx.fill()
        // RX antennas
        ctx.fillStyle = '#10B981'
        ctx.beginPath()
        ctx.arc(canvas.width - 50, y, 8, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Draw signal propagation
    signalsRef.current.forEach((signal) => {
      if (signal.isNoise) {
        // Draw noise as small dots
        ctx.fillStyle = `rgba(255, 100, 100, ${Math.abs(signal.amplitude) * 2})`
        ctx.beginPath()
        ctx.arc(signal.x, signal.y, 2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // Draw signal waves
        const time = timeRef.current
        const waveAmplitude = signal.amplitude * 20
        const waveLength = 100
        
        ctx.strokeStyle = `rgba(59, 130, 246, ${signal.amplitude})`
        ctx.lineWidth = 2
        ctx.beginPath()
        
        for (let x = signal.x; x < signal.x + waveLength && x < canvas.width - 60; x += 2) {
          const phase = signal.phase + (x - signal.x) * 0.1 + time * signal.frequency
          const y = signal.y + waveAmplitude * Math.sin(phase)
          
          if (x === signal.x) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()

        // Add Doppler effect visualization
        if (doppler > 0) {
          const dopplerShift = doppler * Math.cos(time * 0.1)
          ctx.strokeStyle = `rgba(255, 165, 0, ${signal.amplitude * 0.5})`
          ctx.lineWidth = 1
          ctx.setLineDash([5, 5])
          ctx.beginPath()
          
          for (let x = signal.x; x < signal.x + waveLength && x < canvas.width - 60; x += 2) {
            const phase = signal.phase + (x - signal.x) * 0.1 + time * (signal.frequency + dopplerShift)
            const y = signal.y + waveAmplitude * 0.7 * Math.sin(phase)
            
            if (x === signal.x) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          ctx.stroke()
          ctx.setLineDash([])
        }
      }
    })

    // Draw scenario-specific elements
    ctx.fillStyle = '#ffffff'
    ctx.font = '14px Arial'
    ctx.textAlign = 'left'
    ctx.fillText(`Scenario: ${scenario.replace('-', ' ').toUpperCase()}`, 10, 30)
    ctx.fillText(`SNR: ${snr} dB`, 10, 50)
    ctx.fillText(`Modulation: ${modulation}`, 10, 70)
    if (doppler > 0) {
      ctx.fillText(`Doppler: ${doppler} Hz`, 10, 90)
    }
  }

  // Draw constellation diagram
  const drawConstellation = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const scale = Math.min(canvas.width, canvas.height) * 0.3

    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(canvas.width, centerY)
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, canvas.height)
    ctx.stroke()

    // Draw grid circles
    for (let r = 0.5; r <= 1.5; r += 0.5) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, r * scale, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw ideal constellation points
    const points = getConstellationPoints(modulation)
    points.forEach((point) => {
      const x = centerX + point.x * scale
      const y = centerY - point.y * scale // Invert Y for correct display
      
      ctx.fillStyle = '#3B82F6'
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw received symbols with noise and channel effects
    const noiseLevel = Math.pow(10, -snr / 20)
    for (let i = 0; i < 50; i++) {
      const idealPoint = points[Math.floor(Math.random() * points.length)]
      
      // Add channel effects
      let receivedX = idealPoint.x
      let receivedY = idealPoint.y
      
      // Add AWGN
      receivedX += noiseLevel * (Math.random() - 0.5) * 2
      receivedY += noiseLevel * (Math.random() - 0.5) * 2
      
      // Add fading if in fading scenario
      if (scenario === 'fading') {
        const fadingAmplitude = Math.exp(-Math.random())
        receivedX *= fadingAmplitude
        receivedY *= fadingAmplitude
      }
      
      const x = centerX + receivedX * scale
      const y = centerY - receivedY * scale
      
      ctx.fillStyle = `rgba(16, 185, 129, ${0.3 + 0.4 * Math.random()})`
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, Math.PI * 2)
      ctx.fill()
    }

    // Labels
    ctx.fillStyle = '#ffffff'
    ctx.font = '12px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('I', canvas.width - 15, centerY - 10)
    ctx.fillText('Q', centerX + 10, 15)
  }

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (!isPlaying) return

      timeRef.current += 0.1

      // Update signal positions
      signalsRef.current.forEach((signal) => {
        if (!signal.isNoise) {
          signal.x += 2
          if (signal.x > (canvasRef.current?.width || 0) - 60) {
            signal.x = 50
          }
        } else {
          signal.x += 0.5
          signal.y += (Math.random() - 0.5) * 2
          if (signal.x > (canvasRef.current?.width || 0)) {
            signal.x = 0
          }
          if (signal.y < 0 || signal.y > (canvasRef.current?.height || 0)) {
            signal.y = Math.random() * (canvasRef.current?.height || 0)
          }
        }
      })

      if (canvasRef.current) {
        drawWirelessScenario(canvasRef.current)
      }
      
      if (constellationRef.current) {
        drawConstellation(constellationRef.current)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    if (isPlaying) {
      animate()
    } else {
      if (canvasRef.current) {
        drawWirelessScenario(canvasRef.current)
      }
      if (constellationRef.current) {
        drawConstellation(constellationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, scenario, modulation, snr, doppler, antennas])

  // Initialize and resize canvases
  useEffect(() => {
    const resizeCanvases = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.offsetWidth
        canvasRef.current.height = canvasRef.current.offsetHeight
      }
      if (constellationRef.current) {
        constellationRef.current.width = constellationRef.current.offsetWidth
        constellationRef.current.height = constellationRef.current.offsetHeight
      }
      initializeSignals()
    }

    resizeCanvases()
    window.addEventListener('resize', resizeCanvases)
    return () => window.removeEventListener('resize', resizeCanvases)
  }, [scenario, antennas])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    timeRef.current = 0
    initializeSignals()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Antenna className="w-5 h-5" />
            <span>Wireless Communication Simulator</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Scenario Selection */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { key: 'line-of-sight', label: 'Line of Sight', icon: Radio },
              { key: 'multipath', label: 'Multipath', icon: Wifi },
              { key: 'fading', label: 'Rayleigh Fading', icon: Signal },
              { key: 'mimo', label: 'MIMO', icon: Antenna }
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                size="sm"
                variant={scenario === key ? 'default' : 'outline'}
                onClick={() => setScenario(key as any)}
                className="flex items-center space-x-1"
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Button>
            ))}
          </div>

          {/* Modulation Selection */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm font-medium self-center">Modulation:</span>
            {['BPSK', 'QPSK', '16QAM', '64QAM'].map((mod) => (
              <Button
                key={mod}
                size="sm"
                variant={modulation === mod ? 'default' : 'outline'}
                onClick={() => setModulation(mod as any)}
              >
                {mod}
              </Button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Button onClick={handlePlayPause} size="sm">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            
            <Button onClick={handleReset} size="sm" variant="outline">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>

            <div className="flex items-center space-x-2">
              <span className="text-sm">SNR:</span>
              <input
                type="range"
                min="0"
                max="30"
                value={snr}
                onChange={(e) => setSNR(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-sm w-12">{snr} dB</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm">Doppler:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={doppler}
                onChange={(e) => setDoppler(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-sm w-12">{doppler} Hz</span>
            </div>

            {scenario === 'mimo' && (
              <div className="flex items-center space-x-2">
                <span className="text-sm">Antennas:</span>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={antennas}
                  onChange={(e) => setAntennas(Number(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm w-8">{antennas}</span>
              </div>
            )}
          </div>

          {/* Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <h4 className="font-semibold mb-2">Channel Propagation</h4>
              <canvas
                ref={canvasRef}
                className="w-full h-64 border border-border rounded-lg bg-black"
              />
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Constellation Diagram</h4>
              <canvas
                ref={constellationRef}
                className="w-full h-64 border border-border rounded-lg bg-black"
              />
            </div>
          </div>

          {/* Information Panel */}
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Current Scenario: {scenario.replace('-', ' ').toUpperCase()}</h4>
            <div className="text-sm text-muted-foreground">
              {scenario === 'line-of-sight' && (
                <p> Clear line-of-sight communication with minimal interference. Ideal conditions for wireless transmission.</p>
              )}
              {scenario === 'multipath' && (
                <p> Multiple signal paths due to reflections and scattering. Shows intersymbol interference and delayed signals.</p>
              )}
              {scenario === 'fading' && (
                <p> Rayleigh fading environment with signal amplitude variations. Common in mobile communications.</p>
              )}
              {scenario === 'mimo' && (
                <p> Multiple-Input Multiple-Output system using {antennas} antennas for improved capacity and reliability.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
