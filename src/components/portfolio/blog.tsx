import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const Blog = () => {
  const blogPosts = [
    {
      title: 'Understanding FFT: From Theory to Implementation',
      excerpt: 'A comprehensive guide to Fast Fourier Transform, covering mathematical foundations and practical applications in signal processing.',
      date: '2024-01-15',
      readTime: '8 min read',
      tags: ['Signal Processing', 'Mathematics', 'DSP'],
      featured: true,
    },
    {
      title: 'Machine Learning in Communications: A Survey',
      excerpt: 'Exploring how machine learning techniques are revolutionizing wireless communication systems.',
      date: '2024-01-02',
      readTime: '12 min read',
      tags: ['Machine Learning', 'Communications', 'AI'],
      featured: true,
    },
    {
      title: 'Adaptive Filtering Algorithms Explained',
      excerpt: 'Deep dive into LMS, RLS, and other adaptive filtering techniques used in modern signal processing.',
      date: '2023-12-20',
      readTime: '10 min read',
      tags: ['Adaptive Filters', 'Signal Processing', 'Algorithms'],
      featured: false,
    },
    {
      title: 'MIMO Systems: Challenges and Solutions',
      excerpt: 'Understanding Multiple-Input Multiple-Output systems and their role in modern wireless communications.',
      date: '2023-12-10',
      readTime: '6 min read',
      tags: ['MIMO', 'Communications', 'Wireless'],
      featured: false,
    },
    {
      title: 'Digital Signal Processing in Python',
      excerpt: 'Practical guide to implementing DSP algorithms using Python, NumPy, and SciPy.',
      date: '2023-11-28',
      readTime: '15 min read',
      tags: ['Python', 'DSP', 'Programming'],
      featured: false,
    },
  ]

  const featuredPosts = blogPosts.filter(post => post.featured)
  const otherPosts = blogPosts.filter(post => !post.featured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
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
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
                  <CardTitle className="text-xl hover:text-primary transition-colors duration-200">
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
                  
                  <Button variant="outline" className="group">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
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
                  
                  <Button variant="ghost" size="sm" className="group p-0">
                    Read More
                    <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Posts Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="px-8">
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Blog
