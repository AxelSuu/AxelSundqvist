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
      title: 'What I\'m learning in my AP&EE program',
      excerpt: 'My thoughts on my courses in C++, Fourier analysis, Analytical mechanics, and Signals and Systems.',
      date: '2025-07-16',
      readTime: '2 min read',
      tags: ['AP&EE', 'Mathematics', 'Signal Processing'],
      featured: true,
      href: '/blog/blog1',
      fullContent: `
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <h2>My thoughts on my current coursework</h2>
          <p>I'm currently diving deep into C++, Fourier analysis, Analytical mechanics, statistics, and Signals and Systems. Each of these subjects offers unique challenges and insights that are shaping my understanding of applied physics and electrical engineering.</p>

          <h3>Key Concepts</h3>
          <ul>
            <li><strong>Fourier Transforms:</strong> Mathematical tools for analyzing frequency components</li>
            <li><strong>Statistical Mechanics:</strong> The base of thermodynamics, quantum mechanics, and Black Scholes theory</li>
            <li><strong>C++ Programming:</strong> Essential for implementing real-time algorithms and simulations</li>
          </ul>
          
          <h3>Applications in Modern Systems</h3>
          <p>These techniques are crucial in:</p>
          <ul>
            <li>Financial modeling and analysis</li>
            <li>Audio processing and noise cancellation</li>
            <li>Real-time systems</li>
            <li>Machine learning</li>
          </ul>
          
          <h3>Mathematical Foundation</h3>
          <p>The mathematical foundation involves:</p>
          <ul>
            <li>Fourier transforms and their applications</li>
            <li>Z-transforms for discrete-time systems</li>
            <li>Statistical theory</li>
            <li>Distribution theory</li>
          </ul>
          
          <h3>Personal thoughts</h3>
          <p>As I delve deeper into these subjects, I find the interplay between theory and practical application particularly fascinating. The ability to model complex systems and predict their behavior using mathematical tools is both challenging and rewarding.</p>
          
          <p>This field continues to evolve rapidly with new algorithms and hardware capabilities enabling more sophisticated signal processing applications.</p>
        </div>
      `,
      links: [
        { type: 'github', url: 'https://github.com/AxelSuu', label: 'View Code' }
      ]
    },
    {
      title: 'How to implement Machine Learning with PyTorch',
      excerpt: 'Easy, fun with tons of applications.',
      date: '2025-07-16',
      readTime: '12 min read',
      tags: ['Machine Learning', 'Python', 'AI'],
      featured: true,
      href: '/blog/blog2',
      fullContent: `
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <h2>Join the AI Revolution with PyTorch</h2>
          <p>Machine learning is transforming industries and creating new opportunities for innovation.
          In this blog post, we'll explore how to implement machine learning solutions using PyTorch.</p>
          <h3>Neural network setup</h3>
          <p>PyTorch provides a flexible framework for building and training neural networks. Here's a simple example:</p>
          <pre><code>import torch
import torch.nn as nn

class SimpleNN(nn.Module):
  def __init__(self):
    super(SimpleNN, self).__init__()
    self.fc1 = nn.Linear(784, 128)
    self.fc2 = nn.Linear(128, 10)

  def forward(self, x):
    x = torch.relu(self.fc1(x))
    x = self.fc2(x)
    return x

model = SimpleNN()

# Training loop
for epoch in range(10):
  optimizer.zero_grad()
  outputs = model(inputs)
  loss = criterion(outputs, labels)
  loss.backward()
  optimizer.step()
          </code></pre>
          <h3>More resources in my Stock prediction project, link in the blog</h3>
          <h3>Key Applications</h3>
          <p>Machine learning is being applied in various domains, including:</p>
          <ul>
            <li>Stock market prediction</li>
            <li>Video game character behavior modeling</li>
            <li>Image recognition and classification</li>
            <li>Automations</li>
          </ul>
        </div>
      `,
      links: [
        { type: 'github', url: 'https://github.com/AxelSuu/Pytorch-Quant-Model', label: 'Implementation' },
        { type: 'external', url: 'https://www.youtube.com/results?search_query=pytorch', label: 'Youtube' }
      ]
    },
    {
      title: '2D Game development with Pygame',
      excerpt: 'Creating engaging 2D games using the Pygame library.',
      date: '2025-07-16',
      readTime: '10 min read',
      tags: ['Game Development', 'Pygame', 'Python'],
      featured: false,
      href: '/blog/blog3',
      fullContent: `
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <h2>Tips and resources on creating fun and interactive games with Pygame</h2>
          <p>Pygame is a powerful library for creating 2D games in Python. It provides functionalities for graphics, sound, and user input, making it easier to develop engaging games.</p>

          <h3>Getting Started with Pygame</h3>
          <p>To begin your game development journey with Pygame, follow these steps:</p>
          <ol>
            <li>Install Pygame: Use pip to install the library.</li>
            <li>Set up your game window: Create a basic window to display your game.</li>
            <li>Handle user input: Capture keyboard and mouse events to control your game.</li>
          </ol>

          <h3>Key Features of Pygame</h3>
          <p>Pygame offers a range of features to facilitate game development:</p>
          <ul>
            <li><strong>Graphics:</strong> 2D graphics rendering with support for images and animations</li>
            <li><strong>Sound:</strong> Easy integration of sound effects and music</li>
            <li><strong>Input:</strong> Simple handling of keyboard and mouse input</li>
          </ul>
          
          <h3>Applications</h3>
          <p>Pygame is used in:</p>
          <ul>
            <li>2D game development</li>
            <li>Prototyping game ideas</li>
            <li>Educational purposes for teaching programming concepts</li>
            <li>Creating interactive simulations</li>
          </ul>
          
          <h3>Implementation Considerations</h3>
          <p>When implementing games with Pygame, consider:</p>
          <ul>
            <li>Frame rate management for smooth animations</li>
            <li>Resource loading and management (images, sounds)</li>
            <li>Game state management (menu, playing, paused)</li>
          </ul>
          
          <p>By leveraging Pygame's features and following best practices, you can create engaging and interactive 2D games.</p>
          <p>Check out my 2D platformer game project on GitHub for a complete example of a Pygame application:</p>
        </div>
      `,
      links: [
        { type: 'github', url: 'https://github.com/AxelSuu/Skybound-2.0', label: 'My Game Project' }
      ]
    },
    {
      title: 'Future Embedded Microcontroller Projects Ideas',
      excerpt: 'Exploring fun project ideas for controlling hardware with microcontrollers.',
      date: '2025-07-16',
      readTime: '6 min read',
      tags: ['Embedded Systems', 'Microcontrollers', 'IoT'],
      featured: false,
      href: '/blog/blog4',
      fullContent: `
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <h2>What to do after buying a microcontroller</h2>
          <p>In this post, we will explore the key concepts of microcontroller programming and interfacing.</p>
          <h3>Applications</h3>
          <p>Microcontrollers have various applications in different fields:</p>
          <ul>
            <li>Home automation</li>
            <li>Wearable devices</li>
            <li>Robotics</li>
          </ul>
          <h3>Project Ideas</h3>
          <p>Here are some fun project ideas for controlling hardware with microcontrollers:</p>
          <ul>
            <li>Build a smart home system to control lights and appliances with IoT</li>
            <li>Create a Pong game using a microcontroller and a display</li>
            <li>Turn your bike into an electric bike with a microcontroller-based motor controller</li>
          </ul>
        </div>
      `,
      links: [
        { type: 'external', url: 'https://www.youtube.com/results?search_query=building+an+electric+bike+from+scratch', label: 'A cool project' }
      ]
    },
    {
      title: 'NumPy and Scikit-learn for Signal Processing',
      excerpt: 'Orientation of signal processing in Python with NumPy and Scikit-learn, planning on doing future projects in this area.',
      date: '2025-07-16',
      readTime: '15 min read',
      tags: ['Python', 'NumPy', 'Scikit-learn', 'Signal Processing'],
      featured: false,
      href: '/blog/numpy-scipy',
      fullContent: `
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <h2>Python for Signal Processing</h2>
          <p>This is the content for the Python for Signal Processing blog post.</p>
          <p>NumPy and SciPy form the foundation of scientific computing in Python, providing powerful tools for signal processing applications.</p>
          <p>I find this super interesting and am planning on doing future projects in signal processing.</p>
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
        { type: 'github', url: 'https://github.com/AxelSuu', label: 'Future Examples here' },
        { type: 'external', url: 'https://scikit-learn.org/stable/', label: 'Scikit-learn Documentation' }
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
