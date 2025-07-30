import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, Settings } from 'lucide-react'

interface ArrayElement {
  value: number
  index: number
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot' | 'found'
}

type Algorithm = 'bubble' | 'quick' | 'merge' | 'binary' | 'linear'

export const AlgorithmVisualizations = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [algorithm, setAlgorithm] = useState<Algorithm>('bubble')
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(100)
  const [array, setArray] = useState<ArrayElement[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [searchTarget, setSearchTarget] = useState(42)
  
  const intervalRef = useRef<number>()
  const stepsRef = useRef<ArrayElement[][]>([])

  // Initialize array
  const initializeArray = (size: number = 20) => {
    const newArray: ArrayElement[] = []
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 100) + 1,
        index: i,
        state: 'default'
      })
    }
    // For binary search, ensure target exists and array is sorted
    if (algorithm === 'binary') {
      newArray.sort((a, b) => a.value - b.value)
      if (Math.random() > 0.3) {
        const randomIndex = Math.floor(Math.random() * size)
        newArray[randomIndex].value = searchTarget
      }
    }
    return newArray
  }

  // Bubble Sort Implementation
  const bubbleSort = (arr: ArrayElement[]): ArrayElement[][] => {
    const steps: ArrayElement[][] = []
    const array = [...arr]
    
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - 1 - i; j++) {
        // Comparing state
        const comparing = array.map((el, idx) => ({
          ...el,
          state: (idx === j || idx === j + 1) ? 'comparing' : 'default'
        })) as ArrayElement[]
        steps.push([...comparing])
        
        if (array[j].value > array[j + 1].value) {
          // Swapping state
          const swapping = array.map((el, idx) => ({
            ...el,
            state: (idx === j || idx === j + 1) ? 'swapping' : 'default'
          })) as ArrayElement[]
          steps.push([...swapping])
          
          // Perform swap
          const temp = array[j]
          array[j] = array[j + 1]
          array[j + 1] = temp
          array[j].index = j
          array[j + 1].index = j + 1
        }
      }
      // Mark as sorted
      array[array.length - 1 - i].state = 'sorted'
      steps.push([...array])
    }
    array[0].state = 'sorted'
    steps.push([...array])
    
    return steps
  }

  // Quick Sort Implementation
  const quickSort = (arr: ArrayElement[], low: number = 0, high: number = arr.length - 1): ArrayElement[][] => {
    const steps: ArrayElement[][] = []
    
    const quickSortHelper = (array: ArrayElement[], low: number, high: number) => {
      if (low < high) {
        const pivotIndex = partition(array, low, high)
        quickSortHelper(array, low, pivotIndex - 1)
        quickSortHelper(array, pivotIndex + 1, high)
      }
    }
    
    const partition = (array: ArrayElement[], low: number, high: number): number => {
      const pivot = array[high].value
      array[high].state = 'pivot'
      steps.push([...array])
      
      let i = low - 1
      
      for (let j = low; j < high; j++) {
        array[j].state = 'comparing'
        steps.push([...array])
        
        if (array[j].value < pivot) {
          i++
          if (i !== j) {
            array[i].state = 'swapping'
            array[j].state = 'swapping'
            steps.push([...array])
            
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
            array[i].index = i
            array[j].index = j
          }
        }
        array[j].state = 'default'
      }
      
      array[i + 1].state = 'swapping'
      array[high].state = 'swapping'
      steps.push([...array])
      
      const temp = array[i + 1]
      array[i + 1] = array[high]
      array[high] = temp
      array[i + 1].index = i + 1
      array[high].index = high
      
      array[i + 1].state = 'sorted'
      array[high].state = 'default'
      steps.push([...array])
      
      return i + 1
    }
    
    const sortedArray = [...arr]
    quickSortHelper(sortedArray, low, high)
    return steps
  }

  // Binary Search Implementation
  const binarySearch = (arr: ArrayElement[], target: number): ArrayElement[][] => {
    const steps: ArrayElement[][] = []
    const array = [...arr]
    let left = 0
    let right = array.length - 1
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      
      // Highlight search range
      const searchStep = array.map((el, idx) => ({
        ...el,
        state: idx >= left && idx <= right ? 'comparing' : 'default'
      })) as ArrayElement[]
      searchStep[mid].state = 'pivot'
      steps.push([...searchStep])
      
      if (array[mid].value === target) {
        array[mid].state = 'found'
        steps.push([...array])
        break
      } else if (array[mid].value < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    
    return steps
  }

  // Generate algorithm steps
  const generateSteps = () => {
    const newArray = initializeArray(algorithm === 'binary' ? 15 : 20)
    setArray(newArray)
    
    let steps: ArrayElement[][] = []
    
    switch (algorithm) {
      case 'bubble':
        steps = bubbleSort(newArray)
        break
      case 'quick':
        steps = quickSort(newArray)
        break
      case 'binary':
        steps = binarySearch(newArray, searchTarget)
        break
      default:
        steps = [newArray]
    }
    
    stepsRef.current = steps
    setCurrentStep(0)
  }

  // Animation control
  useEffect(() => {
    if (isPlaying && stepsRef.current.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= stepsRef.current.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 1000 - speed * 9)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, speed])

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const currentArray = stepsRef.current[currentStep] || array
    const barWidth = canvas.width / currentArray.length
    const maxValue = Math.max(...currentArray.map(el => el.value))

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    currentArray.forEach((element, index) => {
      const barHeight = (element.value / maxValue) * (canvas.height - 40)
      const x = index * barWidth
      const y = canvas.height - barHeight - 20

      // Color based on state
      let color = '#64748b' // default
      switch (element.state) {
        case 'comparing':
          color = '#3b82f6' // blue
          break
        case 'swapping':
          color = '#ef4444' // red
          break
        case 'sorted':
          color = '#10b981' // green
          break
        case 'pivot':
          color = '#f59e0b' // amber
          break
        case 'found':
          color = '#8b5cf6' // purple
          break
      }

      // Draw bar
      ctx.fillStyle = color
      ctx.fillRect(x + 2, y, barWidth - 4, barHeight)

      // Draw value
      ctx.fillStyle = '#000'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(
        element.value.toString(),
        x + barWidth / 2,
        canvas.height - 5
      )
    })
  }, [currentStep, array, algorithm])

  // Initialize on algorithm change
  useEffect(() => {
    generateSteps()
  }, [algorithm, searchTarget])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  const handleNewArray = () => {
    setIsPlaying(false)
    generateSteps()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Algorithm Visualizer</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Algorithm Selection */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { key: 'bubble', label: 'Bubble Sort' },
              { key: 'quick', label: 'Quick Sort' },
              { key: 'binary', label: 'Binary Search' }
            ].map(({ key, label }) => (
              <Button
                key={key}
                size="sm"
                variant={algorithm === key ? 'default' : 'outline'}
                onClick={() => setAlgorithm(key as Algorithm)}
              >
                {label}
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
            
            <Button onClick={handleNewArray} size="sm" variant="outline">
              New Array
            </Button>

            <div className="flex items-center space-x-2">
              <span className="text-sm">Speed:</span>
              <input
                type="range"
                min="1"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-20"
              />
            </div>

            {algorithm === 'binary' && (
              <div className="flex items-center space-x-2">
                <span className="text-sm">Target:</span>
                <input
                  type="number"
                  value={searchTarget}
                  onChange={(e) => setSearchTarget(Number(e.target.value))}
                  className="w-16 px-2 py-1 border rounded text-sm"
                  min="1"
                  max="100"
                />
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress: Step {currentStep + 1} of {stepsRef.current.length}</span>
              <span>
                {algorithm === 'bubble' && 'Bubble Sort: O(n²)'}
                {algorithm === 'quick' && 'Quick Sort: O(n log n)'}
                {algorithm === 'binary' && 'Binary Search: O(log n)'}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-200"
                style={{ 
                  width: `${stepsRef.current.length > 0 ? (currentStep / (stepsRef.current.length - 1)) * 100 : 0}%` 
                }}
              />
            </div>
          </div>

          {/* Visualization Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-64 border border-border rounded-lg bg-background"
          />

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-slate-500 rounded"></div>
              <span>Default</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Comparing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Swapping</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Sorted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-amber-500 rounded"></div>
              <span>Pivot</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span>Found</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
