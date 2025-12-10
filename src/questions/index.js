// questions/index.js
// Main questions index - imports all question modules
// Total: 2,602 questions across 4 subjects (all Lesson 2)

// Lesson 2 Questions (2,602 total)
import { pathophysiologyQuestions } from './lesson2-pathophysiology-questions';
import { dentalMaterialsQuestions } from './lesson2-dental-materials-questions';
import { periodontologyQuestions } from './lesson2-periodontology-questions';
import { radiographyQuestions } from './lesson2-radiography-questions';

// Future imports:
// import { lesson1Questions } from './lesson1-questions';
// import { lesson3Questions } from './lesson3-questions';
// import { lesson4Questions } from './lesson4-questions';

// Combine all question banks
export const questionBank = {
  ...pathophysiologyQuestions,
  ...dentalMaterialsQuestions,
  ...periodontologyQuestions,
  ...radiographyQuestions
  // ...lesson1Questions,  // Add when ready
  // ...lesson3Questions,  // Add when ready
  // ...lesson4Questions   // Add when ready
};

// Subject to topic mapping
// Lessons 1-4 contain subject names
// Individual subjects contain their topics
export const subjectsWithSubtopics = {
  "Lesson 1": [
    "Anatomy and Physiology",
    "College English and Computer Skills",
    "Dental Anatomy",
    "Dental Hygiene Clinic I",
    "Dental Hygiene Theory I",
    "Histology and Embryology",
    "Infection Control",
    "Introduction to Professionalism",
    "Introduction to Psychology",
    "Introduction to Statistics and Research",
    "Microbiology"
  ],
  "Lesson 2": [
    "Dental Hygiene Clinic II",
    "Dental Hygiene Theory II",
    "Dental Materials Theory",
    "Dental Radiography Interpretation",
    "Dental Radiography Lab",
    "Dental Radiography Theory",
    "Head and Neck Anatomy",
    "Oral Health Education",
    "Pathophysiology",
    "Periodontology I",
    "Pharmacology",
    "Medical Emergencies"
  ],
  "Lesson 3": [
    "Community Dental Health I",
    "Dental Hygiene Clinic III",
    "Dental Hygiene Theory III",
    "Dental Materials Lab",
    "Ethics and Jurisprudence",
    "Gerontology",
    "Nutrition for Living",
    "Oral Health Promotion",
    "Oral Pathology",
    "Periodontology II"
  ],
  "Lesson 4": [
    "Business Practice",
    "Community Dental Health II",
    "Consolidated Learning",
    "Dental Hygiene Clinic IV",
    "Dental Hygiene Theory IV"
  ],
  // Subject-specific topic mappings (not displayed as lessons)
  "Pathophysiology": [
    "1. Inflammation and Healing",
    "2. Immunity and Infection (Part 1)",
    "3. Immunity and Infection (Part 2)",
    "4. Nervous System Disorders",
    "5. Stress and Associated Problems",
    "6. Blood and Circulatory System Disorders"
  ],
  "Dental Materials Theory": [
    "1. Introduction to Dental Materials and Oral environment and patient considerations",
    "2. Physical and Mechanical properties of dental materials and General handling and safety of dental materials in the dental office",
    "3. Dental amalgams, Metals and Alloys"
  ],
  "Periodontology I": [
    "1. Periodontal Anatomy",
    "2. The microbiology of periodontal diseases"
  ],
  "Dental Radiography Theory": [
    "1. Radiation History & Radiation Physics",
    "2. Dental X-ray Equipment, Film Processing",
    "3. Dental Radiography Theory",
    "4. Dental Radiography Theory",
    "5. Dental Radiography Theory",
    "6. Dental Radiography Theory",
    "7. Dental Radiography Theory",
    "8. Dental Radiography Theory"
  ]
};

// Filter to show only lessons on home screen (not individual subjects)
export const subjectsByLesson = {
  "Lesson 1": subjectsWithSubtopics["Lesson 1"],
  "Lesson 2": subjectsWithSubtopics["Lesson 2"],
  "Lesson 3": subjectsWithSubtopics["Lesson 3"],
  "Lesson 4": subjectsWithSubtopics["Lesson 4"]
};

export default questionBank;
