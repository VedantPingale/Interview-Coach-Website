import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { TrendingUp, Calendar, Clock, Award, Target, Mic, MessageSquare, Star } from "lucide-react";

// Mock data for demonstration
const mockProgressData = {
  totalSessions: 12,
  averageScore: 78,
  improvementRate: 15,
  streakDays: 7,
  recentSessions: [
    {
      id: 1,
      date: "2024-01-15",
      domain: "Tech & Engineering",
      specialization: "Frontend Development",
      score: 82,
      duration: "18 mins",
      questionsAnswered: 10,
      strengths: ["Clear communication", "Technical accuracy"],
      improvements: ["Speaking pace", "Body language"]
    },
    {
      id: 2,
      date: "2024-01-12",
      domain: "Business & Management",
      specialization: "Product Management",
      score: 75,
      duration: "16 mins", 
      questionsAnswered: 10,
      strengths: ["Strategic thinking", "Problem solving"],
      improvements: ["Confidence", "Examples clarity"]
    },
    {
      id: 3,
      date: "2024-01-10",
      domain: "Tech & Engineering",
      specialization: "Backend Development",
      score: 68,
      duration: "20 mins",
      questionsAnswered: 9,
      strengths: ["Technical knowledge"],
      improvements: ["Communication clarity", "Answer structure"]
    }
  ],
  skillBreakdown: {
    fluency: 85,
    tone: 72,
    grammar: 90,
    contentQuality: 78
  }
};

export default function Progress() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Your Progress Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your interview skills improvement over time
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-border text-center">
            <CardHeader className="pb-2">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-2xl">{mockProgressData.totalSessions}</CardTitle>
              <CardDescription>Total Sessions</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-card border-border text-center">
            <CardHeader className="pb-2">
              <Award className="w-8 h-8 text-accent mx-auto mb-2" />
              <CardTitle className="text-2xl">{mockProgressData.averageScore}%</CardTitle>
              <CardDescription>Average Score</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-card border-border text-center">
            <CardHeader className="pb-2">
              <TrendingUp className="w-8 h-8 text-cyan mx-auto mb-2" />
              <CardTitle className="text-2xl">+{mockProgressData.improvementRate}%</CardTitle>
              <CardDescription>Improvement Rate</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-card border-border text-center">
            <CardHeader className="pb-2">
              <Star className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-2xl">{mockProgressData.streakDays}</CardTitle>
              <CardDescription>Day Streak</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Skills Breakdown */}
        <Card className="mb-8 bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Skills Analysis
            </CardTitle>
            <CardDescription>
              Your performance across different evaluation criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(mockProgressData.skillBreakdown).map(([skill, score]) => (
                <div key={skill} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="capitalize font-medium">{skill.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-sm text-muted-foreground">{score}%</span>
                  </div>
                  <ProgressBar value={score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card className="mb-8 bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              Recent Interview Sessions
            </CardTitle>
            <CardDescription>
              Detailed breakdown of your latest practice sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockProgressData.recentSessions.map((session) => (
                <div key={session.id} className="border border-border rounded-lg p-6 bg-secondary/20">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{session.domain}</h3>
                      <p className="text-muted-foreground">{session.specialization}</p>
                      <p className="text-sm text-muted-foreground">{session.date}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                      <Badge variant={session.score >= 80 ? "default" : session.score >= 70 ? "secondary" : "outline"}>
                        {session.score}% Score
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {session.duration}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-green-400">Strengths</h4>
                      <ul className="space-y-1">
                        {session.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-cyan">Areas for Improvement</h4>
                      <ul className="space-y-1">
                        {session.improvements.map((improvement, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-cyan rounded-full"></div>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Note */}
        <Card className="bg-secondary/50 border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Connect to Supabase for Data Persistence</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This page shows sample progress data. To store and track real interview sessions, 
                connect your project to Supabase using the native integration.
              </p>
              <Button variant="outline" className="mt-2">
                Learn More About Supabase Integration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}