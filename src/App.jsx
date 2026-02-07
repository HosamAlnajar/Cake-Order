import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Import all step components
import WelcomeStep from './components/WelcomeStep';
import CustomerInfoStep from './components/CustomerInfoStep';
import DeliveryMethodStep from './components/DeliveryMethodStep';
import EventDateStep from './components/EventDateStep';
import CakeDesignStep from './components/CakeDesignStep';
import ExtrasStep from './components/ExtrasStep';
import ServingsStep from './components/ServingsStep';
import FillingStep from './components/FillingStep';
import CakeBaseStep from './components/CakeBaseStep';
import DecorationStep from './components/DecorationStep';
import NotesStep from './components/NotesStep';
import SummaryStep from './components/SummaryStep';
import ProgressBar from './components/ProgressBar';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Customer Info
    name: '',
    email: '',
    phone: '',
    address: '',

    // Delivery
    deliveryMethod: '', // 'delivery' or 'pickup'

    // Event
    eventDate: '',

    // Cake Design
    cakeShape: '', // 'round', 'square', 'heart', 'rectangle', 'hexagon'
    tiers: 1,

    // Extras
    extras: [], // ['cakepops', 'macarons', 'cookies']

    // Servings
    servings: '', // '8-10', '12', '16'

    // Filling
    filling: '', // 'vanilla', 'cream', 'both'

    // Base
    cakeBase: '', // 'chocolate', 'vanilla', 'special'

    // Decoration
    decoration: '', // 'marzipan', 'chocolate', 'fondant', 'buttercream'

    // Notes
    notes: '',
    uploadedImage: null,
  });

  const totalSteps = 12;

  const steps = [
    { component: WelcomeStep, title: 'Välkommen' },
    { component: CustomerInfoStep, title: 'Kundinfo' },
    { component: DeliveryMethodStep, title: 'Leverans' },
    { component: EventDateStep, title: 'Datum' },
    { component: CakeDesignStep, title: 'Design' },
    { component: ExtrasStep, title: 'Extra' },
    { component: ServingsStep, title: 'Portioner' },
    { component: FillingStep, title: 'Fyllning' },
    { component: CakeBaseStep, title: 'Botten' },
    { component: DecorationStep, title: 'Dekor' },
    { component: NotesStep, title: 'Önskemål' },
    { component: SummaryStep, title: 'Sammanfattning' },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data) => {
    setFormData({ ...formData, ...data });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a backend
    alert('Tack för din beställning! Vi kontaktar dig snart. 🎂');
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="header-content"
        >
          <h1 className="font-display text-gradient">🎂 Tårtbeställning</h1>
          <p className="header-subtitle">Designa din dröm tårta</p>
        </motion.div>
      </header>

      {/* Progress Bar */}
      {currentStep > 0 && (
        <ProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          steps={steps}
        />
      )}

      {/* Main Content */}
      <main className="app-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="step-container"
          >
            <CurrentStepComponent
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
              prevStep={prevStep}
              currentStep={currentStep}
              totalSteps={totalSteps}
              handleSubmit={handleSubmit}
            />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
