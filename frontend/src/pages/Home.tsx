import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Mic, Target, TrendingUp, Zap, Shield, Users, Award } from "lucide-react";

interface HomeProps {
  isLoggedIn?: boolean;
}

export default function Home({ isLoggedIn = false }: HomeProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Master Your Interviews with AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Practice with our advanced AI interview coach. Get personalized feedback, 
              track your progress, and land your dream job.
            </p>
            
            {!isLoggedIn ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/signup">
                  <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                    Start Practicing Now
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                    Sign In
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/interviews">
                  <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                    Start Interview Practice
                  </Button>
                </Link>
                <Link to="/progress">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                    View Progress
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose AI Interview Coach?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI technology meets practical interview preparation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-border hover:border-primary transition-all duration-300 group">
              <CardHeader>
                <Brain className="w-12 h-12 text-primary mb-4 group-hover:text-accent transition-colors" />
                <CardTitle>AI-Powered Questions</CardTitle>
                <CardDescription>
                  Dynamic question generation tailored to your field and experience level
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-border hover:border-primary transition-all duration-300 group">
              <CardHeader>
                <Mic className="w-12 h-12 text-primary mb-4 group-hover:text-accent transition-colors" />
                <CardTitle>Voice Practice</CardTitle>
                <CardDescription>
                  Practice speaking with natural voice recognition and speech synthesis
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-border hover:border-primary transition-all duration-300 group">
              <CardHeader>
                <Target className="w-12 h-12 text-primary mb-4 group-hover:text-accent transition-colors" />
                <CardTitle>Detailed Analysis</CardTitle>
                <CardDescription>
                  Get comprehensive feedback on fluency, tone, grammar, and content quality
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-border hover:border-primary transition-all duration-300 group">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-primary mb-4 group-hover:text-accent transition-colors" />
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Monitor your improvement over time with detailed analytics and insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-border hover:border-primary transition-all duration-300 group">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mb-4 group-hover:text-accent transition-colors" />
                <CardTitle>100% Private</CardTitle>
                <CardDescription>
                  All processing happens locally on your device - your data never leaves
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-border hover:border-primary transition-all duration-300 group">
              <CardHeader>
                <Zap className="w-12 h-12 text-primary mb-4 group-hover:text-accent transition-colors" />
                <CardTitle>Offline Ready</CardTitle>
                <CardDescription>
                  Practice anytime, anywhere without internet connection required
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Interview Domains */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Practice for Any Field
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialized interview preparation across multiple industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "💻", title: "Tech & Engineering", desc: "Frontend, Backend, Fullstack, DevOps" },
              { icon: "💼", title: "Business & Management", desc: "Leadership, Strategy, Operations" },
              { icon: "🎨", title: "Creative & Communication", desc: "Design, Marketing, Content" },
              { icon: "🏥", title: "Specialized Fields", desc: "Healthcare, Legal, Education, Government" },
            ].map((domain, index) => (
              <Card key={index} className="text-center bg-gradient-card border-border hover:border-primary transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="text-4xl mb-4">{domain.icon}</div>
                  <CardTitle>{domain.title}</CardTitle>
                  <CardDescription>{domain.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isLoggedIn && (
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Ace Your Next Interview?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of professionals who have improved their interview skills with our AI coach
              </p>
              <Link to="/signup">
                <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}