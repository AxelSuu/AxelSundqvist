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
      title: 'What I\'m wrestling with in C++, Fourier analysis, and signals',
      excerpt: 'My thoughts on my courses in C++, Fourier analysis, Analytical mechanics, and Signals and Systems.',
      date: '2025-07-16',
      readTime: '2 min read',
      tags: ['AP&EE', 'Mathematics', 'Signal Processing'],
      featured: true,
      href: '/blog/blog1',
      fullContent: `
        <div class="prose prose-lg dark:prose-invert max-w-none">
  <h2>Courses That Are Making My Brain Hurt</h2>
  <p>Right now, I’m neck-deep in C++, Fourier analysis, statistical mechanics, statistics, and signals and systems. It’s a wild mix, but honestly, I love how all these subjects keep intersecting and making each other make more sense.</p>

  <h3>What I'm Actually Learning</h3>
  <ul>
    <li><strong>Fourier Transforms:</strong> Basically magic for figuring out what frequencies are hiding inside a signal.</li>
    <li><strong>Statistical Mechanics:</strong> It’s like the behind-the-scenes of thermodynamics, quantum theory, and even finance models (hello, Black-Scholes).</li>
    <li><strong>C++:</strong> Not the easiest language, but super powerful when you're building real-time simulations or low-level systems.</li>
  </ul>

  <h3>Where This Stuff Actually Shows Up</h3>
  <p>What’s cool is how this theory turns into real things:</p>
  <ul>
    <li>Predicting markets with math (who doesn’t want that?)</li>
    <li>Making headphones that cancel noise mid-flight</li>
    <li>Controlling hardware in real-time</li>
    <li>Training ML models to see patterns in chaos</li>
  </ul>

  <p>Everything ties back to the math foundations - like Fourier transforms, and distributions. It's a weird mix of thinking more abstractly while still building stuff that runs on real machines.</p>

  <h3>Final Thoughts</h3>
  <p>The more I learn, the more I see how much theory and application lean on each other. You can’t build something efficient without the math, but you can’t *just* theorize either. This combo is what makes tech feel exciting and alive.</p>
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
      readTime: '6 min read',
      tags: ['Machine Learning', 'Python', 'AI'],
      featured: true,
      href: '/blog/blog2',
      fullContent: `
<div class="prose prose-lg dark:prose-invert max-w-none">
  <h2>Building Smart Stuff with PyTorch (ML Made Simple)</h2>

  <p>Machine learning might seem like something reserved for giant tech companies or AI researchers, but with tools like PyTorch, it’s way more accessible than you’d think. Whether you want to teach a model to recognize numbers, predict stock prices, or control game characters, PyTorch gives you the flexibility to experiment and learn hands-on.</p>

  <p>In this post, we’ll break down what PyTorch is, how to build a simple neural network from scratch, and walk through the entire workflow: model → training → evaluation → prediction. Let’s dive in!</p>

  <h3>Why PyTorch?</h3>
  <ul>
    <li><strong>Dynamic computation graph:</strong> You can change architecture on the fly (very Pythonic).</li>
    <li><strong>Beginner-friendly:</strong> It’s readable, flexible, and integrates well with the rest of the Python ecosystem.</li>
    <li><strong>GPU support:</strong> You can train your models on CUDA-enabled GPUs without much code change.</li>
  </ul>

  <h3>Our Project: Classify Handwritten Digits (MNIST)</h3>
  <p>We’ll use the MNIST dataset (images of digits from 0 to 9) and build a model that can classify them using a feedforward neural network.</p>

  <h3>1. Setup & Dataset</h3>

  <pre><code>import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

# Transform images to tensors and normalize
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])

# Load training and test data
train_data = datasets.MNIST(root='./data', train=True, transform=transform, download=True)
test_data = datasets.MNIST(root='./data', train=False, transform=transform)

train_loader = DataLoader(train_data, batch_size=64, shuffle=True)
test_loader = DataLoader(test_data, batch_size=1000)
</code></pre>

  <h3>2. Building a Neural Network</h3>

  <p>This model has two hidden layers using ReLU activations and outputs logits for 10 classes (0–9).</p>

  <pre><code>class DigitClassifier(nn.Module):
    def __init__(self):
        super(DigitClassifier, self).__init__()
        self.fc1 = nn.Linear(28 * 28, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, 10)

    def forward(self, x):
        x = x.view(-1, 28 * 28)  # Flatten the input
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.fc3(x)
        return x

model = DigitClassifier()
</code></pre>

  <h3>3. Training the Model</h3>

  <p>We'll use cross-entropy loss and the Adam optimizer. Here's a basic training loop:</p>

  <pre><code>criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

epochs = 5
for epoch in range(epochs):
    model.train()
    running_loss = 0.0
    for images, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        running_loss += loss.item()
    
    print(f"Epoch {epoch+1}/{epochs}, Loss: {running_loss/len(train_loader):.4f}")
</code></pre>

  <h3>4. Evaluating the Model</h3>

  <p>After training, we evaluate how well the model does on the test set:</p>

  <pre><code>correct = 0
total = 0
model.eval()
with torch.no_grad():
    for images, labels in test_loader:
        outputs = model(images)
        _, predicted = torch.max(outputs.data, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

print(f"Accuracy on test set: {100 * correct / total:.2f}%")
</code></pre>

  <h3>5. Making Predictions</h3>

  <p>Once trained, your model can predict digits from new images like this:</p>

  <pre><code>import matplotlib.pyplot as plt

# Grab one image from the test set
example = next(iter(test_loader))
image, label = example[0][0], example[1][0]

# Predict
model.eval()
with torch.no_grad():
    output = model(image.unsqueeze(0))
    prediction = torch.argmax(output)

print(f"Actual Label: {label}, Predicted: {prediction.item()}")

# Plot image
plt.imshow(image.squeeze(), cmap='gray')
plt.title(f'Predicted: {prediction.item()}')
plt.axis('off')
plt.show()
</code></pre>

  <h3>Final Thoughts</h3>

  <p>That’s a full ML pipeline—from loading data, building and training a model, to evaluating and using it to make predictions. What’s amazing is how PyTorch makes this all feel like regular Python. You don’t need to know everything about deep learning to get started. Just build, experiment, and learn as you go.</p>

  <p>Next up: I’m planning to take this further by adding CNNs (Convolutional Neural Nets) for better image performance, and eventually using this base for real-world projects like digit recognition from scanned documents or CAPTCHA breaking.</p>

  <p>If you’re curious or want to try your own experiments, check out my GitHub repo for code examples, including more complex models like LSTMs and CNNs.</p>
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
      readTime: '5 min read',
      tags: ['Game Development', 'Pygame', 'Python'],
      featured: false,
      href: '/blog/blog3',
      fullContent: `
<div class="prose prose-lg dark:prose-invert max-w-none">
  <h2>Building 2D Games That Don’t Suck (With Python + Pygame)</h2>
  <p>If you're into games and also enjoy Python, Pygame is a solid way to bring your game ideas to life. It’s not just for hobby projects—learning how to build a proper 2D game teaches you a lot about logic, structure, and creative problem-solving.</p>

  <h3>Game Loops: The Beating Heart</h3>
  <p>Every game runs on a loop that handles input, updates the game state, and draws everything to the screen. It's basically your real-time engine. Even if nothing is happening, your loop is ticking away at 30–60 frames per second (or more).</p>
  <pre><code># The classic Pygame loop
while running:
    handle_input()
    update_game_state()
    render_everything()
    clock.tick(FPS)
  </code></pre>
  <p>Keeping your game loop clean and modular makes debugging and adding features way easier. Think of it like your game's brainstem—it controls everything automatically.</p>

  <h3>Sprites, Objects, and OOP</h3>
  <p>Most game elements—like players, enemies, bullets—can be treated as objects. In Pygame, you can use the built-in <code>Sprite</code> class to manage these. This lets you group related entities, handle collisions efficiently, and draw everything in one go.</p>
  <ul>
    <li><strong>Sprite groups:</strong> Keep things organized, like all enemies or all bullets in one list.</li>
    <li><strong>Custom classes:</strong> Create a <code>Player</code> or <code>Enemy</code> class with properties like position, speed, and behavior.</li>
  </ul>

  <h3>Collision Detection: When Things Get Physical</h3>
  <p>Games get fun when stuff collides—think jumping on platforms or dodging fireballs. Pygame has functions like <code>spritecollide()</code> or <code>rect.colliderect()</code> that help you detect when two objects interact. You can use this to:</p>
  <ul>
    <li>Track player vs. enemy contact</li>
    <li>Trigger item pickups or powerups</li>
    <li>Handle bullets hitting targets</li>
  </ul>

  <h3>Animation and Movement</h3>
  <p>Basic movement is just changing coordinates every frame, but once you add gravity, jumping, and momentum—it starts to feel real. For animation, you can swap between sprite images based on time or actions (like walking vs. idle).</p>
  <ul>
    <li>Use a timer or frame counter to control how often your sprite changes</li>
    <li>Organize animations with dictionaries or state variables (like <code>'idle'</code>, <code>'run'</code>, <code>'jump'</code>)</li>
  </ul>

  <h3>Level Design & Tile Maps</h3>
  <p>You can create levels manually (painful) or build a tile map system. Think of the screen as a grid of tiles—each tile representing ground, spikes, walls, etc. Load maps from CSV or JSON files and render them using a tile engine. This makes building big levels a lot faster.</p>
  <p>Bonus: Export levels from tools like <a href="https://www.mapeditor.org/">Tiled</a> and load them directly into your game!</p>

  <h3>Game Architecture: Keeping It Sane</h3>
  <p>Don’t just pile everything into one file. Break up your game into modules:</p>
  <ul>
    <li><code>player.py</code> for your player class</li>
    <li><code>enemy.py</code> for bad guys</li>
    <li><code>levels.py</code> for maps and tiles</li>
    <li><code>main.py</code> as the entry point</li>
  </ul>
  <p>This makes scaling your game way easier. Also, if you want to add things like a pause menu or save system later, you won’t be drowning in spaghetti code.</p>

  <h3>Sound Design & Feedback</h3>
  <p>Adding sounds makes a game come alive. Use Pygame’s <code>mixer</code> module to add:</p>
  <ul>
    <li>Jump effects</li>
    <li>Background music</li>
    <li>Collision sounds (like damage or pickups)</li>
  </ul>
  <p>Don't underestimate how much better a game feels with solid sound feedback.</p>

  <h3>Debugging Tips</h3>
  <p>Here’s what’s saved me the most headache:</p>
  <ul>
    <li>Draw bounding boxes and hitboxes during development</li>
    <li>Use print statements or overlays to show FPS or object states</li>
    <li>Modularize early—trust me</li>
  </ul>

  <h3>Why Build Games Anyway?</h3>
  <p>Game dev might seem like a side quest, but it teaches real-world coding skills like object-oriented design, input handling, and managing complex systems. You also build something visual and interactive—way more satisfying than writing a calculator.</p>

  <p>If you're curious how it all comes together, check out my own Pygame project on GitHub. It’s a 2D platformer with physics, animation, and some fun mechanics. Feel free to fork and mess around with it!</p>
</div>

      `,
      links: [
        { type: 'github', url: 'https://github.com/AxelSuu/Skybound-2.0', label: 'My Game Project' }
      ]
    },
    {
      title: 'Microcontroller Projects Ideas',
      excerpt: 'Bought a microcontroller? Here\'s what to do with it.',
      date: '2025-07-16',
      readTime: '3 min read',
      tags: ['Embedded Systems', 'Microcontrollers', 'IoT'],
      featured: false,
      href: '/blog/blog4',
      fullContent: `
<div class="prose prose-lg dark:prose-invert max-w-none">
  <h2>So... You Bought a Microcontroller</h2>
  <p>If you just picked up an Arduino, ESP32, or Raspberry Pi Pico, and you’re staring at it like “now what?”, this is for you.</p>

  <h3>Cool Things You Can Build</h3>
  <ul>
    <li><strong>Home Automation:</strong> Lights that turn on when you clap? Yes please.</li>
    <li><strong>Wearables:</strong> DIY step counters, smartwatches, or health trackers.</li>
    <li><strong>Robotics:</strong> Build your own mini rover or robotic arm.</li>
  </ul>

  <h3>Project Ideas to Try</h3>
  <ul>
    <li>Smart light system (IoT-controlled via app or voice)</li>
    <li>Classic Pong game using a small LCD screen and joystick</li>
    <li>Motorized e-bike controller—very fun, very nerdy</li>
  </ul>

  <p>Check the link below for a cool DIY e-bike video that got me inspired!</p>
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
      readTime: '7 min read',
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-accent-text heading-wave">Blog</h2>
          <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
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
