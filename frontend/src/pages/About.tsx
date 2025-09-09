import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Github, Linkedin, Mail, Code, Database, Mic, Zap, Shield, Cpu } from "lucide-react";

const techStack = [
  { name: "React", category: "Frontend", description: "Modern UI library for building interactive interfaces" },
  { name: "TypeScript", category: "Language", description: "Type-safe JavaScript for better development experience" },
  { name: "Tailwind CSS", category: "Styling", description: "Utility-first CSS framework for rapid UI development" },
  { name: "Vite", category: "Build Tool", description: "Fast build tool and development server" },
  { name: "Supabase", category: "Backend", description: "Open-source Firebase alternative for authentication & database" },
  { name: "FastAPI", category: "Backend", description: "High-performance Python web framework for APIs" },
  { name: "Local LLM", category: "AI", description: "Quantized language models for question generation" },
  { name: "Whisper", category: "Speech", description: "OpenAI's speech recognition model" },
  { name: "TTS Engine", category: "Speech", description: "Text-to-speech for reading questions aloud" }
];

const features = [
  {
    icon: Brain,
    title: "AI-Powered Questions",
    description: "Dynamic interview questions generated using quantized local language models"
  },
  {
    icon: Mic,
    title: "Voice Practice",
    description: "Speech-to-text input and text-to-speech output for realistic interview simulation"
  },
  {
    icon: Zap,
    title: "Real-time Analysis",
    description: "Instant feedback on fluency, tone, grammar, and content quality"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "All processing happens locally - your data never leaves your device"
  },
  {
    icon: Database,
    title: "Progress Tracking",
    description: "Comprehensive analytics and progress visualization over time"
  },
  {
    icon: Cpu,
    title: "Offline Ready",
    description: "Optimized for consumer hardware - works without internet connection"
  }
];

const team = [
  {
    name: "Development Team",
    role: "Full-Stack Development",
    description: "Passionate about creating tools that help people succeed in their careers",
    avatar: "👥"
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            About AI Interview Coach
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A fully local, privacy-first interview preparation platform powered by cutting-edge AI technology
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-12 bg-gradient-card border-border">
          <CardHeader className="text-center">
            <Brain className="w-16 h-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We believe everyone deserves the opportunity to showcase their best self in interviews. 
              Our AI-powered platform provides personalized, accessible, and private interview preparation 
              that runs entirely on your device, ensuring your practice sessions remain completely confidential.
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="bg-gradient-card border-border hover:border-primary transition-all duration-300 group">
                  <CardHeader>
                    <IconComponent className="w-12 h-12 text-primary mb-4 group-hover:text-accent transition-colors" />
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Technology Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((tech, index) => (
              <Card key={index} className="bg-gradient-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{tech.name}</CardTitle>
                    <Badge variant="secondary">{tech.category}</Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {tech.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Architecture Highlights */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Architecture Highlights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-6 h-6 text-primary" />
                  Frontend Architecture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• React 18 with TypeScript for type safety</li>
                  <li>• Responsive design with Tailwind CSS</li>
                  <li>• Component-based architecture with shadcn/ui</li>
                  <li>• React Router for seamless navigation</li>
                  <li>• Optimized for performance and accessibility</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-6 h-6 text-primary" />
                  Backend & AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Python FastAPI for high-performance APIs</li>
                  <li>• Quantized local LLMs for question generation</li>
                  <li>• Whisper for speech-to-text processing</li>
                  <li>• Local TTS engines for question narration</li>
                  <li>• Supabase for secure data persistence</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Privacy & Performance */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  Privacy First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Your interview practice data never leaves your device. All AI processing, 
                  speech recognition, and text-to-speech happen locally.
                </p>
                <ul className="space-y-1 text-sm">
                  <li>• Zero data transmission to external servers</li>
                  <li>• Local model inference only</li>
                  <li>• Secure authentication via Supabase</li>
                  <li>• Complete control over your data</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-primary" />
                  Performance Optimized
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Designed to run efficiently on consumer hardware without requiring 
                  expensive cloud services or high-end GPUs.
                </p>
                <ul className="space-y-1 text-sm">
                  <li>• Quantized models for faster inference</li>
                  <li>• Optimized for laptops with RTX 4050+</li>
                  <li>• Efficient memory usage</li>
                  <li>• No ongoing operational costs</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Development Team */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Development Team</h2>
          <div className="max-w-md mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="bg-gradient-card border-border text-center">
                <CardHeader>
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-primary">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact & Links */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button variant="outline" className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              GitHub Repository
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact Us
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Documentation
            </Button>
          </div>
          
          <div className="mt-8 p-6 bg-secondary/20 rounded-lg">
            <p className="text-sm text-muted-foreground">
              This platform is built with ❤️ for the developer community. 
              Open-source, privacy-focused, and designed to help you succeed.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}