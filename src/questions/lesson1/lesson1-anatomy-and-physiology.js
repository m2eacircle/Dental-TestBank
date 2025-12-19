// Lesson 1 - Anatomy and Physiology
// 13 topics covering human body systems

export const questions = {
  "1. Introduction to the Human Body": [
    { id: 20001, question: "Which of the following best defines anatomy?", options: ["The branch of science that describes how the body functions", "The branch of science that studies the structure of the body", "The study of homeostatic mechanisms", "The study of disease processes"], correct: 1 },
    { id: 20002, question: "What is the relationship between structure and function in the human body?", options: ["They are unrelated concepts", "Function determines structure only", "Structure and function are closely related", "Structure determines function only"], correct: 2 },
    { id: 20003, question: "Which represents the correct order of organization from simple to complex?", options: ["Cells, atoms, molecules, tissues, organs, systems", "Atoms, molecules, cells, tissues, organs, systems, human organism", "Molecules, atoms, tissues, cells, organs, systems", "Tissues, cells, molecules, atoms, systems, organs"], correct: 1 },
    { id: 20004, question: "Which of the following is NOT one of the major organ systems?", options: ["Integumentary system", "Lymphatic system", "Vascular system", "Reproductive system"], correct: 2 },
    { id: 20005, question: "What does homeostasis refer to?", options: ["The body's ability to maintain a stable internal environment in response to a changing environment", "The process of cell division", "The anatomical position of the body", "The study of body cavities"], correct: 0 },
    { id: 20006, question: "What happens when homeostatic mechanisms fail?", options: ["The body functions more efficiently", "Homeostatic imbalance occurs, which is associated with various disorders", "Body temperature increases permanently", "All organ systems shut down immediately"], correct: 1 },
    { id: 20007, question: "In the anatomical position, which direction do the palms face?", options: ["Backward", "Toward the sides", "Forward", "Downward"], correct: 2 },
    { id: 20008, question: "Which of the following describes the anatomical position?", options: ["Lying down, face up, arms crossed", "Standing erect, face forward, arms at sides, toes and palms directed forward", "Sitting upright with hands on knees", "Standing with arms raised above head"], correct: 1 },
    { id: 20009, question: "The term \"superior\" means:", options: ["Toward the front", "Away from the midline", "Toward the head or upper part", "Toward the feet"], correct: 2 },
    { id: 20010, question: "Which pair of directional terms are opposites?", options: ["Superior and medial", "Anterior and lateral", "Proximal and distal", "Central and medial"], correct: 2 },
    { id: 20011, question: "The term \"anterior\" refers to:", options: ["Toward the back", "Toward the front", "Toward the side", "Toward the midline"], correct: 1 },
    { id: 20012, question: "\"Medial\" means:", options: ["Away from the body surface", "Toward the midline of the body", "Away from the midline of the body", "Toward the body surface"], correct: 1 },
    { id: 20013, question: "Which term describes a position closer to the point of attachment?", options: ["Distal", "Lateral", "Proximal", "Inferior"], correct: 2 },
    { id: 20014, question: "\"Superficial\" refers to:", options: ["Deep within the body", "Toward the body surface", "Away from the center", "Toward the feet"], correct: 1 },
    { id: 20015, question: "Which plane divides the body horizontally into upper and lower portions?", options: ["Sagittal plane", "Frontal plane", "Transverse plane", "Coronal plane"], correct: 2 },
    { id: 20016, question: "The sagittal plane divides the body into:", options: ["Upper and lower portions", "Right and left portions", "Anterior and posterior portions", "Superior and inferior portions"], correct: 1 },
    { id: 20017, question: "Which plane divides the body into anterior and posterior portions?", options: ["Transverse plane", "Sagittal plane", "Horizontal plane", "Frontal plane"], correct: 3 },
    { id: 20018, question: "The cranial cavity is part of which major body cavity?", options: ["Ventral cavity", "Thoracic cavity", "Dorsal cavity", "Abdominal cavity"], correct: 2 },
    { id: 20019, question: "Which cavity contains the spinal cord?", options: ["Cranial cavity", "Thoracic cavity", "Spinal (vertebral) cavity", "Pelvic cavity"], correct: 2 },
    { id: 20020, question: "The dorsal cavity consists of:", options: ["Thoracic and abdominal cavities", "Cranial and spinal cavities", "Pleural and pericardial cavities", "Abdominal and pelvic cavities"], correct: 1 },
    { id: 20021, question: "Which is NOT a component of the thoracic cavity?", options: ["Pleural cavities", "Mediastinum", "Pericardial cavity", "Abdominal cavity"], correct: 3 },
    { id: 20022, question: "The ventral cavity includes:", options: ["Only the thoracic cavity", "Cranial and spinal cavities", "Thoracic and abdominopelvic cavities", "Only the abdominal cavity"], correct: 2 },
    { id: 20023, question: "The pleural cavities are located within the:", options: ["Dorsal cavity", "Cranial cavity", "Abdominopelvic cavity", "Thoracic cavity"], correct: 3 },
    { id: 20024, question: "What is the mediastinum?", options: ["A region in the abdominopelvic cavity", "The central region of the thoracic cavity between the pleural cavities", "Part of the spinal cavity", "A membrane covering the lungs"], correct: 1 },
    { id: 20025, question: "How many quadrants is the abdominopelvic cavity divided into for clinical purposes?", options: ["Two", "Four", "Six", "Nine"], correct: 1 },
    { id: 20026, question: "How many regions can the abdominopelvic cavity be divided into?", options: ["Four", "Six", "Nine", "Twelve"], correct: 2 },
    { id: 20027, question: "Which regional term refers to the head?", options: ["Cervical", "Cephalic", "Buccal", "Orbital"], correct: 1 },
    { id: 20028, question: "The term \"brachial\" refers to which body region?", options: ["The neck", "The forearm", "The upper arm", "The wrist"], correct: 2 },
    { id: 20029, question: "Which term describes the front of the elbow?", options: ["Brachial", "Antecubital", "Axillary", "Carpal"], correct: 1 },
    { id: 20030, question: "The \"lumbar\" region refers to:", options: ["The lower back", "The upper back", "The neck", "The chest"], correct: 0 },
    { id: 20031, question: "Which term refers to the armpit region?", options: ["Brachial", "Sternal", "Axillary", "Pectoral"], correct: 2 },
    { id: 20032, question: "The term \"femoral\" refers to:", options: ["The lower leg", "The thigh", "The knee", "The foot"], correct: 1 },
    { id: 20033, question: "\"Patellar\" describes which body region?", options: ["The ankle", "The hip", "The kneecap", "The heel"], correct: 2 },
    { id: 20034, question: "The \"gluteal\" region is:", options: ["The thigh", "The buttocks", "The lower back", "The calf"], correct: 1 },
    { id: 20035, question: "Which term refers to the chest region?", options: ["Abdominal", "Pelvic", "Sternal", "Lumbar"], correct: 2 },
    { id: 20036, question: "The integumentary system includes:", options: ["Bones and joints", "Skin, hair, and nails", "Heart and blood vessels", "Lungs and airways"], correct: 1 },
    { id: 20037, question: "Which system provides the framework for the body?", options: ["Muscular system", "Integumentary system", "Skeletal system", "Nervous system"], correct: 2 },
    { id: 20038, question: "The primary function of the muscular system is:", options: ["Protection of internal organs", "Movement and heat production", "Hormone secretion", "Gas exchange"], correct: 1 },
    { id: 20039, question: "Which system controls body functions through electrical signals?", options: ["Endocrine system", "Circulatory system", "Nervous system", "Lymphatic system"], correct: 2 },
    { id: 20040, question: "The endocrine system functions by:", options: ["Producing electrical impulses", "Secreting hormones", "Pumping blood", "Filtering waste"], correct: 1 },
    { id: 20041, question: "Which system is responsible for transporting oxygen and nutrients?", options: ["Respiratory system", "Digestive system", "Circulatory system", "Lymphatic system"], correct: 2 },
    { id: 20042, question: "The lymphatic system's primary functions include:", options: ["Gas exchange and breathing", "Hormone production", "Fluid balance and immune defense", "Waste elimination"], correct: 2 },
    { id: 20043, question: "Which system is responsible for gas exchange?", options: ["Circulatory system", "Respiratory system", "Digestive system", "Urinary system"], correct: 1 },
    { id: 20044, question: "The digestive system's main function is:", options: ["Filtering blood", "Breaking down food and absorbing nutrients", "Producing hormones", "Defending against disease"], correct: 1 },
    { id: 20045, question: "Which system eliminates metabolic wastes and regulates fluid balance?", options: ["Digestive system", "Respiratory system", "Integumentary system", "Urinary system"], correct: 3 },
    { id: 20046, question: "The reproductive system's primary purpose is:", options: ["Hormone regulation only", "Production of offspring", "Waste elimination", "Temperature regulation"], correct: 1 },
    { id: 20047, question: "At which level of organization do atoms combine?", options: ["Tissue level", "Cellular level", "Molecular level", "Organ level"], correct: 2 },
    { id: 20048, question: "Tissues are formed by:", options: ["Groups of atoms", "Groups of similar cells", "Groups of organs", "Groups of molecules"], correct: 1 },
    { id: 20049, question: "Which level represents a group of different tissues working together?", options: ["System level", "Cellular level", "Organ level", "Organismal level"], correct: 2 },
    { id: 20050, question: "An organ system is:", options: ["A single organ functioning alone", "A group of cells with similar function", "A group of organs working together for a common purpose", "The basic unit of life"], correct: 2 },
    { id: 20051, question: "The highest level of structural organization is:", options: ["The organ system", "The organ", "The tissue", "The human organism"], correct: 3 }
  ],
  "2. Cells and Tissues": [
    // Questions to be added
  ],
  "3. Integumentary System": [
    // Questions to be added
  ],
  "4. Skeletal System": [
    // Questions to be added
  ],
  "5. Muscular System": [
    // Questions to be added
  ],
  "6. Nervous Tissue and Brain": [
    // Questions to be added
  ],
  "7. Spinal Cord and Peripheral Nerves": [
    // Questions to be added
  ],
  "8. Blood": [
    // Questions to be added
  ],
  "9. Anatomy and Function of the Heart": [
    // Questions to be added
  ],
  "10. Lymphatic System": [
    // Questions to be added
  ],
  "11. Endocrine System": [
    // Questions to be added
  ],
  "12. Digestive System": [
    // Questions to be added
  ],
  "13. Respiratory System": [
    // Questions to be added
  ]
};
