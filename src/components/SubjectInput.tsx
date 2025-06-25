
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertCircle, Plus, X } from "lucide-react";
import { Subject, validateMark, getSubjectIcon, defaultSubjects } from "@/utils/apsCalculator";

interface SubjectInputProps {
  subjects: Subject[];
  onSubjectChange: (index: number, value: string) => void;
}

export function SubjectInput({ subjects, onSubjectChange }: SubjectInputProps) {
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>(
    subjects.length > 0 ? subjects : defaultSubjects.slice(0, 7) // Start with first 7 subjects
  );
  const [availableSubjects] = useState<Subject[]>(defaultSubjects);

  const addSubject = (subject: Subject) => {
    if (!selectedSubjects.find(s => s.name === subject.name)) {
      const newSubjects = [...selectedSubjects, { ...subject, mark: '' }];
      setSelectedSubjects(newSubjects);
      // Update parent component
      updateParentSubjects(newSubjects);
    }
  };

  const removeSubject = (index: number) => {
    const newSubjects = selectedSubjects.filter((_, i) => i !== index);
    setSelectedSubjects(newSubjects);
    updateParentSubjects(newSubjects);
  };

  const handleMarkChange = (index: number, value: string) => {
    const newSubjects = [...selectedSubjects];
    const parsedValue = parseInt(value, 10);
    
    if (value === '' || (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100)) {
      newSubjects[index].mark = value;
      setSelectedSubjects(newSubjects);
      updateParentSubjects(newSubjects);
      onSubjectChange(index, value);
    }
  };

  const updateParentSubjects = (newSubjects: Subject[]) => {
    // This ensures the parent component stays in sync
    newSubjects.forEach((subject, index) => {
      onSubjectChange(index, subject.mark);
    });
  };

  const getSubjectsByCategory = (category: string) => {
    return availableSubjects.filter(subject => subject.category === category);
  };

  const categories = [
    { id: 'language', name: 'Languages', icon: '📚' },
    { id: 'mathematics', name: 'Mathematics', icon: '🔢' },
    { id: 'science', name: 'Sciences', icon: '🔬' },
    { id: 'commerce', name: 'Commerce', icon: '💼' },
    { id: 'humanities', name: 'Humanities', icon: '🌍' },
    { id: 'creative', name: 'Creative Arts', icon: '🎨' },
    { id: 'technical', name: 'Technical', icon: '⚙️' },
    { id: 'other', name: 'Other', icon: '📖' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Enter Your Matric Results</h2>
        <p className="text-gray-600 text-lg">
          Select your subjects and input your final matric marks to calculate your APS score.
        </p>
      </div>
      
      {/* Selected Subjects */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Selected Subjects ({selectedSubjects.length})</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {selectedSubjects.map((subject, index) => {
            const isValid = subject.mark === '' || validateMark(subject.mark);
            const hasValue = subject.mark !== '';
            const mark = parseInt(subject.mark, 10);
            
            return (
              <Card key={index} className="subject-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getSubjectIcon(subject.category || 'other')}</span>
                      <Label htmlFor={`subject-${index}`} className="text-sm font-medium text-gray-700">
                        {subject.name}
                      </Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {subject.required && (
                        <Badge variant="secondary" className="text-xs">
                          Required
                        </Badge>
                      )}
                      {!subject.required && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSubject(index)}
                          className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                      {hasValue && isValid && (
                        <CheckCircle className="w-4 h-4 text-academic-success" />
                      )}
                      {hasValue && !isValid && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  
                  <Input
                    id={`subject-${index}`}
                    type="number"
                    value={subject.mark}
                    onChange={(e) => handleMarkChange(index, e.target.value)}
                    placeholder="Enter mark (0-100)"
                    min="0"
                    max="100"
                    className={`text-center text-lg font-semibold transition-all duration-200 ${
                      hasValue && isValid
                        ? 'border-academic-success bg-academic-success-lighter'
                        : hasValue && !isValid
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300'
                    }`}
                  />
                  
                  {hasValue && isValid && !isNaN(mark) && (
                    <div className="mt-2 text-center">
                      <Badge 
                        variant="secondary" 
                        className={`${
                          mark >= 80 
                            ? 'bg-academic-success text-white' 
                            : mark >= 60 
                            ? 'bg-academic-gold text-white'
                            : 'bg-gray-500 text-white'
                        }`}
                      >
                        {mark >= 80 ? 'Excellent' : mark >= 60 ? 'Good' : 'Pass'}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Add More Subjects */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add More Subjects
          </h3>
          
          <Tabs defaultValue="language" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  <span className="mr-1">{category.icon}</span>
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-4">
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {getSubjectsByCategory(category.id).map((subject) => {
                    const isSelected = selectedSubjects.find(s => s.name === subject.name);
                    return (
                      <Button
                        key={subject.name}
                        variant={isSelected ? "secondary" : "outline"}
                        onClick={() => addSubject(subject)}
                        disabled={!!isSelected}
                        className="justify-start h-auto p-3 text-left"
                      >
                        <span className="mr-2">{getSubjectIcon(subject.category || 'other')}</span>
                        <span className="text-sm">{subject.name}</span>
                        {isSelected && <CheckCircle className="w-4 h-4 ml-auto text-green-600" />}
                      </Button>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
