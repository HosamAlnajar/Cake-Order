import { motion } from 'framer-motion';
import './StepStyles.css';

function CakeBaseStep({ formData, updateFormData, nextStep, prevStep }) {
    const baseOptions = [
        { id: 'chocolate', label: 'Choklad', icon: '🍫', description: 'Rik chokladbotten' },
        { id: 'vanilla', label: 'Vanilj', icon: '🌼', description: 'Klassisk vaniljbotten' },
        { id: 'special', label: 'Special', icon: '⭐', description: 'Chefens specialrecept' }
    ];

    const handleNext = () => {
        if (formData.cakeBase) {
            nextStep();
        } else {
            alert('Vänligen välj tårtbotten');
        }
    };

    return (
        <div className="step-content">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <h2 className="step-title">Tårtbotten</h2>
                <p className="step-description">
                    Välj smak på tårtbotten
                </p>
            </motion.div>

            <div className="options-grid">
                {baseOptions.map((option, index) => (
                    <motion.div
                        key={option.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`option-card ${formData.cakeBase === option.id ? 'selected' : ''}`}
                        onClick={() => updateFormData({ cakeBase: option.id })}
                    >
                        <div className="option-icon">{option.icon}</div>
                        <h3 className="option-title">{option.label}</h3>
                        <p className="option-description">{option.description}</p>
                        {formData.cakeBase === option.id && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="selected-badge"
                            >
                                ✓
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>

            <div className="step-navigation">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-outline"
                    onClick={prevStep}
                >
                    ← Tillbaka
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary"
                    onClick={handleNext}
                >
                    Nästa →
                </motion.button>
            </div>
        </div>
    );
}

export default CakeBaseStep;
