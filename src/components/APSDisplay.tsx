
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, TrendingUp } from "lucide-react";
import { calculateAPS, getAPSLevel, Subject } from "@/utils/apsCalculator";

interface APSDisplayProps {
  subjects: Subject[];
}

export function APSDisplay({ subjects }: APSDisplayProps) {
  const aps = calculateAPS(subjects);
  const level = getAPSLevel(aps);
  const progressPercentage = Math.min((aps / 56) * 100, 100); // Max theoretical APS is 56 (7 subjects × 8 points)
  
  return (
    <div className="space-y-6">
      {/* Main APS Score Display */}
      <Card className="bg-gradient-to-br from-academic-blue to-academic-blue-light text-white border-0 shadow-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <Trophy className="w-8 h-8 text-academic-gold" />
            Your APS Score
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="aps-circle mx-auto mb-6 bg-gradient-to-br from-academic-gold to-academic-gold-light">
            <span className="text-4xl font-bold">{aps}</span>
          </div>
          
          <div className="space-y-4">
            <Badge 
              className={`text-lg px-4 py-2 ${
                level.color === 'success' 
                  ? 'bg-academic-success hover:bg-academic-success'
                  : level.color === 'gold'
                  ? 'bg-academic-gold hover:bg-academic-gold'
                  : level.color === 'blue'
                  ? 'bg-academic-blue-light hover:bg-academic-blue-light'
                  : 'bg-orange-500 hover:bg-orange-500'
              }`}
            >
              {level.level}
            </Badge>
            
            <p className="text-white/90 text-lg">{level.description}</p>
            
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white/80">Progress to Maximum APS</span>
                <span className="text-sm text-white/80">{aps}/56</span>
              </div>
              <Progress 
                value={progressPercentage} 
                className="h-3 bg-white/20"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* APS Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-academic-blue" />
              Subject Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subjects
                .filter(s => s.mark !== '' && s.name !== 'Life Orientation')
                .map((subject, index) => {
                  const mark = parseInt(subject.mark, 10);
                  let points = 0;
                  if (mark >= 90) points = 8;
                  else if (mark >= 80) points = 7;
                  else if (mark >= 70) points = 6;
                  else if (mark >= 60) points = 5;
                  else if (mark >= 50) points = 4;
                  else if (mark >= 40) points = 3;
                  else if (mark >= 30) points = 2;
                  else points = 1;
                  
                  return (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-sm font-medium text-gray-700">{subject.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{mark}%</span>
                        <Badge variant="secondary" className="text-xs">
                          {points} pts
                        </Badge>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-academic-success" />
              University Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm">Most Universities</span>
                <Badge className="bg-academic-success">24+ APS</Badge>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm">Competitive Programs</span>
                <Badge className="bg-academic-gold">30+ APS</Badge>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm">Top Universities</span>
                <Badge className="bg-academic-blue">35+ APS</Badge>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm">Medical/Engineering</span>
                <Badge className="bg-purple-500">40+ APS</Badge>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">
                <strong>Note:</strong> Requirements vary by university and program. 
                Always check specific admission requirements.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
