// Central export file for all question modules
// This file aggregates all question imports for easier management

// Lesson 1 imports
import { questions as anatomyPhysiologyQuestions } from './lesson1/lesson1-anatomy-and-physiology.js';
import { questions as dentalAnatomyQuestions } from './lesson1/lesson1-dental-anatomy.js';
import { questions as dentalHygieneTheory1Questions } from './lesson1/lesson1-dental-hygiene-theory-i.js';
import { questions as histologyEmbryologyQuestions } from './lesson1/lesson1-histology-and-embryology.js';
import { questions as infectionControlQuestions } from './lesson1/lesson1-infection-control.js';
import { questions as statisticsResearchQuestions } from './lesson1/lesson1-introduction-to-statistics-and-research.js';
import { questions as microbiologyQuestions } from './lesson1/lesson1-microbiology.js';

// Lesson 2 imports
import { radiographyQuestions } from './lesson2/lesson2-radiography-questions.js';
import { questions as pathophysiologyQuestions } from './lesson2/lesson2-pathophysiology.js';
import { questions as dentalMaterialsQuestions } from './lesson2/lesson2-dental-materials-theory.js';
import { questions as periodontologyQuestions } from './lesson2/lesson2-periodontology-i.js';
import { questions as anatomyQuestions } from './lesson2/lesson2-head-and-neck-anatomy.js';
import { questions as pharmacologyQuestions } from './lesson2/lesson2-pharmacology.js';

// Export all questions as a single object
export const allQuestions = {
  ...anatomyPhysiologyQuestions,
  ...dentalAnatomyQuestions,
  ...dentalHygieneTheory1Questions,
  ...histologyEmbryologyQuestions,
  ...infectionControlQuestions,
  ...statisticsResearchQuestions,
  ...microbiologyQuestions,
  ...radiographyQuestions,
  ...pathophysiologyQuestions,
  ...dentalMaterialsQuestions,
  ...periodontologyQuestions,
  ...anatomyQuestions,
  ...pharmacologyQuestions
};

// Export as questionBank (alias for allQuestions)
export const questionBank = allQuestions;

// Export individual question sets for flexibility
export {
  anatomyPhysiologyQuestions,
  dentalAnatomyQuestions,
  dentalHygieneTheory1Questions,
  histologyEmbryologyQuestions,
  infectionControlQuestions,
  statisticsResearchQuestions,
  microbiologyQuestions,
  radiographyQuestions,
  pathophysiologyQuestions,
  dentalMaterialsQuestions,
  periodontologyQuestions,
  anatomyQuestions,
  pharmacologyQuestions
};

// Subject to topic mapping - for subjects that have subtopics
export const subjectsWithSubtopics = {
  "Anatomy and Physiology": [
    "1. Introduction to the Human Body",
    "2. Cells and Tissues",
    "3. Integumentary System",
    "4. Skeletal System",
    "5. Muscular System",
    "6. Nervous Tissue and the Brain",
    "7. Spinal Cord and Peripheral Nerves",
    "8. Blood",
    "9. Heart Anatomy and Function",
    "10. Lymphatic System",
    "11. Endocrine System",
    "12. Digestive System",
    "13. Respiratory System"
  ],
  "Dental Anatomy": [
    "1. Dental Anatomy",
    "2. The Oral Cavity",
    "3. The Tooth - Functions and Terms",
    "4. Supporting Structures",
    "5. Development, Form, Eruption and Shedding of Teeth",
    "6. Occlusion",
    "7. Primary Dentition",
    "8. Permanent Incisors",
    "9. Molars",
    "10. Premolars",
    "11. Root Morphology",
    "12. Dental Caries Disease",
    "13. Dental Anomalies"
  ],
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
    "3. Dental Radiography Theory - Topic 3",
    "4. Dental Radiography Theory - Topic 4",
    "5. Dental Radiography Theory - Topic 5",
    "6. Dental Radiography Theory - Topic 6",
    "7. Dental Radiography Theory - Topic 7",
    "8. Dental Radiography Theory - Topic 8"
  ],
  "Head and Neck Anatomy": [
    "1. Bones of the Head and Neck",
    "2. Muscles of the Head and Neck"
  ],
  "Pharmacology": [
    "1. Pharmacology"
  ]
};

// Export metadata about the question bank
export const questionBankMetadata = {
  totalSubjects: 13,
  totalTopics: 35,
  subjects: {
    // Lesson 1 subjects
    anatomyPhysiology: {
      name: 'Anatomy & Physiology',
      topics: 13,
      totalQuestions: 1236,
      file: 'lesson1-anatomy-and-physiology.js'
    },
    dentalAnatomy: {
      name: 'Dental Anatomy',
      topics: 13,
      totalQuestions: 723,
      file: 'lesson1-dental-anatomy.js'
    },
    dentalHygieneTheory1: {
      name: 'Dental Hygiene Theory I',
      topics: 0,
      totalQuestions: 0,
      file: 'lesson1-dental-hygiene-theory-i.js'
    },
    histologyEmbryology: {
      name: 'Histology and Embryology',
      topics: 0,
      totalQuestions: 0,
      file: 'lesson1-histology-and-embryology.js'
    },
    infectionControl: {
      name: 'Infection Control',
      topics: 0,
      totalQuestions: 0,
      file: 'lesson1-infection-control.js'
    },
    statisticsResearch: {
      name: 'Introduction to Statistics and Research',
      topics: 0,
      totalQuestions: 0,
      file: 'lesson1-introduction-to-statistics-and-research.js'
    },
    microbiology: {
      name: 'Microbiology',
      topics: 0,
      totalQuestions: 0,
      file: 'lesson1-microbiology.js'
    },
    // Lesson 2 subjects
    radiography: {
      name: 'Dental Radiography Theory',
      topics: 8,
      totalQuestions: 1528,
      file: 'lesson2-radiography-questions.js'
    },
    pathophysiology: {
      name: 'Pathophysiology',
      topics: 6,
      totalQuestions: 400,
      file: 'lesson2-pathophysiology.js'
    },
    dentalMaterials: {
      name: 'Dental Materials Theory',
      topics: 3,
      totalQuestions: 150,
      file: 'lesson2-dental-materials-theory.js'
    },
    periodontology: {
      name: 'Periodontology I',
      topics: 2,
      totalQuestions: 220,
      file: 'lesson2-periodontology-i.js'
    },
    headNeckAnatomy: {
      name: 'Head and Neck Anatomy',
      topics: 2,
      totalQuestions: 184,
      file: 'lesson2-head-and-neck-anatomy.js'
    },
    pharmacology: {
      name: 'Pharmacology',
      topics: 1,
      totalQuestions: 107,
      file: 'lesson2-pharmacology.js'
    }
  }
};
