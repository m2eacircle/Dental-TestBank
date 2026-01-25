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
import { questions as oralHealthEducationQuestions } from './lesson2/lesson2-oral-health-education.js';

// Board Exam imports
import { questions as professionalPracticeFoundationsQuestions } from './boardexam/boardexam-professional-practice-and-foundations.js';
import { questions as communityPublicHealthQuestions } from './boardexam/boardexam-community-and-public-health.js';
import { questions as infectionControlSafetyQuestions } from './boardexam/boardexam-infection-control-and-safety.js';
import { questions as clinicalEnvironmentErgonomicsQuestions } from './boardexam/boardexam-clinical-environment-and-ergonomics.js';
import { questions as patientAssessmentHealthHistoryQuestions } from './boardexam/boardexam-patient-assessment-and-health-history.js';
import { questions as oralAssessmentDiagnosisQuestions } from './boardexam/boardexam-oral-assessment-and-diagnosis.js';
import { questions as carePlanningDocumentationQuestions } from './boardexam/boardexam-care-planning-and-documentation.js';
import { questions as preventiveCarePatientEducationQuestions } from './boardexam/boardexam-preventive-care-and-patient-education.js';
import { questions as instrumentationClinicalProceduresQuestions } from './boardexam/boardexam-instrumentation-and-clinical-procedures.js';
import { questions as periodontalTherapyQuestions } from './boardexam/boardexam-periodontal-therapy.js';
import { questions as restorativeSpecialtyCareQuestions } from './boardexam/boardexam-restorative-and-specialty-care.js';
import { questions as painAnxietyManagementQuestions } from './boardexam/boardexam-pain-and-anxiety-management.js';
import { questions as specialPopulationsQuestions } from './boardexam/boardexam-special-populations.js';
import { questions as medicalConditionsSystemicDiseasesQuestions } from './boardexam/boardexam-medical-conditions-and-systemic-diseases.js';
import { questions as mentalHealthWellBeingQuestions } from './boardexam/boardexam-mental-health-and-well-being.js';

// Board Exam 2 imports
import { questions as boardexam2ProfessionalFoundationsQuestions } from './boardexam2/boardexam2-professional-foundations-and-communication.js';
import { questions as boardexam2InfectionControlQuestions } from './boardexam2/boardexam2-infection-control-and-safety.js';
import { questions as boardexam2ClinicalEnvironmentQuestions } from './boardexam2/boardexam2-clinical-environment-and-documentation.js';
import { questions as boardexam2PatientAssessmentQuestions } from './boardexam2/boardexam2-patient-assessment-and-health-history.js';
import { questions as boardexam2ImagingDiagnosticQuestions } from './boardexam2/boardexam2-imaging-and-diagnostic-methods.js';
import { questions as boardexam2OralAnatomyQuestions } from './boardexam2/boardexam2-oral-anatomy-and-disease-processes.js';
import { questions as boardexam2PeriodontalAssessmentQuestions } from './boardexam2/boardexam2-periodontal-assessment-and-therapy.js';
import { questions as boardexam2CarePlanningQuestions } from './boardexam2/boardexam2-care-planning-and-evaluation.js';
import { questions as boardexam2PreventiveCareQuestions } from './boardexam2/boardexam2-preventive-care-and-patient-education.js';
import { questions as boardexam2InstrumentationQuestions } from './boardexam2/boardexam2-instrumentation-and-clinical-procedures.js';
import { questions as boardexam2PainAnxietyQuestions } from './boardexam2/boardexam2-pain-anxiety-and-sensitivity-management.js';
import { questions as boardexam2SpecialOralCareQuestions } from './boardexam2/boardexam2-special-oral-care-situations.js';
import { questions as boardexam2SpecialPopulationsQuestions } from './boardexam2/boardexam2-special-populations.js';
import { questions as boardexam2MedicalConditionsQuestions } from './boardexam2/boardexam2-medical-conditions-affecting-dental-care.js';

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
  ...oralHealthEducationQuestions,
  ...professionalPracticeFoundationsQuestions,
  ...communityPublicHealthQuestions,
  ...infectionControlSafetyQuestions,
  ...clinicalEnvironmentErgonomicsQuestions,
  ...patientAssessmentHealthHistoryQuestions,
  ...oralAssessmentDiagnosisQuestions,
  ...carePlanningDocumentationQuestions,
  ...preventiveCarePatientEducationQuestions,
  ...instrumentationClinicalProceduresQuestions,
  ...periodontalTherapyQuestions,
  ...restorativeSpecialtyCareQuestions,
  ...painAnxietyManagementQuestions,
  ...specialPopulationsQuestions,
  ...medicalConditionsSystemicDiseasesQuestions,
  ...mentalHealthWellBeingQuestions
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
  oralHealthEducationQuestions,
  professionalPracticeFoundationsQuestions,
  communityPublicHealthQuestions,
  infectionControlSafetyQuestions,
  clinicalEnvironmentErgonomicsQuestions,
  patientAssessmentHealthHistoryQuestions,
  oralAssessmentDiagnosisQuestions,
  carePlanningDocumentationQuestions,
  preventiveCarePatientEducationQuestions,
  instrumentationClinicalProceduresQuestions,
  periodontalTherapyQuestions,
  restorativeSpecialtyCareQuestions,
  painAnxietyManagementQuestions,
  specialPopulationsQuestions,
  medicalConditionsSystemicDiseasesQuestions,
  mentalHealthWellBeingQuestions
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
    "Dental Materials Theory",
    "Dental Radiography Interpretation",
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
    "Professional Practice and Foundations",
    "Community and Public Health",
    "Infection Control and Safety",
    "Clinical Environment and Ergonomics",
    "Patient Assessment and Health History",
    "Oral Assessment and Diagnosis",
    "Care Planning and Documentation",
    "Preventive Care and Patient Education",
    "Instrumentation and Clinical Procedures",
    "Periodontal Therapy",
    "Restorative and Specialty Care",
    "Pain and Anxiety Management",
    "Special Populations",
    "Medical Conditions and Systemic Diseases",
    "Mental Health and Well-Being"
  ],
  "Board Exam 2": [
    "2 - Professional Foundations and Communication",
    "2 - Infection Control and Safety",
    "2 - Clinical Environment and Documentation",
    "2 - Patient Assessment and Health History",
    "2 - Imaging and Diagnostic Methods",
    "2 - Oral Anatomy and Disease Processes",
    "2 - Periodontal Assessment and Therapy",
    "2 - Care Planning and Evaluation",
    "2 - Preventive Care and Patient Education",
    "2 - Instrumentation & Clinical Procedures",
    "2 - Pain, Anxiety and Sensitivity Management",
    "2 - Special Oral Care Situations",
    "2 - Special Populations",
    "2 - Medical Conditions Affecting Dental Care"
  ],
  "Professional Practice and Foundations": [
    "1. Dental Hygiene Profession",
    "1. Dental Hygiene Profession (Case Study)",
    "2. Dental Hygiene Practice Models",
    "2. Dental Hygiene Practice Models (Case Study)",
    "3. Evidence-Based Decision Making",
    "3. Evidence-Based Decision Making (Case Study)",
    "4. Legal and Ethical Practice",
    "4. Legal and Ethical Practice (Case Study)",
    "5. Professional e-Portfolios",
    "5. Professional e-Portfolios (Case Study)",
    "6. Communication",
    "6. Communication (Case Study)",
    "7. Teamwork and Collaboration",
    "7. Teamwork and Collaboration (Case Study)",
    "8. Cultural Competence",
    "8. Cultural Competence (Case Study)",
    "9. Professional Identity",
    "9. Professional Identity (Case Study)"
  ],
  "Community and Public Health": [
    "10. Public Health Approaches to Oral Health",
    "10. Public Health Approaches to Oral Health (Case Study)",
    "11. Dental Public Health Programs",
    "11. Dental Public Health Programs (Case Study)",
    "12. Health Promotion and Disease Prevention",
    "12. Health Promotion and Disease Prevention (Case Study)",
    "13. Epidemiology and Research",
    "13. Epidemiology and Research (Case Study)",
    "14. Access to Care",
    "14. Access to Care (Case Study)",
    "15. Social Determinants of Health",
    "15. Social Determinants of Health (Case Study)"
  ],
  "Infection Control and Safety": [
    "16. Infection Control Principles",
    "16. Infection Control Principles (Case Study)",
    "17. Standard and Transmission-Based Precautions",
    "17. Standard and Transmission-Based Precautions (Case Study)",
    "18. Instrument Processing and Sterilization",
    "18. Instrument Processing and Sterilization (Case Study)",
    "19. Occupational Health and Safety",
    "19. Occupational Health and Safety (Case Study)",
    "20. Hazard Communication",
    "20. Hazard Communication (Case Study)"
  ],
  "Clinical Environment and Ergonomics": [
    "21. Ergonomic Positioning and Patient Positioning",
    "21. Ergonomic Positioning and Patient Positioning (Case Study)",
    "22. Equipment and Instrumentation",
    "22. Equipment and Instrumentation (Case Study)",
    "23. Clinical Documentation",
    "23. Clinical Documentation (Case Study)",
    "24. Quality Assurance",
    "24. Quality Assurance (Case Study)"
  ],
  "Patient Assessment and Health History": [
    "25. Comprehensive Health History",
    "25. Comprehensive Health History (Case Study)",
    "26. Vital Signs",
    "26. Vital Signs (Case Study)",
    "27. Extraoral and Intraoral Examination",
    "27. Extraoral and Intraoral Examination (Case Study)",
    "28. Risk Assessment",
    "28. Risk Assessment (Case Study)",
    "29. Documentation of Findings",
    "29. Documentation of Findings (Case Study)"
  ],
  "Oral Assessment and Diagnosis": [
    "30. Periodontal Assessment",
    "30. Periodontal Assessment (Case Study)",
    "31. Dental Caries Assessment",
    "31. Dental Caries Assessment (Case Study)",
    "32. Oral Cancer Screening",
    "32. Oral Cancer Screening (Case Study)",
    "33. Radiographic Interpretation",
    "33. Radiographic Interpretation (Case Study)",
    "34. Diagnostic Models and Photography",
    "34. Diagnostic Models and Photography (Case Study)"
  ],
  "Care Planning and Documentation": [
    "35. Dental Hygiene Diagnosis",
    "35. Dental Hygiene Diagnosis (Case Study)",
    "36. Treatment Planning",
    "36. Treatment Planning (Case Study)",
    "37. Informed Consent",
    "37. Informed Consent (Case Study)",
    "38. Documentation Standards",
    "38. Documentation Standards (Case Study)",
    "39. Evaluation and Reassessment",
    "39. Evaluation and Reassessment (Case Study)"
  ],
  "Preventive Care and Patient Education": [
    "40. Oral Hygiene Instruction",
    "40. Oral Hygiene Instruction (Case Study)",
    "41. Nutritional Counseling",
    "41. Nutritional Counseling (Case Study)",
    "42. Fluoride Therapy",
    "42. Fluoride Therapy (Case Study)",
    "43. Sealants",
    "43. Sealants (Case Study)",
    "44. Tobacco Cessation",
    "44. Tobacco Cessation (Case Study)",
    "45. Motivational Interviewing",
    "45. Motivational Interviewing (Case Study)"
  ],
  "Instrumentation and Clinical Procedures": [
    "46. Hand Instrumentation",
    "46. Hand Instrumentation (Case Study)",
    "47. Power Instrumentation",
    "47. Power Instrumentation (Case Study)",
    "48. Debridement and Scaling",
    "48. Debridement and Scaling (Case Study)",
    "49. Root Planing",
    "49. Root Planing (Case Study)",
    "50. Polishing and Stain Removal",
    "50. Polishing and Stain Removal (Case Study)"
  ],
  "Periodontal Therapy": [
    "51. Periodontal Disease Classification",
    "51. Periodontal Disease Classification (Case Study)",
    "52. Non-Surgical Periodontal Therapy",
    "52. Non-Surgical Periodontal Therapy (Case Study)",
    "53. Adjunctive Therapies",
    "53. Adjunctive Therapies (Case Study)",
    "54. Supportive Periodontal Therapy",
    "54. Supportive Periodontal Therapy (Case Study)",
    "55. Periodontal Maintenance",
    "55. Periodontal Maintenance (Case Study)"
  ],
  "Restorative and Specialty Care": [
    "56. Restorative Materials",
    "56. Restorative Materials (Case Study)",
    "57. Impression Materials",
    "57. Impression Materials (Case Study)",
    "58. Temporary Restorations",
    "58. Temporary Restorations (Case Study)",
    "59. Orthodontic Care",
    "59. Orthodontic Care (Case Study)",
    "60. Implant Maintenance",
    "60. Implant Maintenance (Case Study)"
  ],
  "Pain and Anxiety Management": [
    "61. Local Anesthesia",
    "61. Local Anesthesia (Case Study)",
    "62. Nitrous Oxide Sedation",
    "62. Nitrous Oxide Sedation (Case Study)",
    "63. Pain Management",
    "63. Pain Management (Case Study)",
    "64. Anxiety Management Techniques",
    "64. Anxiety Management Techniques (Case Study)",
    "65. Emergency Management",
    "65. Emergency Management (Case Study)"
  ],
  "Special Populations": [
    "66. Pediatric Patients",
    "66. Pediatric Patients (Case Study)",
    "67. Geriatric Patients",
    "67. Geriatric Patients (Case Study)",
    "68. Pregnant Patients",
    "68. Pregnant Patients (Case Study)",
    "69. Patients with Special Needs",
    "69. Patients with Special Needs (Case Study)",
    "70. Culturally Diverse Patients",
    "70. Culturally Diverse Patients (Case Study)"
  ],
  "Medical Conditions and Systemic Diseases": [
    "71. Cardiovascular Diseases",
    "71. Cardiovascular Diseases (Case Study)",
    "72. Respiratory Diseases",
    "72. Respiratory Diseases (Case Study)",
    "73. Endocrine Disorders",
    "73. Endocrine Disorders (Case Study)",
    "74. Immunological Disorders",
    "74. Immunological Disorders (Case Study)",
    "75. Cancer and Treatment",
    "75. Cancer and Treatment (Case Study)",
    "76. Blood Disorders",
    "76. Blood Disorders (Case Study)",
    "77. Neurological Disorders",
    "77. Neurological Disorders (Case Study)",
    "78. Substance Abuse",
    "78. Substance Abuse (Case Study)"
  ],
  "Mental Health and Well-Being": [
    "79. Mental Health Basics",
    "79. Mental Health Basics (Case Study)",
    "80. Stress Management",
    "80. Stress Management (Case Study)",
    "81. Professional Burnout",
    "81. Professional Burnout (Case Study)",
    "82. Work-Life Balance",
    "82. Work-Life Balance (Case Study)",
    "83. Self-Care Strategies",
    "83. Self-Care Strategies (Case Study)"
  ],
  "Dental Materials Theory": [
    "1. Introduction to Dental Materials and Oral environment and patient considerations",
    "2. Physical and Mechanical properties of dental materials and General handling and safety of dental materials in the dental office",
    "3. Dental amalgams, Metals and Alloys (Part 1)",
    "3. Dental amalgams, Metals and Alloys (Part 2)",
    "3. Dental amalgams, Metals and Alloys (Part 3)",
    "4. Composites (Part 1)",
    "4. Composites (Part 2)",
    "4. Composites (Part 3)"
  ],
  "Periodontology I": [
    "1. Periodontal Anatomy",
    "2. The microbiology of periodontal diseases",
    "3. Calculus and other disease associated factors",
    "4. Gingival diseases",
    "5. Periodontal diseases",
    "5. Periodontal diseases (Case Study)",
    "6. Systemic diseases and periodontal health"
  ],
  "Dental Radiography Theory": [
    "1. Radiation History & Radiation Physics",
    "2. Dental X-ray Equipment, Film Processing",
    "3. X-Ray Production and Equipment",
    "4. Film Mounting and Quality Control",
    "5. Film Processing Chemistry",
    "6. Radiographic Density and Exposure Factors",
    "7. Beam Quality and Inverse Square Law",
    "8. Bisecting Angle Technique",
    "9. Atomic Structure and X-Ray Interactions",
    "10. Radiation Biology and Safety",
    "11. Radiation Protection and Specialized Techniques",
    "12. Panoramic and Extraoral Radiography",
    "13. Digital Imaging and Infection Control"
  ],
  "Head and Neck Anatomy": [
    "1. TMJ (Part 1)",
    "2. TMJ (Part 2)",
    "3. Bones of the skull (Part 1)",
    "4. Bones of the skull (Part 2)",
    "5. Landmarks on bones (Part 1)",
    "6. Landmarks on bones (Part 2)",
    "7. Circulation of the Head and Neck (Part 1)",
    "8. Circulation of the Head and Neck (Part 2)",
    "9. Lymphatics (Part 1)",
    "10. Lymphatics (Part 2)",
    "11. Cranial Nerves (Part 1)",
    "12. Cranial Nerves (Part 2)",
    "13. Local Anaesthetic (Part 1)",
    "14. Local Anaesthetic (Part 2)",
    "15. Muscles of Mastication (Part 1)",
    "16. Muscles of Mastication (Part 2)"
  ],
  "Pharmacology": [
    "1. Pharmacodynamics, ADME, and Adverse Drug Reactions",
    "2. Drug Metabolism, Antibiotics, and Clinical Pharmacology",
    "3. Clinical Case Applications and Patient Care Scenarios"
  ],
  "Oral Health Education": [
    "1. Soft and Hard Deposits",
    "2. Toothbrushing",
    "3. Interdental & Supplemental Self-Care Aids",
    "4-1. Dentifrices",
    "4-2. Mouthrinse Comparison",
    "4-3. Sensodyne ProNamel Product Table",
    "5. Mouthrinse Comparison",
    "6. Sensodyne ProNamel Product Table",
    "7. Denture",
    "8. A String around Your Finger"
  ]
};

// Export metadata about the question bank
export const questionBankMetadata = {
  totalSubjects: 13,
  totalTopics: 99,
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
      topics: 13,
      totalQuestions: 2422,
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
      topics: 8,
      totalQuestions: 150,
      file: 'lesson2-dental-materials-theory.js'
    },
    periodontology: {
      name: 'Periodontology I',
      topics: 7,
      totalQuestions: 220,
      file: 'lesson2-periodontology-i.js'
    },
    headNeckAnatomy: {
      name: 'Head and Neck Anatomy',
      topics: 16,
      totalQuestions: 694,
      file: 'lesson2-head-and-neck-anatomy.js'
    },
    pharmacology: {
      name: 'Pharmacology',
      topics: 3,
      totalQuestions: 691,
      file: 'lesson2-pharmacology.js'
    },
    oralHealthEducation: {
      name: 'Oral Health Education',
      topics: 8,
      totalQuestions: 160,
      file: 'lesson2-oral-health-education.js'
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
