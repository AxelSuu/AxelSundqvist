import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { Calendar, Clock, ArrowRight, ExternalLink, Github, Search } from 'lucide-react'
import { useState } from 'react'

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAllPosts, setShowAllPosts] = useState(false)

  const blogPosts = [
    {
      title: 'Advanced Signal Processing Techniques',
      excerpt: 'Exploring modern signal processing methods and their applications in communication systems.',
      date: '2025-07-16',
      readTime: '8 min read',
      tags: ['Signal Processing', 'Mathematics', 'DSP'],
      featured: true,
      href: '/blog/blog1',
      fullContent: `
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <h2>Introduction to Advanced Signal Processing</h2>
          <p>Signal processing forms the backbone of modern communication systems, from the smartphones in our pockets to the satellites orbiting Earth. In this comprehensive guide, we'll explore cutting-edge techniques that are revolutionizing how we process and analyze signals.</p>
          
          <h3>Key Concepts</h3>
          <ul>
            <li><strong>Adaptive Filtering:</strong> Algorithms that adjust their parameters in real-time based on incoming data</li>
            <li><strong>Spectral Analysis:</strong> Frequency domain analysis for better signal understanding</li>
            <li><strong>Digital Filter Design:</strong> Creating optimal filters for specific applications</li>
          </ul>
          
          <h3>Applications in Modern Systems</h3>
          <p>These techniques are crucial in:</p>
          <ul>
            <li>Wireless communication systems</li>
            <li>Audio processing and noise cancellation</li>
            <li>Radar and sonar systems</li>
            <li>Medical signal processing</li>
          </ul>
          
          <h3>Mathematical Foundation</h3>
          <p>The mathematical foundation involves complex concepts including:</p>
          <ul>
            <li>Fourier transforms and their applications</li>
            <li>Z-transforms for discrete-time systems</li>
            <li>Probability theory for stochastic processes</li>
            <li>Linear algebra for multi-dimensional signal processing</li>
          </ul>
          
          <h3>Practical Implementation</h3>
          <p>In my recent projects, I've implemented these concepts using MATLAB and Python, focusing on real-time processing capabilities. The results show significant improvements in signal quality and processing efficiency.</p>
          
          <p>This field continues to evolve rapidly with new algorithms and hardware capabilities enabling more sophisticated signal processing applications.</p>
        </div>
      `,
      links: [
        { type: 'github', url: 'https://github.com/AxelSuu/signal-processing-demo', label: 'View Code' },
        { type: 'external', url: 'https://ieeexplore.ieee.org/document/example', label: 'Research Paper' }
      ]
    },
    {
      title: 'Machine Learning in Communications',
      excerpt: 'How AI and ML are transforming wireless communication systems and network optimization.',
      date: '2025-07-16',
      readTime: '12 min read',
      tags: ['Machine Learning', 'Communications', 'AI'],
      featured: true,
      href: '/blog/blog2',
      fullContent: `
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <h2>The AI Revolution in Communications</h2>
          <p>Machine learning is fundamentally changing how we approach wireless communication systems. From channel estimation to resource allocation, AI algorithms are enabling unprecedented levels of optimization and automation.</p>
          
          <h3>Key Applications</h3>
          <p>Machine learning techniques are being applied across various aspects of communication systems:</p>
          
          <h4>Channel Estimation</h4>
          <p>Traditional channel estimation methods rely on pilot signals and statistical models. ML approaches can:</p>
          <ul>
            <li>Learn complex channel patterns from data</li>
            <li>Adapt to changing environments in real-time</li>
            <li>Reduce overhead compared to traditional methods</li>
          </ul>
          
          <h4>Resource Allocation</h4>
          <p>ML algorithms can optimize:</p>
          <ul>
            <li>Power allocation across multiple users</li>
            <li>Spectrum management and interference mitigation</li>
            <li>Network slicing and dynamic resource assignment</li>
          </ul>
          
          <h3>Deep Learning Architectures</h3>
          <p>Several neural network architectures show promise in communications:</p>
          <ul>
            <li><strong>Convolutional Neural Networks (CNNs):</strong> For signal classification and interference detection</li>
            <li><strong>Recurrent Neural Networks (RNNs):</strong> For time-series prediction and channel modeling</li>
            <li><strong>Reinforcement Learning:</strong> For dynamic network optimization</li>
          </ul>
          
          <h3>Challenges and Solutions</h3>
          <p>While ML offers tremendous potential, several challenges must be addressed:</p>
          <ul>
            <li>Real-time processing requirements</li>
            <li>Training data availability and quality</li>
            <li>Computational complexity constraints</li>
            <li>Interpretability and reliability</li>
          </ul>
          
          <h3>Future Directions</h3>
          <p>The integration of ML in communications is just beginning. Future developments include:</p>
          <ul>
            <li>Federated learning for distributed networks</li>
            <li>Edge AI for low-latency applications</li>
            <li>Quantum machine learning for enhanced security</li>
          </ul>
          
          <p>As we move towards 6G and beyond, machine learning will become even more integral to communication system design and optimization.</p>
        </div>
      `,
      links: [
        { type: 'github', url: 'https://github.com/AxelSuu/ml-communications', label: 'Implementation' },
        { type: 'external', url: 'https://example.com/ml-comms-paper', label: 'Related Research' }
      ]
    },
    {
      title: 'Adaptive Filters and Their Applications',
      excerpt: 'Exploring adaptive filtering algorithms and their practical implementations in signal processing.',
      date: '2025-07-16',
      readTime: '10 min read',
      tags: ['Adaptive Filters', 'Signal Processing', 'Algorithms'],
      featured: false,
      href: '/blog/blog3',
      fullContent: `
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <h2>Understanding Adaptive Filters</h2>
          <p>Adaptive filters are essential components in modern signal processing systems. Unlike fixed filters, they can adjust their parameters automatically based on the characteristics of the input signal.</p>
          
          <h3>Types of Adaptive Filters</h3>
          <ul>
            <li><strong>Least Mean Squares (LMS):</strong> Simple and robust algorithm</li>
            <li><strong>Recursive Least Squares (RLS):</strong> Faster convergence but higher complexity</li>
            <li><strong>Normalized LMS:</strong> Improved stability and performance</li>
          </ul>
          
          <h3>Applications</h3>
          <p>Adaptive filters are used in:</p>
          <ul>
            <li>Noise cancellation systems</li>
            <li>Echo cancellation in telecommunications</li>
            <li>Equalization in communication channels</li>
            <li>System identification and modeling</li>
          </ul>
          
          <h3>Implementation Considerations</h3>
          <p>When implementing adaptive filters, consider:</p>
          <ul>
            <li>Convergence speed vs. stability trade-offs</li>
            <li>Computational complexity constraints</li>
            <li>Step size selection for optimal performance</li>
          </ul>
          
          <p>Through practical projects, I've explored these trade-offs and developed efficient implementations suitable for real-time applications.</p>
        </div>
      `,
      links: [
        { type: 'github', url: 'https://github.com/AxelSuu/adaptive-filters', label: 'Source Code' }
      ]
    },
    {
      title: 'MIMO Systems and Wireless Communications',
      excerpt: 'An in-depth look at Multiple-Input Multiple-Output systems and their role in modern wireless.',
      date: '2025-07-16',
      readTime: '6 min read',
      tags: ['MIMO', 'Communications', 'Wireless'],
      featured: false,
      href: '/blog/blog4',
      fullContent: `
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <h2>MIMO Systems: The Future of Wireless</h2>
          <p>Multiple-Input Multiple-Output (MIMO) technology is a cornerstone of modern wireless communication systems, enabling significant improvements in data rates and reliability.</p>
          
          <h3>MIMO Fundamentals</h3>
          <p>MIMO systems use multiple antennas at both transmitter and receiver to:</p>
          <ul>
            <li>Increase data throughput through spatial multiplexing</li>
            <li>Improve reliability through diversity techniques</li>
            <li>Enhance coverage through beamforming</li>
          </ul>
          
          <h3>Key Techniques</h3>
          <ul>
            <li><strong>Spatial Multiplexing:</strong> Transmitting multiple data streams simultaneously</li>
            <li><strong>Diversity:</strong> Combating fading through redundancy</li>
            <li><strong>Beamforming:</strong> Focusing signal energy in specific directions</li>
          </ul>
          
          <h3>Challenges</h3>
          <p>MIMO implementation faces several challenges:</p>
          <ul>
            <li>Channel estimation complexity</li>
            <li>Antenna correlation effects</li>
            <li>Hardware impairments</li>
            <li>Interference management</li>
          </ul>
          
          <p>My research focuses on developing efficient algorithms to address these challenges while maintaining system performance.</p>
        </div>
      `,
      links: [
        { type: 'github', url: 'https://github.com/AxelSuu/mimo-systems', label: 'MIMO Simulations' }
      ]
    },
    {
      title: 'NumPy and SciPy for Signal Processing',
      excerpt: 'Comprehensive guide to using Python libraries for digital signal processing applications.',
      date: '2025-07-16',
      readTime: '15 min read',
      tags: ['Python', 'DSP', 'Programming'],
      featured: false,
      href: '/blog/numpy-scipy',
      fullContent: `
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <h2>Python for Signal Processing</h2>
          <p>NumPy and SciPy form the foundation of scientific computing in Python, providing powerful tools for signal processing applications.</p>
          
          <h3>Essential NumPy Functions</h3>
          <p>Key NumPy functions for signal processing include:</p>
          <ul>
            <li><code>np.fft</code> for Fast Fourier Transform operations</li>
            <li><code>np.convolve</code> for convolution operations</li>
            <li><code>np.correlate</code> for correlation analysis</li>
            <li><code>np.random</code> for generating test signals</li>
          </ul>
          
          <h3>SciPy Signal Processing</h3>
          <p>SciPy provides specialized signal processing functions:</p>
          <ul>
            <li><code>scipy.signal.butter</code> for Butterworth filter design</li>
            <li><code>scipy.signal.filtfilt</code> for zero-phase filtering</li>
            <li><code>scipy.signal.spectrogram</code> for time-frequency analysis</li>
            <li><code>scipy.signal.find_peaks</code> for peak detection</li>
          </ul>
          
          <h3>Practical Examples</h3>
          <p>Let's explore some practical applications:</p>
          
          <h4>Digital Filter Design</h4>
          <p>Designing and implementing digital filters is straightforward with SciPy:</p>
          <pre><code>import numpy as np
from scipy import signal
import matplotlib.pyplot as plt

# Design a low-pass filter
fs = 1000  # Sample rate
fc = 100   # Cutoff frequency
nyq = 0.5 * fs
normal_cutoff = fc / nyq
b, a = signal.butter(6, normal_cutoff, btype='low', analog=False)

# Apply filter to signal
filtered_signal = signal.filtfilt(b, a, input_signal)</code></pre>
          
          <h4>Spectral Analysis</h4>
          <p>Analyzing signal frequency content:</p>
          <pre><code># Compute power spectral density
f, Pxx = signal.periodogram(signal_data, fs)
plt.plot(f, Pxx)
plt.xlabel('Frequency (Hz)')
plt.ylabel('Power Spectral Density')</code></pre>
          
          <h3>Performance Optimization</h3>
          <p>Tips for efficient signal processing:</p>
          <ul>
            <li>Use vectorized operations instead of loops</li>
            <li>Leverage NumPy's broadcasting capabilities</li>
            <li>Consider using numba for performance-critical code</li>
            <li>Profile your code to identify bottlenecks</li>
          </ul>
          
          <h3>Advanced Topics</h3>
          <p>For more complex applications, consider:</p>
          <ul>
            <li>Wavelet transforms using PyWavelets</li>
            <li>Machine learning integration with scikit-learn</li>
            <li>Real-time processing with asyncio</li>
            <li>GPU acceleration with CuPy</li>
          </ul>
          
          <p>These tools provide a solid foundation for implementing sophisticated signal processing algorithms in Python.</p>
        </div>
      `,
      links: [
        { type: 'github', url: 'https://github.com/AxelSuu/python-dsp-examples', label: 'Code Examples' },
        { type: 'external', url: 'https://scipy.org/docs/', label: 'SciPy Documentation' }
      ]
    },
  ]

  const filteredPosts = searchTerm
    ? blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : blogPosts

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const otherPosts = filteredPosts.filter(post => !post.featured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handleReadMore = (post: any) => {
    setSelectedPost(post)
  }

  const handleViewAllPosts = () => {
    setShowAllPosts(true)
  }

  const AllPostsModal = () => {
    return (
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">All Blog Posts</DialogTitle>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <CardTitle className="text-lg hover:text-primary transition-colors duration-200">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="group p-0"
                  onClick={() => {
                    handleReadMore(post)
                    setShowAllPosts(false)
                  }}
                >
                  Read More
                  <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No posts found matching your search.</p>
          </div>
        )}
      </DialogContent>
    )
  }

  const BlogModal = ({ post }: { post: any }) => {
    if (!post) return null
    
    return (
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">{post.title}</DialogTitle>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {post.readTime}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>
        
        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.fullContent }}
        />
        
        {post.links && post.links.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border">
            <h4 className="text-lg font-semibold mb-4">Related Links</h4>
            <div className="flex flex-wrap gap-3">
              {post.links.map((link: any, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex items-center"
                >
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {link.type === 'github' ? (
                      <Github className="mr-2 h-4 w-4" />
                    ) : (
                      <ExternalLink className="mr-2 h-4 w-4" />
                    )}
                    {link.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    )
  }

  return (
    <section id="blog" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Blog</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sharing insights from interesting topics and my own projects
          </p>
        </div>

        {/* Featured Posts */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Featured Articles</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 blog-card">
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-xl hover:text-primary transition-colors duration-200 cursor-pointer">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="group"
                        onClick={() => handleReadMore(post)}
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </DialogTrigger>
                    <BlogModal post={selectedPost} />
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Posts */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">Recent Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 blog-card">
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg hover:text-primary transition-colors duration-200 cursor-pointer">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="group p-0"
                        onClick={() => handleReadMore(post)}
                      >
                        Read More
                        <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </DialogTrigger>
                    <BlogModal post={selectedPost} />
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Posts Button */}
        <div className="text-center mt-12">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="px-8" onClick={handleViewAllPosts}>
                View All Posts
              </Button>
            </DialogTrigger>
            {showAllPosts && <AllPostsModal />}
          </Dialog>
        </div>
      </div>
    </section>
  )
}

export default Blog
