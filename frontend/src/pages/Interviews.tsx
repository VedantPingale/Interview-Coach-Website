import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Briefcase, Palette, Stethoscope, Zap, Clock, Users, Award } from "lucide-react";

const interviewDomains = [
  {
    id: "tech",
    title: "Tech & Engineering",
    icon: Code,
    color: "bg-cyan text-cyan-foreground",
    description: "Technical interviews for software development roles",
    specializations: [
      "Frontend Development",
      "Backend Development", 
      "Fullstack Development",
      "DevOps & Infrastructure",
      "Mobile Development",
      "Data Engineering",
      "Machine Learning",
      "Cybersecurity"
    ]
  },
  {
    id: "business",
    title: "Business & Management",
    icon: Briefcase,
    color: "bg-accent text-accent-foreground",
    description: "Leadership and business strategy interviews",
    specializations: [
      "Product Management",
      "Project Management",
      "Sales & Marketing",
      "Business Development",
      "Operations Management",
      "Strategy Consulting",
      "Financial Analysis",
      "Human Resources"
    ]
  },
  {
    id: "creative",
    title: "Creative & Communication",
    icon: Palette,
    color: "bg-primary text-primary-foreground",
    description: "Creative roles and communication-focused positions",
    specializations: [
      "UX/UI Design",
      "Graphic Design",
      "Content Marketing",
      "Social Media",
      "Copywriting",
      "Video Production",
      "Public Relations",
      "Brand Management"
    ]
  },
  {
    id: "specialized",
    title: "Specialized Fields",
    icon: Stethoscope,
    color: "bg-secondary text-secondary-foreground",
    description: "Industry-specific professional interviews",
    specializations: [
      "Healthcare",
      "Legal Services",
      "Education",
      "Government",
      "Customer Support",
      "Research & Development",
      "Non-Profit",
      "Consulting"
    ]
  }
];

export default function Interviews() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);

  const handleStartInterview = () => {
    if (selectedDomain && selectedSpecialization) {
      // TODO: Navigate to interview session
      console.log("Starting interview:", { selectedDomain, selectedSpecialization });
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Choose Your Interview Domain
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your field and specialization to start practicing with AI-generated questions
          </p>
        </div>

        {/* Domain Selection */}
        {!selectedDomain ? (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {interviewDomains.map((domain) => {
              const IconComponent = domain.icon;
              return (
                <Card
                  key={domain.id}
                  className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-glow bg-gradient-card border-border hover:border-primary group"
                  onClick={() => setSelectedDomain(domain.id)}
                >
                  <CardHeader className="text-center">
                    <IconComponent className="w-16 h-16 text-primary mx-auto mb-4 group-hover:text-accent transition-colors" />
                    <CardTitle className="text-2xl">{domain.title}</CardTitle>
                    <CardDescription className="text-base">
                      {domain.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {domain.specializations.slice(0, 4).map((spec, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {domain.specializations.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{domain.specializations.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          /* Specialization Selection */
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedDomain(null);
                  setSelectedSpecialization(null);
                }}
                className="mb-4"
              >
                ← Back to Domains
              </Button>
              
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">
                  {interviewDomains.find(d => d.id === selectedDomain)?.title}
                </h2>
                <p className="text-muted-foreground">
                  Choose your specific area of expertise
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {interviewDomains
                .find(d => d.id === selectedDomain)
                ?.specializations.map((spec, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedSpecialization === spec
                        ? "border-primary bg-primary/10 shadow-glow"
                        : "bg-gradient-card border-border hover:border-primary"
                    }`}
                    onClick={() => setSelectedSpecialization(spec)}
                  >
                    <CardHeader className="text-center py-6">
                      <CardTitle className="text-lg">{spec}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
            </div>

            {/* Interview Configuration */}
            {selectedSpecialization && (
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-6 h-6 text-primary" />
                    Interview Configuration
                  </CardTitle>
                  <CardDescription>
                    Your interview session will include:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h3 className="font-semibold">Duration</h3>
                      <p className="text-sm text-muted-foreground">15-20 minutes</p>
                    </div>
                    <div className="text-center">
                      <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h3 className="font-semibold">Questions</h3>
                      <p className="text-sm text-muted-foreground">10 AI-generated</p>
                    </div>
                    <div className="text-center">
                      <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h3 className="font-semibold">Analysis</h3>
                      <p className="text-sm text-muted-foreground">Detailed feedback</p>
                    </div>
                  </div>

                  <div className="bg-secondary/50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold mb-2">Selected Configuration:</h4>
                    <p className="text-sm">
                      <strong>Domain:</strong> {interviewDomains.find(d => d.id === selectedDomain)?.title}
                    </p>
                    <p className="text-sm">
                      <strong>Specialization:</strong> {selectedSpecialization}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onClick={handleStartInterview}
                    >
                      Start Interview Session
                    </Button>
                    
                    <p className="text-sm text-muted-foreground text-center">
                      <strong>Note:</strong> This demo shows the UI structure. 
                      Backend integration with local AI models would be required for full functionality.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}