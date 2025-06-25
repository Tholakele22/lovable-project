import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { HeroSection } from "@/components/HeroSection";
import { SubjectInput } from "@/components/SubjectInput";
import { APSDisplay } from "@/components/APSDisplay";
import { defaultSubjects, Subject, calculateAPS } from "@/utils/apsCalculator";
import { ArrowLeft, Download, Share2, BookOpen, University } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState<'hero' | 'calculator' | 'results'>('hero');
  const [subjects, setSubjects] = useState<Subject[]>(defaultSubjects);
  const [loading, setLoading] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('matricData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSubjects(data.subjects || defaultSubjects);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('matricData', JSON.stringify({ subjects }));
  }, [subjects]);

  const handleSubjectChange = (index: number, value: string) => {
    const newSubjects = [...subjects];
    const parsedValue = parseInt(value, 10);
    
    if (value === '' || (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100)) {
      newSubjects[index].mark = value;
      setSubjects(newSubjects);
    }
  };

  const handleCalculateAPS = () => {
    const filledSubjects = subjects.filter(s => s.mark !== '');
    
    if (filledSubjects.length < 6) {
      toast({
        title: "Incomplete Information",
        description: "Please enter at least 6 subject marks to calculate your APS.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate loading time for better UX
    setTimeout(() => {
      setCurrentView('results');
      setLoading(false);
      toast({
        title: "APS Calculated Successfully!",
        description: `Your APS score is ${calculateAPS(subjects)}. Check out your personalized recommendations.`,
      });
    }, 1000);
  };

  const handleGetStarted = () => {
    setCurrentView('calculator');
  };

  const handleBackToCalculator = () => {
    setCurrentView('calculator');
  };

  const handleBackToHero = () => {
    setCurrentView('hero');
  };

  if (currentView === 'hero') {
    return <HeroSection onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={currentView === 'results' ? handleBackToCalculator : handleBackToHero}
              className="flex items-center gap-2 text-academic-blue hover:text-academic-blue-light"
            >
              <ArrowLeft className="w-4 h-4" />
              {currentView === 'results' ? 'Back to Calculator' : 'Back to Home'}
            </Button>
            
            <h1 className="text-xl font-bold text-academic-navy">
              Matric Application Assistant
            </h1>
            
            <div className="flex items-center gap-2">
              {currentView === 'results' && (
                <>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {currentView === 'calculator' && (
          <div className="space-y-8">
            <SubjectInput
              subjects={subjects}
              onSubjectChange={handleSubjectChange}
            />
            
            <div className="text-center">
              <Button
                onClick={handleCalculateAPS}
                disabled={loading}
                size="lg"
                className="academic-gradient text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Calculating APS...
                  </div>
                ) : (
                  'Calculate My APS Score'
                )}
              </Button>
            </div>
          </div>
        )}

        {currentView === 'results' && (
          <div className="space-y-8">
            <APSDisplay subjects={subjects} />
            
            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="courses" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Course Suggestions
                </TabsTrigger>
                <TabsTrigger value="universities" className="flex items-center gap-2">
                  <University className="w-4 h-4" />
                  University Options
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="courses" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Recommended Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Placeholder course suggestions - will be enhanced with AI later */}
                      <CourseCard
                        title="Computer Science"
                        description="Build software applications and work with cutting-edge technology"
                        requirements="Mathematics and Physical Sciences required"
                        apsRequired={30}
                        currentAps={calculateAPS(subjects)}
                      />
                      <CourseCard
                        title="Business Administration"
                        description="Learn business management and entrepreneurship skills"
                        requirements="Mathematics and any commercial subject"
                        apsRequired={26}
                        currentAps={calculateAPS(subjects)}
                      />
                      <CourseCard
                        title="Engineering"
                        description="Design and build solutions to real-world problems"
                        requirements="Mathematics and Physical Sciences (70%+)"
                        apsRequired={35}
                        currentAps={calculateAPS(subjects)}
                      />
                      <CourseCard
                        title="Education"
                        description="Shape the future by teaching and inspiring students"
                        requirements="Two teaching subjects"
                        apsRequired={24}
                        currentAps={calculateAPS(subjects)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="universities" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">University Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Placeholder university suggestions */}
                      <UniversityCard
                        name="University of Cape Town"
                        location="Cape Town, South Africa"
                        ranking="Top 1 in Africa"
                        minAps={32}
                        currentAps={calculateAPS(subjects)}
                      />
                      <UniversityCard
                        name="University of the Witwatersrand"
                        location="Johannesburg, South Africa"
                        ranking="Top 3 in Africa"
                        minAps={30}
                        currentAps={calculateAPS(subjects)}
                      />
                      <UniversityCard
                        name="Stellenbosch University"
                        location="Stellenbosch, South Africa"
                        ranking="Top 5 in Africa"
                        minAps={28}
                        currentAps={calculateAPS(subjects)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

// Course Card Component
function CourseCard({ 
  title, 
  description, 
  requirements, 
  apsRequired, 
  currentAps 
}: {
  title: string;
  description: string;
  requirements: string;
  apsRequired: number;
  currentAps: number;
}) {
  const isEligible = currentAps >= apsRequired;
  
  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${isEligible ? 'border-academic-success' : 'border-gray-200'}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <Badge 
            className={isEligible ? 'bg-academic-success' : 'bg-gray-500'}
          >
            {isEligible ? 'Eligible' : 'Not Eligible'}
          </Badge>
        </div>
        
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">APS Required:</span>
            <span className="font-medium">{apsRequired}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Your APS:</span>
            <span className={`font-medium ${isEligible ? 'text-academic-success' : 'text-red-500'}`}>
              {currentAps}
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-3">{requirements}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// University Card Component
function UniversityCard({
  name,
  location,
  ranking,
  minAps,
  currentAps
}: {
  name: string;
  location: string;
  ranking: string;
  minAps: number;
  currentAps: number;
}) {
  const isEligible = currentAps >= minAps;
  
  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${isEligible ? 'border-academic-success' : 'border-gray-200'}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
          <Badge 
            className={isEligible ? 'bg-academic-success' : 'bg-gray-500'}
          >
            {isEligible ? 'Eligible' : 'Reach'}
          </Badge>
        </div>
        
        <p className="text-sm text-academic-gold font-medium mb-4">{ranking}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Min APS:</span>
            <span className="font-medium">{minAps}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Your APS:</span>
            <span className={`font-medium ${isEligible ? 'text-academic-success' : 'text-red-500'}`}>
              {currentAps}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Index;
