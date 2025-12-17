// Central export file for all question modules
// This file aggregates all question imports for easier management

import { radiographyQuestions } from './lesson2-radiography-questions.js';
import { questions as pathophysiologyQuestions } from './lesson2-pathophysiology.js';
import { questions as dentalMaterialsQuestions } from './lesson2-dental-materials-theory.js';
import { questions as periodontologyQuestions } from './lesson2-periodontology-i.js';
import { questions as anatomyQuestions } from './lesson2-head-and-neck-anatomy.js';
import { questions as pharmacologyQuestions } from './lesson2-pharmacology.js';

// Export all questions as a single object
export const allQuestions = {
  ...radiographyQuestions,
  ...pathophysiologyQuestions,
  ...dentalMaterialsQuestions,
  ...periodontologyQuestions,
  ...anatomyQuestions,
  ...pharmacologyQuestions
};

// Export individual question sets for flexibility
export {
  radiographyQuestions,
  pathophysiologyQuestions,
  dentalMaterialsQuestions,
  periodontologyQuestions,
  anatomyQuestions,
  pharmacologyQuestions
};

// Export metadata about the question bank
export const questionBankMetadata = {
  totalSubjects: 6,
  totalTopics: 22,
  subjects: {
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
    anatomy: {
      name: 'Head and Neck Anatomy',
      topics: 2,
      totalQuestions: 85,
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
