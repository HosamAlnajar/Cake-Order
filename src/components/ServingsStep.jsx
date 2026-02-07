import { motion } from 'framer-motion';
import './StepStyles.css';

function ServingsStep({ formData, updateFormData, nextStep, prevStep }) {
    const servingOptions = [
        { id: '8-10', label: '8-10 bitar', icon: '👥', description: 'Perfekt för mindre sällskap' },
        { id: '12', label: '12 bitar', icon: '👨‍👩‍👧‍👦', description: 'Passar för familjekalas' },
        { id: '16', label: '16 bitar', icon: '🎉', description: 'Stort party eller fest' }
    ];

    const handleNext = () => {
        if (formData.servings) {
            nextStep();
        } else {
            alert('Vänligen välj antal portioner');
        }
    };

    return (
        <div className="step-content">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <h2 className="step-title">Antal portioner</h2>
                <p className="step-description">
                    Hur många ska dela på tårtan?
                </p>
            </motion.div>

            <div className="options-grid">
                {servingOptions.map((option, index) => (
                    <motion.div
                        key={option.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`option-card ${formData.servings === option.id ? 'selected' : ''}`}
                        onClick={() => updateFormData({ servings: option.id })}
                    >
                        <div className="option-icon">{option.icon}</div>
                        <h3 className="option-title">{option.label}</h3>
                        <p className="option-description">{option.description}</p>
                        {formData.servings === option.id && (
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

export default ServingsStep;
