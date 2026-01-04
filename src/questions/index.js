// Central export file for all question modules
// This file aggregates all question imports for easier management

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
  ]
};

// Export list of available lectures for the main screen
export const availableLectures = [
  "Board Exam",
  "Board Exam 2"
];
