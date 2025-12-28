// Central export file for all question modules
// This file aggregates all question imports for easier management

// Lesson 1 imports
import { questions as anatomyPhysiologyQuestions } from './lesson1/lesson1-anatomy-and-physiology.js';
import { questions as dentalAnatomyQuestions } from './lesson1/lesson1-dental-anatomy.js';
import { questions as dentalHygieneTheory1Questions } from './lesson1/lesson1-dental-hygiene-theory-i.js';
import { questions as histologyEmbryologyQuestions } from './lesson1/lesson1-histology-and-embryology.js';
import { questions as statisticsResearchQuestions } from './lesson1/lesson1-introduction-to-statistics-and-research.js';
import { questions as microbiologyQuestions } from './lesson1/lesson1-microbiology.js';

// Lesson 2 imports
import { radiographyQuestions } from './lesson2/lesson2-radiography-questions.js';
import { questions as pathophysiologyQuestions } from './lesson2/lesson2-pathophysiology.js';
import { questions as dentalMaterialsQuestions } from './lesson2/lesson2-dental-materials-theory.js';
import { questions as periodontologyQuestions } from './lesson2/lesson2-periodontology-i.js';
import { questions as anatomyQuestions } from './lesson2/lesson2-head-and-neck-anatomy.js';
import { questions as pharmacologyQuestions } from './lesson2/lesson2-pharmacology.js';

// Board Exam imports
import { questions as professionalFoundationsQuestions } from './boardexam/boardexam-professional-foundations.js';
import { questions as clinicalPreparationQuestions } from './boardexam/boardexam-clinical-preparation.js';
import { questions as patientAssessmentQuestions } from './boardexam/boardexam-patient-assessment.js';
import { questions as treatmentPlanningQuestions } from './boardexam/boardexam-treatment-planning.js';
import { questions as clinicalProceduresQuestions } from './boardexam/boardexam-clinical-procedures.js';
import { questions as painManagementQuestions } from './boardexam/boardexam-pain-management.js';
import { questions as lifeStagesQuestions } from './boardexam/boardexam-life-stages.js';
import { questions as medicallyComplexPatientsQuestions } from './boardexam/boardexam-medically-complex-patients.js';
import { questions as specialNeedsCareQuestions } from './boardexam/boardexam-special-needs-care.js';
import { questions as careerDevelopmentQuestions } from './boardexam/boardexam-career-development.js';

// Export all questions as a single object
export const allQuestions = {
  ...anatomyPhysiologyQuestions,
  ...dentalAnatomyQuestions,
  ...dentalHygieneTheory1Questions,
  ...histologyEmbryologyQuestions,
  ...statisticsResearchQuestions,
  ...microbiologyQuestions,
  ...radiographyQuestions,
  ...pathophysiologyQuestions,
  ...dentalMaterialsQuestions,
  ...periodontologyQuestions,
  ...anatomyQuestions,
  ...pharmacologyQuestions,
  ...professionalFoundationsQuestions,
  ...clinicalPreparationQuestions,
  ...patientAssessmentQuestions,
  ...treatmentPlanningQuestions,
  ...clinicalProceduresQuestions,
  ...painManagementQuestions,
  ...lifeStagesQuestions,
  ...medicallyComplexPatientsQuestions,
  ...specialNeedsCareQuestions,
  ...careerDevelopmentQuestions
};

// Export as questionBank (alias for allQuestions)
export const questionBank = allQuestions;

// Export individual question sets for flexibility
export {
  anatomyPhysiologyQuestions,
  dentalAnatomyQuestions,
  dentalHygieneTheory1Questions,
  histologyEmbryologyQuestions,
  statisticsResearchQuestions,
  microbiologyQuestions,
  radiographyQuestions,
  pathophysiologyQuestions,
  dentalMaterialsQuestions,
  periodontologyQuestions,
  anatomyQuestions,
  pharmacologyQuestions,
  professionalFoundationsQuestions,
  clinicalPreparationQuestions,
  patientAssessmentQuestions,
  treatmentPlanningQuestions,
  clinicalProceduresQuestions,
  painManagementQuestions,
  lifeStagesQuestions,
  medicallyComplexPatientsQuestions,
  specialNeedsCareQuestions,
  careerDevelopmentQuestions
};

// Subject to topic mapping - for subjects that have subtopics
export const subjectsWithSubtopics = {
  "Lesson 1": [
    "Anatomy and Physiology",
    "Dental Anatomy",
    "Dental Hygiene Theory I",
    "Histology and Embryology",
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
  "Board Exam": [
    "Professional Foundations",
    "Clinical Preparation",
    "Patient Assessment",
    "Treatment Planning",
    "Clinical Procedures",
    "Pain Management",
    "Life Stages",
    "Medically Complex Patients",
    "Special Needs Care",
    "Career Development"
  ],
  "Professional Foundations": [
    "1. Introduction to Dental Hygiene",
    "2. Core Concepts and Practice Models",
    "3. Evidence-Based Practice",
    "4. Community Oral Health",
    "5. Patient Behavior and Motivation",
    "6. Inclusive Patient Care",
    "7. Ethics and Legal Issues",
    "8. Professional Portfolios"
  ],
  "Clinical Preparation": [
    "9. Practice Settings and Environments",
    "10. Infection Control",
    "11. Medical Emergencies",
    "12. Workplace Safety and Ergonomics"
  ],
  "Patient Assessment": [
    "13. Medical and Dental History",
    "14. Vital Signs Assessment",
    "15. Medication Review",
    "16. Head and Neck Examination",
    "17. Tooth Assessment and Charting",
    "18. Plaque and Stain Assessment",
    "19. Caries Risk Assessment",
    "20. Periodontal Examination",
    "21. Oral-Systemic Health Links"
  ],
  "Treatment Planning": [
    "22. Dental Hygiene Diagnosis",
    "23. Care Planning and Documentation"
  ],
  "Clinical Procedures": [
    "24. Toothbrushing Techniques",
    "25. Interdental Cleaning",
    "26. Toothpastes and Rinses",
    "27. Antimicrobial Therapy",
    "28. Hand Instruments",
    "29. Ultrasonic Scalers",
    "30. Root Anatomy",
    "31. Dental Implant Care",
    "32. Polishing and Whitening",
    "33. Periodontal Therapy Planning",
    "34. Acute Periodontal Conditions",
    "35. Dental Sealants",
    "36. Nutrition Counseling",
    "37. Tobacco Cessation",
    "38. Impressions and Appliances",
    "39. Restorative Procedures",
    "40. Orthodontic Maintenance",
    "41. Dentures and Bridges"
  ],
  "Pain Management": [
    "42. Tooth Sensitivity",
    "43. Local Anesthesia",
    "44. Nitrous Oxide Sedation"
  ],
  "Life Stages": [
    "45. Pediatric and Adolescent Care",
    "46. Pregnancy and Oral Health",
    "47. Geriatric Care"
  ],
  "Medically Complex Patients": [
    "48. Heart Disease",
    "49. Diabetes",
    "50. Cancer Patients",
    "51. HIV and Oral Health",
    "52. End-of-Life Care",
    "53. Autoimmune Disorders",
    "54. Transplant and Kidney Disease",
    "55. Respiratory Conditions",
    "56. Substance Abuse",
    "57. Eating Disorders",
    "58. Abuse and Violence Recognition"
  ],
  "Special Needs Care": [
    "59. Patients with Disabilities",
    "60. Intellectual and Developmental Disabilities",
    "61. Cleft Lip and Palate",
    "62. Neurological Disorders"
  ],
  "Career Development": [
    "63. Career Planning",
    "64. Practice Management",
    "65. Telehealth in Dentistry",
    "66. Mental Health and Self-Care"
  ],
  "Anatomy and Physiology": [
    "1. Introduction to the Human Body",
    "2. Cells and Tissues",
    "3. Integumentary System",
    "4. Skeletal System",
    "5. Muscular System",
    "6. Nervous Tissue and Brain",
    "7. Spinal Cord and Peripheral Nerves",
    "8. Blood",
    "9. Anatomy and Function of the Heart",
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
  "Dental Hygiene Theory I": [
    "1. Course Intro, Dental Equipment, and Positioning",
    "2. Instrument Grasp",
    "3. Instrument Design and Classification (Part 1)",
    "4. Instrument Design and Classification (Part 2)",
    "5. Principles of Ergonomics",
    "6. Use of Dental Mouth Mirror",
    "7. Finger Rest in the Anterior Sextants",
    "8. Elements of an Effective Instrumentation Stroke",
    "9. Periodontal Probes and Basic Probing Technique",
    "10. Explorers",
    "11. Technique Essentials - Supragingival Calculus Removal",
    "12. Technique Essentials - Subgingival Calculus Removal",
    "13. Universal Curets",
    "14. Area-Specific Curets",
    "15. Vital Signs",
    "16. Fulcruming Techniques",
    "17. Instruments Sharpening",
    "18. Alternate Scalers"
  ],
  "Histology and Embryology": [
    "1. The Cell",
    "2. Basic Tissue – Basement Membrane",
    "3. Basic Tissue – Muscle and Nerve",
    "4. Overview of Prenatal Development",
    "5. Embryonic Period",
    "6. Development of the Face and Neck",
    "7. Palate and Tongue",
    "8. Tooth Development",
    "9. Enamel Organ",
    "10. Oral Mucosa"
  ],
  "Introduction to Statistics and Research": [
    "1. Introduction to Research",
    "2. Qualitative Research",
    "3. Quantitative Research (Part 1)",
    "4. Quantitative Research (Part 2)",
    "5. Probability and Nonprobability Sampling Methods",
    "6. Mixed Research",
    "7. Essentials of Statistics (Part 1)",
    "8. Essentials of Statistics (Part 2)",
    "9. Developing Research Questions and Hypothesis",
    "10. Evidence-Informed Practice and Literature Review",
    "11. Clinical Trial"
  ],
  "Microbiology": [
    "1. Basic Bacteriology",
    "2. Basic Virology",
    "3. Microbial Pathogenesis",
    "4. Basic Immunology",
    "5. Medical Bacteriology (Part 1)",
    "6. Medical Bacteriology (Part 2)",
    "7. Medical Bacteriology (Part 3)",
    "8. Medical Virology & Mycology",
    "9. Viral Hepatitis and AIDS",
    "10. Oral Microbiology and Dental Caries",
    "11. Microbiology of Periodontal Diseases and Dentoalveolar Infections"
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
    "3. Dental Radiography Theory",
    "4. Dental Radiography Theory",
    "5. Dental Radiography Theory",
    "6. Dental Radiography Theory",
    "7. Dental Radiography Theory",
    "8. Dental Radiography Theory"
  ],
  "Head and Neck Anatomy": [
    "0. TMJ",
    "1. Bones of the skull",
    "2. Landmarks on bones",
    "3. Circulation of the Head and Neck",
    "4. Lymphatics",
    "5. Cranial Nerves",
    "6. Local Anaesthetic",
    "7. Muscles of Mastication"
  ],
  "Pharmacology": [
    "1. Introduction, Pharmacokinetics, Adverse Drug Reactions and Anti Infective Agents (Part 1)",
    "2. Introduction, Pharmacokinetics, Adverse Drug Reactions and Anti Infective Agents (Part 2)"
  ]
};

// Export metadata about the question bank
export const questionBankMetadata = {
  totalSubjects: 12,
  totalTopics: 85,
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
      topics: 18,
      totalQuestions: 1554,
      file: 'lesson1-dental-hygiene-theory-i.js'
    },
    histologyEmbryology: {
      name: 'Histology and Embryology',
      topics: 10,
      totalQuestions: 1155,
      file: 'lesson1-histology-and-embryology.js'
    },
    statisticsResearch: {
      name: 'Introduction to Statistics and Research',
      topics: 11,
      totalQuestions: 672,
      file: 'lesson1-introduction-to-statistics-and-research.js'
    },
    microbiology: {
      name: 'Microbiology',
      topics: 11,
      totalQuestions: 1359,
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
      topics: 8,
      totalQuestions: 694,
      file: 'lesson2-head-and-neck-anatomy.js'
    },
    pharmacology: {
      name: 'Pharmacology',
      topics: 2,
      totalQuestions: 245,
      file: 'lesson2-pharmacology.js'
    },
    professionalFoundations: {
      name: 'Professional Foundations',
      topics: 0,
      totalQuestions: 0,
      file: 'boardexam-professional-foundations.js'
    },
    clinicalPreparation: {
      name: 'Clinical Preparation',
      topics: 0,
      totalQuestions: 0,
      file: 'boardexam-clinical-preparation.js'
    },
    patientAssessment: {
      name: 'Patient Assessment',
      topics: 0,
      totalQuestions: 0,
      file: 'boardexam-patient-assessment.js'
    },
    treatmentPlanning: {
      name: 'Treatment Planning',
      topics: 0,
      totalQuestions: 0,
      file: 'boardexam-treatment-planning.js'
    },
    clinicalProcedures: {
      name: 'Clinical Procedures',
      topics: 0,
      totalQuestions: 0,
      file: 'boardexam-clinical-procedures.js'
    },
    painManagement: {
      name: 'Pain Management',
      topics: 0,
      totalQuestions: 0,
      file: 'boardexam-pain-management.js'
    },
    lifeStages: {
      name: 'Life Stages',
      topics: 0,
      totalQuestions: 0,
      file: 'boardexam-life-stages.js'
    },
    medicallyComplexPatients: {
      name: 'Medically Complex Patients',
      topics: 0,
      totalQuestions: 0,
      file: 'boardexam-medically-complex-patients.js'
    },
    specialNeedsCare: {
      name: 'Special Needs Care',
      topics: 0,
      totalQuestions: 0,
      file: 'boardexam-special-needs-care.js'
    },
    careerDevelopment: {
      name: 'Career Development',
      topics: 0,
      totalQuestions: 0,
      file: 'boardexam-career-development.js'
    }
  }
};
