"use client"
import { useAuth, useClerk } from '@clerk/clerk-react';
import Constant from '../_utils/Constant';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Github, Upload, Shield, Share2, Zap, Lock, Users, Star, Check } from 'lucide-react';

const Hero = () => {
  const { isSignedIn } = useAuth();
  const { redirectToSignIn } = useClerk();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = () => {
    setLoading(true);
    if (isSignedIn) {
      router.push('/upload');
    } else {
      redirectToSignIn({ redirectUrl: '/upload' });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="container relative">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
          <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
            🎉{" "}
            <span className="ml-1 hidden md:block">
              Introducing Share Panda v2.0
            </span>
          </div>
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Upload, Save & Share <br className="hidden sm:inline" />
            your files securely
          </h1>
          <span className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
            {Constant.desc}
          </span>
          <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
            <button
              onClick={handleGetStarted}
              disabled={loading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            >
              {loading ? "Loading..." : "Get Started"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </button>
          </div>
        </div>
        
        {/* Hero Image/Demo Section */}
        <div className="relative mx-auto max-w-5xl mb-20">
          <div className="overflow-hidden rounded-lg border bg-background shadow-2xl">
            <div className="flex h-[400px] items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
              <div className="text-center space-y-4">
                <div className="mx-auto w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
                  <Upload className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-muted-foreground">
                  Upload & Share Files
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Drag and drop your files here or click to browse
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <div className="mx-auto max-w-[980px]">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Everything you need to share files
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-[600px] mx-auto">
              Secure, fast, and reliable file sharing with advanced features for teams and individuals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Upload and share files in seconds with our optimized infrastructure.
              </p>
            </div>
            <div className="text-center group">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                End-to-end encryption and password protection for your sensitive files.
              </p>
            </div>
            <div className="text-center group">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <Share2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
              <p className="text-muted-foreground">
                Generate shareable links instantly and control access permissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-20">
        <div className="container">
          <div className="mx-auto max-w-[980px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Files Uploaded</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">5K+</div>
                <div className="text-muted-foreground">Happy Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-20">
        <div className="mx-auto max-w-[980px]">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              What our users say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                &quot;Share Panda makes file sharing incredibly easy. The interface is clean and the upload speed is amazing.&quot;
              </p>
              <div className="font-semibold">Sarah Johnson</div>
              <div className="text-sm text-muted-foreground">Designer</div>
            </div>
            <div className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                &quot;Perfect for our team collaboration. Password protection gives us peace of mind for sensitive documents.&quot;
              </p>
              <div className="font-semibold">Mike Chen</div>
              <div className="text-sm text-muted-foreground">Developer</div>
            </div>
            <div className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                &quot;The short URLs feature is a game changer. I can share files with clients so easily now.&quot;
              </p>
              <div className="font-semibold">Emily Davis</div>
              <div className="text-sm text-muted-foreground">Marketing Manager</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container">
          <div className="mx-auto max-w-[600px] text-center text-primary-foreground">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
              Ready to get started?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Join thousands of users who trust Share Panda for their file sharing needs.
            </p>
            <button
              onClick={handleGetStarted}
              disabled={loading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background text-foreground hover:bg-background/90 h-11 px-8"
            >
              {loading ? "Loading..." : "Start Sharing Files"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="mx-auto max-w-[980px] grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Upload</li>
                <li>Share</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact</li>
                <li>Status</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Cookies</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Share Panda. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Hero