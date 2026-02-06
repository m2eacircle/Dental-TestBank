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
import { questions as radiographyTheoryQuestions } from './lesson2-dental-radiography-theory.js';
import { questions as pathophysiologyQuestions } from './lesson2/lesson2-pathophysiology.js';
import { questions as dentalMaterialsQuestions } from './lesson2/lesson2-dental-materials-theory.js';
import { questions as periodontologyQuestions } from './lesson2/lesson2-periodontology-i.js';
import { questions as anatomyQuestions } from './lesson2/lesson2-head-and-neck-anatomy.js';
import { questions as pharmacologyQuestions } from './lesson2/lesson2-pharmacology.js';
import { questions as oralHealthEducationQuestions } from './lesson2/lesson2-oral-health-education.js';
import { questions as dentalHygieneTheory2Questions } from './lesson2/lesson2-dental-hygiene-theory-ii.js';

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
  ...radiographyTheoryQuestions,
  ...pathophysiologyQuestions,
  ...dentalMaterialsQuestions,
  ...periodontologyQuestions,
  ...anatomyQuestions,
  ...pharmacologyQuestions,
  ...oralHealthEducationQuestions,
  ...dentalHygieneTheory2Questions,
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
  radiographyTheoryQuestions,
  pathophysiologyQuestions,
  dentalMaterialsQuestions,
  periodontologyQuestions,
  anatomyQuestions,
  pharmacologyQuestions,
  oralHealthEducationQuestions,
  dentalHygieneTheory2Questions,
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
    "Dental Hygiene Theory II",
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
    "6. Career Development and Job Search",
    "6. Career Development and Job Search (Case Study)",
    "7. Dental Practice Management",
    "7. Dental Practice Management (Case Study)",
    "8. Teledentistry",
    "8. Teledentistry (Case Study)"
  ],
  "Community and Public Health": [
    "1. Community Oral Health",
    "1. Community Oral Health (Case Study)",
    "2. Health Behavior Change",
    "2. Health Behavior Change (Case Study)",
    "3. Inclusive Patient Care",
    "3. Inclusive Patient Care (Case Study)"
  ],
  "Infection Control and Safety": [
    "1. Infection Control",
    "1. Infection Control (Case Study)",
    "2. Medical Emergencies in Dentistry",
    "2. Medical Emergencies in Dentistry (Case Study)"
  ],
  "Clinical Environment and Ergonomics": [
    "1. Dental Hygiene Practice Settings",
    "1. Dental Hygiene Practice Settings (Case Study)",
    "2. Ergonomics and Workplace Injuries",
    "2. Ergonomics and Workplace Injuries (Case Study)"
  ],
  "Patient Assessment and Health History": [
    "1. Patient Health Histories",
    "1. Patient Health Histories (Case Study)",
    "2. Vital Signs Assessment",
    "2. Vital Signs Assessment (Case Study)",
    "3. Medication History",
    "3. Medication History (Case Study)",
    "4. Head and Neck Examination",
    "4. Head and Neck Examination (Case Study)"
  ],
  "Oral Assessment and Diagnosis": [
    "1. Tooth Assessment and Charting",
    "1. Tooth Assessment and Charting (Case Study)",
    "2. Plaque, Calculus, and Stain Assessment",
    "2. Plaque, Calculus, and Stain Assessment (Case Study)",
    "3. Caries Risk Assessment and Management",
    "3. Caries Risk Assessment and Management (Case Study)",
    "4. Periodontal Assessment and Charting",
    "4. Periodontal Assessment and Charting (Case Study)",
    "5. Oral-Systemic Health",
    "5. Oral-Systemic Health (Case Study)",
    "6. Dental Hygiene Diagnosis",
    "6. Dental Hygiene Diagnosis (Case Study)"
  ],
  "Care Planning and Documentation": [
    "1. Care Planning, Evaluation, and Documentation",
    "1. Care Planning, Evaluation, and Documentation (Case Study)"
  ],
  "Preventive Care and Patient Education": [
    "1. Toothbrushing Techniques",
    "1. Toothbrushing Techniques (Case Study)",
    "2. Interdental and Oral Care Aids",
    "2. Interdental and Oral Care Aids (Case Study)",
    "3. Toothpaste Products",
    "3. Toothpaste Products (Case Study)",
    "4. Antimicrobial Therapy for Periodontal Disease",
    "4. Antimicrobial Therapy for Periodontal Disease (Case Study)",
    "5. Dental Sealants",
    "5. Dental Sealants (Case Study)",
    "6. Nutrition Counseling",
    "6. Nutrition Counseling (Case Study)",
    "7. Tobacco Cessation Counseling",
    "7. Tobacco Cessation Counseling (Case Study)"
  ],
  "Instrumentation and Clinical Procedures": [
    "1. Hand Instrumentation",
    "1. Hand Instrumentation (Case Study)",
    "2. Ultrasonic Instrumentation",
    "2. Ultrasonic Instrumentation (Case Study)",
    "3. Root Anatomy for Instrumentation",
    "3. Root Anatomy for Instrumentation (Case Study)",
    "4. Tooth Polishing and Whitening",
    "4. Tooth Polishing and Whitening (Case Study)",
    "5. Dental Impressions and Oral Appliances",
    "5. Dental Impressions and Oral Appliances (Case Study)"
  ],
  "Periodontal Therapy": [
    "1. Nonsurgical Periodontal Therapy Decisions",
    "1. Nonsurgical Periodontal Therapy Decisions (Case Study)",
    "2. Acute Periodontal Conditions",
    "2. Acute Periodontal Conditions (Case Study)"
  ],
  "Restorative and Specialty Care": [
    "1. Dental Implants and Implant Care",
    "1. Dental Implants and Implant Care (Case Study)",
    "2. Restorative Dental Care",
    "2. Restorative Dental Care (Case Study)",
    "3. Orthodontic Care",
    "3. Orthodontic Care (Case Study)",
    "4. Dental Prostheses",
    "4. Dental Prostheses (Case Study)",
    "5. Tooth Sensitivity",
    "5. Tooth Sensitivity (Case Study)"
  ],
  "Pain and Anxiety Management": [
    "1. Local Anesthesia",
    "1. Local Anesthesia (Case Study 1)",
    "1. Local Anesthesia (Case Study 2)",
    "2. Nitrous Oxide Sedation",
    "2. Nitrous Oxide Sedation (Case Study)"
  ],
  "Special Populations": [
    "1. Pediatric and Adolescent Care",
    "1. Pediatric and Adolescent Care (Case Study)",
    "2. Pregnancy and Oral Health",
    "2. Pregnancy and Oral Health (Case Study)",
    "3. Geriatric Dental Care",
    "3. Geriatric Dental Care (Case Study)",
    "4. Palliative Oral Care",
    "4. Palliative Oral Care (Case Study)",
    "5. Child Abuse and Family Violence",
    "5. Child Abuse and Family Violence (Case Study)",
    "6. Disability and Access to Care",
    "6. Disability and Access to Care (Case Study)",
    "7. Intellectual and Developmental Disabilities",
    "7. Intellectual and Developmental Disabilities (Case Study)",
    "8. Orofacial Cleft Conditions",
    "8. Orofacial Cleft Conditions (Case Study)",
    "9. Neurologic Disabilities",
    "9. Neurologic Disabilities (Case Study)"
  ],
  "Medical Conditions and Systemic Diseases": [
    "1. Cardiovascular Disease and Oral Health",
    "1. Cardiovascular Disease and Oral Health (Case Study)",
    "2. Diabetes and Oral Health",
    "2. Diabetes and Oral Health (Case Study)",
    "3. Cancer and Oral Care",
    "3. Cancer and Oral Care (Case Study)",
    "4. HIV and Oral Health",
    "4. HIV and Oral Health (Case Study)",
    "5. Autoimmune Diseases",
    "5. Autoimmune Diseases (Case Study)",
    "6. Organ Transplant and Kidney Disease",
    "6. Organ Transplant and Kidney Disease (Case Study)",
    "7. Respiratory Diseases",
    "7. Respiratory Diseases (Case Study)",
    "8. Substance Use Disorders",
    "8. Substance Use Disorders (Case Study)",
    "9. Eating Disorders",
    "9. Eating Disorders (Case Study)"
  ],
  "Mental Health and Well-Being": [
    "1. Mental Health and Self-Care",
    "1. Mental Health and Self-Care (Case Study)"
  ],
    "2 - Professional Foundations and Communication": [
    "1. Role of the Dental Hygienist",
    "1. Role of the Dental Hygienist (Case Study)",
    "2. Evidence-Based Practice Basics",
    "2. Evidence-Based Practice Basics (Case Study)",
    "3. Patient Communication Skills",
    "3. Patient Communication Skills (Case Study)",
    "4. Dental Hygiene in Alternative Settings",
    "4. Dental Hygiene in Alternative Settings (Case Study)"
  ],

  "2 - Infection Control and Safety": [
    "1. Infectious Diseases and Infection Control",
    "1. Infectious Diseases and Infection Control (Case Study)",
    "2. Protective Barriers for Safety",
    "2. Protective Barriers for Safety (Case Study)",
    "3. Infection Control in Clinical Care",
    "3. Infection Control in Clinical Care (Case Study)",
    "4. Dental Emergencies",
    "4. Dental Emergencies (Case Study)"
  ],

  "2 - Clinical Environment and Documentation": [
    "1. Patient Reception and Ergonomics",
    "1. Patient Reception and Ergonomics (Case Study)",
    "2. Dental Hygiene Documentation",
    "2. Dental Hygiene Documentation (Case Study)"
  ],

  "2 - Patient Assessment and Health History": [
    "1. Patient Health Histories 2",
    "1. Patient Health Histories 2 (Case Study)",
    "2. Measuring Vital Signs",
    "2. Measuring Vital Signs (Case Study)",
    "3. Oral and Facial Examination",
    "3. Oral and Facial Examination (Case Study)"
  ],

  "2 - Imaging and Diagnostic Methods": [
    "1. Dental X-Rays",
    "1. Dental X-Rays (Case Study)",
    "2. Dental Indices and Scoring",
    "2. Dental Indices and Scoring (Case Study)",
    "3. Dental Hygiene Diagnosis",
    "3. Dental Hygiene Diagnosis (Case Study)"
  ],

  "2 - Oral Anatomy and Disease Processes": [
    "1. Tooth Structure Examination",
    "1. Tooth Structure Examination (Case Study)",
    "2. Plaque, Calculus, and Stain",
    "2. Plaque, Calculus, and Stain (Case Study)",
    "3. Anatomy of the Periodontium",
    "3. Anatomy of the Periodontium (Case Study)",
    "4. Development of Periodontal Disease",
    "4. Development of Periodontal Disease (Case Study)"
  ],

  "2 - Periodontal Assessment and Therapy": [
    "1. Periodontal Assessment",
    "1. Periodontal Assessment (Case Study)",
    "2. Nonsurgical Periodontal Treatment",
    "2. Nonsurgical Periodontal Treatment (Case Study)",
    "3. Sutures and Periodontal Dressings",
    "3. Sutures and Periodontal Dressings (Case Study)"
  ],

  "2 - Care Planning and Evaluation": [
    "1. Care Planning in Dental Hygiene",
    "1. Care Planning in Dental Hygiene (Case Study)",
    "2. Patient Evaluation",
    "2. Patient Evaluation (Case Study)",
    "3. Ongoing and Recall Care",
    "3. Ongoing and Recall Care (Case Study)"
  ],

  "2 - Preventive Care and Patient Education": [
    "1. Patient Education and Behavior Change",
    "1. Patient Education and Behavior Change (Case Study)",
    "2. Caries Prevention and Control",
    "2. Caries Prevention and Control (Case Study)",
    "3. Toothbrushing and Oral Hygiene",
    "3. Toothbrushing and Oral Hygiene (Case Study)",
    "4. Interdental Cleaning Methods",
    "4. Interdental Cleaning Methods (Case Study)",
    "5. Toothpaste and Mouthrinses",
    "5. Toothpaste and Mouthrinses (Case Study)",
    "6. Nutrition and Diet Assessment",
    "6. Nutrition and Diet Assessment (Case Study)",
    "7. Fluoride Use",
    "7. Fluoride Use (Case Study)",
    "8. Dental Sealants",
    "8. Dental Sealants (Case Study)"
  ],

  "2 - Instrumentation & Clinical Procedures": [
    "1. Dental Instruments and Instrumentation",
    "1. Dental Instruments and Instrumentation (Case Study)",
    "2. Instrument Maintenance and Sharpening",
    "2. Instrument Maintenance and Sharpening (Case Study)",
    "3. Stain Removal Techniques",
    "3. Stain Removal Techniques (Case Study)",
    "4. Tooth Whitening",
    "4. Tooth Whitening (Case Study)"
  ],

  "2 - Pain, Anxiety and Sensitivity Management": [
    "1. Pain and Anxiety Management",
    "1. Pain and Anxiety Management (Case Study)",
    "2. Tooth Sensitivity",
    "2. Tooth Sensitivity (Case Study)"
  ],

  "2 - Special Oral Care Situations": [
    "1. Care for Orthodontic Patients",
    "1. Care for Orthodontic Patients (Case Study)",
    "2. Care of Dental Prostheses",
    "2. Care of Dental Prostheses (Case Study)",
    "3. Care of Dental Implant Patients",
    "3. Care of Dental Implant Patients (Case Study)",
    "4. Tobacco and Nicotine Use",
    "4. Tobacco and Nicotine Use (Case Study)"
  ],

  "2 - Special Populations": [
    "1. Family and Domestic Violence Awareness",
    "1. Family and Domestic Violence Awareness (Case Study)",
    "2. Care of Pregnant Patients and Infants",
    "2. Care of Pregnant Patients and Infants (Case Study)",
    "3. Pediatric Dental Hygiene",
    "3. Pediatric Dental Hygiene (Case Study)",
    "4. Geriatric Dental Hygiene",
    "4. Geriatric Dental Hygiene (Case Study)",
    "5. Care of Patients with Cleft Lip or Palate",
    "5. Care of Patients with Cleft Lip or Palate (Case Study)",
    "6. Neurodevelopmental Disorders",
    "6. Neurodevelopmental Disorders (Case Study)",
    "7. Dental Care for Patients with Disabilities",
    "7. Dental Care for Patients with Disabilities (Case Study)"
  ],

  "2 - Medical Conditions Affecting Dental Care": [
    "1. Neurologic Disorders and Stroke",
    "1. Neurologic Disorders and Stroke (Case Study)",
    "2. Endocrine Disorders",
    "2. Endocrine Disorders (Case Study)",
    "3. Diabetes and Oral Health",
    "3. Diabetes and Oral Health (Case Study)",
    "4. Cancer and Oral Care",
    "4. Cancer and Oral Care (Case Study)",
    "5. Oral and Maxillofacial Surgery Care",
    "5. Oral and Maxillofacial Surgery Care (Case Study)",
    "6. Seizure Disorders",
    "6. Seizure Disorders (Case Study)",
    "7. Mental Health Disorders",
    "7. Mental Health Disorders (Case Study)",
    "8. Substance Use Disorders 2",
    "8. Substance Use Disorders 2 (Case Study)",
    "9. Respiratory Diseases",
    "9. Respiratory Diseases (Case Study)",
    "10. Cardiovascular Diseases (Case Study)",
    "10. Cardiovascular Diseases",
    "11. Blood Disorders",
    "11. Blood Disorders (Case Study)",
    "12. Autoimmune Diseases",
    "12. Autoimmune Diseases (Case Study)"
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
    "6. Blood and Circulatory System Disorders",
    "7. Cardiovascular System (Part 1)",
    "7. Cardiovascular System (Part 2)",    
    "8. Respiratory System Disorders (Part 1)",
    "8. Respiratory System Disorders (Part 2)",
    "9. Digestive System Disorders (Part 1)",
    "9. Digestive System Disorders (Part 2)",
    "10. Endocrine System Disorders",
    "11. Neoplasms and Cancer"
  ],
  "Dental Hygiene Theory II": [
    "1-1. Medical and Dental History",
    "1-2. Vitals",
    "2. Hard Tissue Assessment",
    "3-1. Extraoral and Intraoral Clinical Assessment",
    "3-2. Soft Tissue",
    "4. Periodontal Assessments",
    "5-1. Soft Deposits, Biofilm, Calculus and Stain",
    "5-2. Assessment of Stains and Deposit",
    "6-1. Oral Systemic Health Connection",
    "6-2. Dental Hygiene Diagnosis",
    "7. Care Plan",
    "8. Ultrasonic",
    "9. Dentinal Hypersensitivity",
    "10. Polishing and Whitening",
    "11. Handpiece Maintenance",    
    "12. Local Anesthetic",
    "13. Pit Fissure Sealants",
    "14. Rubber Dam"
  ],
    "Dental Materials Theory": [
    "1. Introduction to Dental Materials and Oral environment and patient considerations",
    "2. Physical and Mechanical properties of dental materials and General handling and safety of dental materials in the dental office",
    "3. Dental amalgams, Metals and Alloys (Part 1)",
    "3. Dental amalgams, Metals and Alloys (Part 2)",
    "3. Dental amalgams, Metals and Alloys (Part 3)",
    "4. Composites (Part 1)",
    "4. Composites (Part 2)",
    "4. Composites (Part 3)",
    "5. Glass Ionomers and Compomers",
    "7. Preventive and Abrasive (Part 1)",
    "7. Preventive and Abrasive (Part 2)",
    "8. Teeth Whitening Materials and Corrective Appliances",
    "9. Dental Dam and Implants (Part 1)",
    "9. Dental Dam and Implants (Part 2)",
    "10. Dental Cements"
  ],
  "Periodontology I": [
    "1. Periodontal Anatomy",
    "2. The microbiology of periodontal diseases",
    "3. Calculus and other disease associated factors",
    "4. Gingival diseases",
    "5. Periodontal diseases",
    "5. Periodontal diseases (Case Study)",
    "6. Systemic diseases and periodontal health",
    "7. TMD and Periodontal Diseases",
    "8. Periodontal Diseases and Risk Assessment"
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
    "3. Clinical Case Applications and Patient Care Scenarios",
    "7-1. Local Anesthetic"
  ],
  "Oral Health Education": [
    "1. Soft and Hard Deposits",
    "2. Toothbrushing",
    "3. Interdental & Supplemental Self-Care Aids",
    "4. Dentifrices",
    "4. Mouthrinse Comparison",
    "4. Sensodyne ProNamel Product Table",
    "5. Denture",
    "6. A String around Your Finger",
    "7. Toothbrushing",
    "8. Rinsing Recommendations"
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
    oralHealthEducation: {
      name: 'Oral Health Education',
      topics: 10,
      totalQuestions: 948,
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
