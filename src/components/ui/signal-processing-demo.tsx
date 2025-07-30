import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, Radio, Zap, Activity, Waves } from 'lucide-react'

interface SignalData {
  time: number[]
  amplitude: number[]
  frequency: number[]
  magnitude: number[]
}

export const SignalProcessingDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fftCanvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [demo, setDemo] = useState<'sine-wave' | 'am-modulation' | 'fm-modulation' | 'filter'>('sine-wave')
  const [frequency, setFrequency] = useState(5)
  const [amplitude, setAmplitude] = useState(1)
  const [filterCutoff, setFilterCutoff] = useState(10)
  
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  // Generate signal data based on current demo type
  const generateSignalData = (time: number): SignalData => {
    const sampleRate = 100
    const duration = 4
    const samples = sampleRate * duration
    const timeArray = Array.from({ length: samples }, (_, i) => i / sampleRate)
    let amplitudeArray: number[] = []
    
    switch (demo) {
      case 'sine-wave':
        amplitudeArray = timeArray.map(t => 
          amplitude * Math.sin(2 * Math.PI * frequency * (t + time))
        )
        break
        
      case 'am-modulation':
        const carrierFreq = frequency * 4
        const modulationFreq = frequency * 0.5
        amplitudeArray = timeArray.map(t => {
          const carrier = Math.sin(2 * Math.PI * carrierFreq * (t + time))
          const modulation = 0.5 * (1 + Math.sin(2 * Math.PI * modulationFreq * (t + time)))
          return amplitude * carrier * modulation
        })
        break
        
      case 'fm-modulation':
        const carrierFreqFM = frequency * 4
        const modulationFreqFM = frequency * 0.3
        const modulationIndex = 2
        amplitudeArray = timeArray.map(t => {
          const modulation = modulationIndex * Math.sin(2 * Math.PI * modulationFreqFM * (t + time))
          return amplitude * Math.sin(2 * Math.PI * carrierFreqFM * (t + time) + modulation)
        })
        break
        
      case 'filter':
        // Generate noisy signal and apply simple low-pass filter
        const noisySignal = timeArray.map(t => {
          const clean = Math.sin(2 * Math.PI * frequency * (t + time))
          const noise = 0.3 * Math.sin(2 * Math.PI * frequency * 8 * (t + time))
          return amplitude * (clean + noise)
        })
        
        // Simple moving average filter
        const windowSize = Math.max(1, Math.floor(sampleRate / filterCutoff))
        amplitudeArray = noisySignal.map((_, i) => {
          const start = Math.max(0, i - windowSize + 1)
          const end = i + 1
          const window = noisySignal.slice(start, end)
          return window.reduce((sum, val) => sum + val, 0) / window.length
        })
        break
    }

    // Simple FFT approximation for visualization
    const frequencyArray = Array.from({ length: 50 }, (_, i) => i)
    const magnitudeArray = frequencyArray.map(freq => {
      // Simplified frequency domain representation
      let magnitude = 0
      for (let i = 0; i < Math.min(amplitudeArray.length, 200); i += 4) {
        magnitude += Math.abs(amplitudeArray[i] * Math.cos(2 * Math.PI * freq * i / sampleRate))
      }
      return Math.abs(magnitude) / 50
    })

    return {
      time: timeArray,
      amplitude: amplitudeArray,
      frequency: frequencyArray,
      magnitude: magnitudeArray
    }
  }

  // Draw time domain signal
  const drawTimeDomain = (canvas: HTMLCanvasElement, signalData: SignalData) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw grid
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.3)'
    ctx.lineWidth = 1
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = (canvas.height / 4) * i
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
    
    // Vertical grid lines
    for (let i = 0; i <= 8; i++) {
      const x = (canvas.width / 8) * i
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Draw signal
    ctx.strokeStyle = '#3B82F6'
    ctx.lineWidth = 2
    ctx.beginPath()
    
    const centerY = canvas.height / 2
    const scaleY = canvas.height / 4
    const scaleX = canvas.width / signalData.time.length
    
    signalData.amplitude.forEach((amp, i) => {
      const x = i * scaleX
      const y = centerY - amp * scaleY
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    
    ctx.stroke()

    // Draw labels
    ctx.fillStyle = '#ffffff'
    ctx.font = '12px Arial'
    ctx.fillText('Time Domain', 10, 20)
    ctx.fillText('Time (s)', canvas.width - 60, canvas.height - 10)
    ctx.fillText('Amplitude', 10, canvas.height - 10)
  }

  // Draw frequency domain (FFT)
  const drawFrequencyDomain = (canvas: HTMLCanvasElement, signalData: SignalData) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw grid
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.3)'
    ctx.lineWidth = 1
    
    for (let i = 0; i <= 4; i++) {
      const y = (canvas.height / 4) * i
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw frequency bars
    const barWidth = canvas.width / signalData.frequency.length
    const maxMagnitude = Math.max(...signalData.magnitude)
    
    signalData.magnitude.forEach((mag, i) => {
      const height = (mag / maxMagnitude) * canvas.height * 0.8
      const x = i * barWidth
      const y = canvas.height - height
      
      // Color based on frequency
      const hue = (i / signalData.frequency.length) * 240 // Blue to red
      ctx.fillStyle = `hsl(${hue}, 70%, 60%)`
      ctx.fillRect(x, y, barWidth - 1, height)
    })

    // Draw labels
    ctx.fillStyle = '#ffffff'
    ctx.font = '12px Arial'
    ctx.fillText('Frequency Domain (FFT)', 10, 20)
    ctx.fillText('Frequency (Hz)', canvas.width - 100, canvas.height - 10)
    ctx.fillText('Magnitude', 10, canvas.height - 10)
  }

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (!isPlaying) return

      timeRef.current += 0.05
      
      const signalData = generateSignalData(timeRef.current)
      
      if (canvasRef.current) {
        drawTimeDomain(canvasRef.current, signalData)
      }
      
      if (fftCanvasRef.current) {
        drawFrequencyDomain(fftCanvasRef.current, signalData)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    if (isPlaying) {
      animate()
    } else {
      // Draw static signal when paused
      const signalData = generateSignalData(timeRef.current)
      if (canvasRef.current) {
        drawTimeDomain(canvasRef.current, signalData)
      }
      if (fftCanvasRef.current) {
        drawFrequencyDomain(fftCanvasRef.current, signalData)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, demo, frequency, amplitude, filterCutoff])

  // Resize canvases
  useEffect(() => {
    const resizeCanvases = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.offsetWidth
        canvasRef.current.height = canvasRef.current.offsetHeight
      }
      if (fftCanvasRef.current) {
        fftCanvasRef.current.width = fftCanvasRef.current.offsetWidth
        fftCanvasRef.current.height = fftCanvasRef.current.offsetHeight
      }
    }

    resizeCanvases()
    window.addEventListener('resize', resizeCanvases)
    return () => window.removeEventListener('resize', resizeCanvases)
  }, [])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    timeRef.current = 0
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Radio className="w-5 h-5" />
            <span>Signal Processing Demo</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Demo Selection */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { key: 'sine-wave', label: 'Sine Wave', icon: Waves },
              { key: 'am-modulation', label: 'AM Modulation', icon: Radio },
              { key: 'fm-modulation', label: 'FM Modulation', icon: Zap },
              { key: 'filter', label: 'Low-Pass Filter', icon: Activity }
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                size="sm"
                variant={demo === key ? 'default' : 'outline'}
                onClick={() => setDemo(key as any)}
                className="flex items-center space-x-1"
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
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
              <span className="text-sm">Frequency:</span>
              <input
                type="range"
                min="1"
                max="20"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-sm w-8">{frequency}Hz</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm">Amplitude:</span>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={amplitude}
                onChange={(e) => setAmplitude(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-sm w-8">{amplitude.toFixed(1)}</span>
            </div>

            {demo === 'filter' && (
              <div className="flex items-center space-x-2">
                <span className="text-sm">Cutoff:</span>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={filterCutoff}
                  onChange={(e) => setFilterCutoff(Number(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm w-12">{filterCutoff}Hz</span>
              </div>
            )}
          </div>

          {/* Visualization Canvases */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Time Domain</h4>
              <canvas
                ref={canvasRef}
                className="w-full h-48 border border-border rounded-lg bg-black"
              />
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Frequency Domain</h4>
              <canvas
                ref={fftCanvasRef}
                className="w-full h-48 border border-border rounded-lg bg-black"
              />
            </div>
          </div>

          {/* Information Panel */}
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Current Demo: {demo.replace('-', ' ').toUpperCase()}</h4>
            <div className="text-sm text-muted-foreground">
              {demo === 'sine-wave' && (
                <p>Pure sinewave signal</p>
              )}
              {demo === 'am-modulation' && (
                <p>Amplitude Modulation (AM) - carrier signal amplitude varies with modulating signal. Used in AM radio broadcasting.</p>
              )}
              {demo === 'fm-modulation' && (
                <p>Frequency Modulation (FM) - carrier frequency varies with modulating signal. Provides better noise immunity than AM.</p>
              )}
              {demo === 'filter' && (
                <p>Low-pass filtering removes high-frequency noise while preserving the fundamental signal.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
