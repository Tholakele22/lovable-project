
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Calculator, Search, Trophy } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center academic-gradient text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Main Hero Content */}
        <div className="animate-fade-in">
          <div className="flex justify-center mb-6">
            <GraduationCap className="w-20 h-20 text-academic-gold animate-pulse-scale" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-academic-gold-lighter bg-clip-text text-transparent">
            Your University Journey Starts Here
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Calculate your APS score, discover perfect courses, and find universities that match your academic achievements. 
            Make informed decisions about your future with our intelligent matriculation assistant.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-academic-gold hover:bg-academic-gold-light text-academic-navy font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Calculate My APS Score
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 py-4 px-8 rounded-xl text-lg transition-all duration-300 backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 animate-slide-in-right">
          <Card className="glass-morphism border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Calculator className="w-12 h-12 mx-auto mb-4 text-academic-gold" />
              <h3 className="text-xl font-semibold mb-2">APS Calculator</h3>
              <p className="text-white/80">Instantly calculate your Admission Point Score with our accurate calculator.</p>
            </CardContent>
          </Card>
          
          <Card className="glass-morphism border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Search className="w-12 h-12 mx-auto mb-4 text-academic-gold" />
              <h3 className="text-xl font-semibold mb-2">Course Finder</h3>
              <p className="text-white/80">Discover courses that match your interests and academic performance.</p>
            </CardContent>
          </Card>
          
          <Card className="glass-morphism border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-academic-gold" />
              <h3 className="text-xl font-semibold mb-2">University Match</h3>
              <p className="text-white/80">Find universities worldwide that accept your qualifications.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
