const fs = require('fs');
const path = require('path');

// Files that need escape character fixes based on the error log
const filesToFix = [
  'src/App.js',
  'src/questions/boardexam/boardexam-care-planning-and-documentation.js',
  'src/questions/boardexam/boardexam-clinical-environment-and-ergonomics.js',
  'src/questions/boardexam/boardexam-community-and-public-health.js',
  'src/questions/boardexam/boardexam-infection-control-and-safety.js',
  'src/questions/boardexam/boardexam-instrumentation-and-clinical-procedures.js',
  'src/questions/boardexam/boardexam-medical-conditions-and-systemic-diseases.js',
  'src/questions/boardexam/boardexam-mental-health-and-well-being.js',
  'src/questions/boardexam/boardexam-oral-assessment-and-diagnosis.js',
  'src/questions/boardexam/boardexam-pain-and-anxiety-management.js',
  'src/questions/boardexam/boardexam-patient-assessment-and-health-history.js',
  'src/questions/boardexam/boardexam-periodontal-therapy.js',
  'src/questions/boardexam/boardexam-preventive-care-and-patient-education.js',
  'src/questions/boardexam/boardexam-professional-practice-and-foundations.js',
  'src/questions/boardexam/boardexam-restorative-and-specialty-care.js',
  'src/questions/boardexam/boardexam-special-populations.js',
  'src/questions/index.js',
  'src/questions/lesson1/lesson1-dental-hygiene-theory-i.js',
  'src/questions/lesson1/lesson1-introduction-to-statistics-and-research.js',
  'src/questions/lesson1/lesson1-microbiology.js',
  'src/questions/lesson2/lesson2-head-and-neck-anatomy.js'
];

function fixFile(filePath) {
  console.log(`Processing: ${filePath}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix unnecessary escape characters - replace \' with '
    // Only replace when it's within strings
    const originalContent = content;
    content = content.replace(/\\'/g, "'");
    
    if (content !== originalContent) {
      modified = true;
      console.log(`  ✓ Fixed escape characters in ${filePath}`);
    }

    // Special fixes for App.js
    if (filePath.includes('App.js')) {
      // Comment out unused variables instead of removing them
      // This preserves the code structure in case they're needed later
      
      // Fix unused variables by commenting them out
      content = content.replace(
        /const \[showReview, setShowReview\] = useState\(false\);/,
        '// const [showReview, setShowReview] = useState(false);'
      );
      
      content = content.replace(
        /const \[shuffledQuestionPool, setShuffledQuestionPool\] = useState\(\[\]\);/,
        '// const [shuffledQuestionPool, setShuffledQuestionPool] = useState([]);'
      );
      
      content = content.replace(
        /const \[currentPoolIndex, setCurrentPoolIndex\] = useState\(0\);/,
        '// const [currentPoolIndex, setCurrentPoolIndex] = useState(0);'
      );
      
      content = content.replace(
        /const \[currentTopicKey, setCurrentTopicKey\] = useState\(null\);/,
        '// const [currentTopicKey, setCurrentTopicKey] = useState(null);'
      );

      modified = true;
      console.log(`  ✓ Fixed unused variables in App.js`);
    }

    // Special fixes for src/questions/index.js
    if (filePath.includes('questions/index.js')) {
      // Comment out unused imports
      const unusedImports = [
        'boardexam2ProfessionalFoundationsQuestions',
        'boardexam2InfectionControlQuestions',
        'boardexam2ClinicalEnvironmentQuestions',
        'boardexam2PatientAssessmentQuestions',
        'boardexam2ImagingDiagnosticQuestions',
        'boardexam2OralAnatomyQuestions',
        'boardexam2PeriodontalAssessmentQuestions',
        'boardexam2CarePlanningQuestions',
        'boardexam2PreventiveCareQuestions',
        'boardexam2InstrumentationQuestions',
        'boardexam2PainAnxietyQuestions',
        'boardexam2SpecialOralCareQuestions',
        'boardexam2SpecialPopulationsQuestions',
        'boardexam2MedicalConditionsQuestions'
      ];

      unusedImports.forEach(importName => {
        const regex = new RegExp(`import ${importName}.*?;`, 'g');
        content = content.replace(regex, (match) => `// ${match}`);
      });

      modified = true;
      console.log(`  ✓ Fixed unused imports in index.js`);
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✓ Saved ${filePath}`);
    } else {
      console.log(`  - No changes needed for ${filePath}`);
    }

  } catch (error) {
    console.error(`  ✗ Error processing ${filePath}:`, error.message);
  }
}

console.log('Starting ESLint error fixes...\n');

filesToFix.forEach(fixFile);

console.log('\n✓ All files processed!');
console.log('\nNext steps:');
console.log('1. Review the changes');
console.log('2. Test locally with: npm run build');
console.log('3. Commit and push to GitHub');
