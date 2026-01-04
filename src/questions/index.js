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
  ...mentalHealthWellBeingQuestions,
  ...boardexam2ProfessionalFoundationsQuestions,
  ...boardexam2InfectionControlQuestions,
  ...boardexam2ClinicalEnvironmentQuestions,
  ...boardexam2PatientAssessmentQuestions,
  ...boardexam2ImagingDiagnosticQuestions,
  ...boardexam2OralAnatomyQuestions,
  ...boardexam2PeriodontalAssessmentQuestions,
  ...boardexam2CarePlanningQuestions,
  ...boardexam2PreventiveCareQuestions,
  ...boardexam2InstrumentationQuestions,
  ...boardexam2PainAnxietyQuestions,
  ...boardexam2SpecialOralCareQuestions,
  ...boardexam2SpecialPopulationsQuestions,
  ...boardexam2MedicalConditionsQuestions
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
  mentalHealthWellBeingQuestions,
  boardexam2ProfessionalFoundationsQuestions,
  boardexam2InfectionControlQuestions,
  boardexam2ClinicalEnvironmentQuestions,
  boardexam2PatientAssessmentQuestions,
  boardexam2ImagingDiagnosticQuestions,
  boardexam2OralAnatomyQuestions,
  boardexam2PeriodontalAssessmentQuestions,
  boardexam2CarePlanningQuestions,
  boardexam2PreventiveCareQuestions,
  boardexam2InstrumentationQuestions,
  boardexam2PainAnxietyQuestions,
  boardexam2SpecialOralCareQuestions,
  boardexam2SpecialPopulationsQuestions,
  boardexam2MedicalConditionsQuestions
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
    "Professional Foundations and Communication",
    "Infection Control and Safety",
    "Clinical Environment and Documentation",
    "Patient Assessment and Health History",
    "Imaging and Diagnostic Methods",
    "Oral Anatomy and Disease Processes",
    "Periodontal Assessment and Therapy",
    "Care Planning and Evaluation",
    "Preventive Care and Patient Education",
    "Instrumentation & Clinical Procedures",
    "Pain, Anxiety and Sensitivity Management",
    "Special Oral Care Situations",
    "Special Populations",
    "Medical Conditions Affecting Dental Care"
  ],
  "Professional Practice and Foundations": [
    "1. Dental Hygiene Profession",
    "2. Dental Hygiene Practice Models",
    "3. Evidence-Based Decision Making",
    "4. Legal and Ethical Practice",
    "5. Professional e-Portfolios",
    "6. Career Development and Job Search",
    "7. Dental Practice Management",
    "8. Teledentistry"
  ],
  "Community and Public Health": [
    "1. Community Oral Health",
    "2. Health Behavior Change",
    "3. Inclusive Patient Care"
  ],
  "Infection Control and Safety": [
    "1. Infection Control",
    "2. Medical Emergencies in Dentistry"
  ],
  "Clinical Environment and Ergonomics": [
    "1. Dental Hygiene Practice Settings",
    "2. Ergonomics and Workplace Injuries"
  ],
  "Patient Assessment and Health History": [
    "1. Patient Health Histories",
    "2. Vital Signs Assessment",
    "3. Medication History",
    "4. Head and Neck Examination"
  ],
  "Oral Assessment and Diagnosis": [
    "1. Tooth Assessment and Charting",
    "2. Plaque, Calculus, and Stain Assessment",
    "3. Caries Risk Assessment and Management",
    "4. Periodontal Assessment and Charting",
    "5. Oral-Systemic Health",
    "6. Dental Hygiene Diagnosis"
  ],
  "Care Planning and Documentation": [
    "1. Care Planning, Evaluation, and Documentation"
  ],
  "Preventive Care and Patient Education": [
    "1. Toothbrushing Techniques",
    "2. Interdental and Oral Care Aids",
    "3. Toothpaste Products",
    "4. Antimicrobial Therapy for Periodontal Disease",
    "5. Dental Sealants",
    "6. Nutrition Counseling",
    "7. Tobacco Cessation Counseling"
  ],
  "Instrumentation and Clinical Procedures": [
    "1. Hand Instrumentation",
    "2. Ultrasonic Instrumentation",
    "3. Root Anatomy for Instrumentation",
    "4. Tooth Polishing and Whitening",
    "5. Dental Impressions and Oral Appliances"
  ],
  "Periodontal Therapy": [
    "1. Nonsurgical Periodontal Therapy Decisions",
    "2. Acute Periodontal Conditions"
  ],
  "Restorative and Specialty Care": [
    "1. Dental Implants and Implant Care",
    "2. Restorative Dental Care",
    "3. Orthodontic Care",
    "4. Dental Prostheses",
    "5. Tooth Sensitivity"
  ],
  "Pain and Anxiety Management": [
    "1. Local Anesthesia",
    "2. Nitrous Oxide Sedation"
  ],
  "Special Populations": [
    "1. Pediatric and Adolescent Care",
    "2. Pregnancy and Oral Health",
    "3. Geriatric Dental Care",
    "4. Palliative Oral Care",
    "5. Child Abuse and Family Violence",
    "6. Disability and Access to Care",
    "7. Intellectual and Developmental Disabilities",
    "8. Orofacial Cleft Conditions",
    "9. Neurologic Disabilities"
  ],
  "Medical Conditions and Systemic Diseases": [
    "1. Cardiovascular Disease and Oral Health",
    "2. Diabetes and Oral Health",
    "3. Cancer and Oral Care",
    "4. HIV and Oral Health",
    "5. Autoimmune Diseases",
    "6. Organ Transplant and Kidney Disease",
    "7. Respiratory Diseases",
    "8. Substance Use Disorders",
    "9. Eating Disorders"
  ],
  "Mental Health and Well-Being": [
    "1. Mental Health and Self-Care"
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
  ]
};

// Export metadata about the question bank
export const questionBankMetadata = {
  totalSubjects: 12,
  totalTopics: 91,
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
      topics: 3,
      totalQuestions: 691,
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
