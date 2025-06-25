
export interface Subject {
  name: string;
  mark: string;
  required?: boolean;
  category?: 'language' | 'mathematics' | 'science' | 'commerce' | 'humanities' | 'creative' | 'technical' | 'other';
}

export const defaultSubjects: Subject[] = [
  // Required Core Subjects
  { name: 'Home Language', mark: '', required: true, category: 'language' },
  { name: 'First Additional Language', mark: '', required: true, category: 'language' },
  { name: 'Life Orientation', mark: '', required: false, category: 'other' },
  
  // Mathematics
  { name: 'Mathematics', mark: '', category: 'mathematics' },
  { name: 'Mathematical Literacy', mark: '', category: 'mathematics' },
  
  // Sciences
  { name: 'Physical Sciences', mark: '', category: 'science' },
  { name: 'Life Sciences', mark: '', category: 'science' },
  { name: 'Agricultural Sciences', mark: '', category: 'science' },
  
  // Commercial Subjects
  { name: 'Accounting', mark: '', category: 'commerce' },
  { name: 'Business Studies', mark: '', category: 'commerce' },
  { name: 'Economics', mark: '', category: 'commerce' },
  
  // Humanities
  { name: 'History', mark: '', category: 'humanities' },
  { name: 'Geography', mark: '', category: 'humanities' },
  
  // Languages
  { name: 'Afrikaans', mark: '', category: 'language' },
  { name: 'isiZulu', mark: '', category: 'language' },
  { name: 'isiXhosa', mark: '', category: 'language' },
  { name: 'Sepedi', mark: '', category: 'language' },
  { name: 'Setswana', mark: '', category: 'language' },
  { name: 'Sesotho', mark: '', category: 'language' },
  { name: 'Xitsonga', mark: '', category: 'language' },
  { name: 'siSwati', mark: '', category: 'language' },
  { name: 'Tshivenda', mark: '', category: 'language' },
  { name: 'isiNdebele', mark: '', category: 'language' },
  { name: 'English', mark: '', category: 'language' },
  
  // Creative Arts
  { name: 'Visual Arts', mark: '', category: 'creative' },
  { name: 'Dramatic Arts', mark: '', category: 'creative' },
  { name: 'Music', mark: '', category: 'creative' },
  { name: 'Dance Studies', mark: '', category: 'creative' },
  { name: 'Design', mark: '', category: 'creative' },
  
  // Technical Subjects
  { name: 'Information Technology', mark: '', category: 'technical' },
  { name: 'Computer Applications Technology', mark: '', category: 'technical' },
  { name: 'Engineering Graphics and Design', mark: '', category: 'technical' },
  { name: 'Civil Technology', mark: '', category: 'technical' },
  { name: 'Mechanical Technology', mark: '', category: 'technical' },
  { name: 'Electrical Technology', mark: '', category: 'technical' },
  
  // Consumer Studies
  { name: 'Consumer Studies', mark: '', category: 'other' },
  { name: 'Hospitality Studies', mark: '', category: 'other' },
  { name: 'Tourism', mark: '', category: 'other' },
  
  // Religion Studies
  { name: 'Religion Studies', mark: '', category: 'other' },
];

export function calculateAPS(subjects: Subject[]): number {
  let totalAps = 0;
  
  subjects.forEach(subject => {
    const mark = parseInt(subject.mark, 10);
    if (!isNaN(mark) && mark >= 0 && mark <= 100) {
      // Exclude Life Orientation from APS calculation (common practice)
      if (subject.name === 'Life Orientation') return;
      
      if (mark >= 90) totalAps += 8;
      else if (mark >= 80) totalAps += 7;
      else if (mark >= 70) totalAps += 6;
      else if (mark >= 60) totalAps += 5;
      else if (mark >= 50) totalAps += 4;
      else if (mark >= 40) totalAps += 3;
      else if (mark >= 30) totalAps += 2;
      else totalAps += 1;
    }
  });
  
  return totalAps;
}

export function getAPSLevel(aps: number): {
  level: string;
  color: string;
  description: string;
} {
  if (aps >= 40) {
    return {
      level: 'Excellent',
      color: 'success',
      description: 'Outstanding performance! You qualify for most university programs.'
    };
  } else if (aps >= 30) {
    return {
      level: 'Good',
      color: 'gold',
      description: 'Good performance! You qualify for many university programs.'
    };
  } else if (aps >= 24) {
    return {
      level: 'Average',
      color: 'blue',
      description: 'Average performance. You qualify for several programs.'
    };
  } else {
    return {
      level: 'Needs Improvement',
      color: 'orange',
      description: 'Consider improving your marks or exploring alternative pathways.'
    };
  }
}

export function validateMark(mark: string): boolean {
  const num = parseInt(mark, 10);
  return !isNaN(num) && num >= 0 && num <= 100;
}

export function getSubjectIcon(category: string): string {
  switch (category) {
    case 'language': return '📚';
    case 'mathematics': return '🔢';
    case 'science': return '🔬';
    case 'commerce': return '💼';
    case 'humanities': return '🌍';
    case 'creative': return '🎨';
    case 'technical': return '⚙️';
    default: return '📖';
  }
}
