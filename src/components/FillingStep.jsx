import { motion } from 'framer-motion';
import './StepStyles.css';

function FillingStep({ formData, updateFormData, nextStep, prevStep }) {
    const fillingOptions = [
        { id: 'vanilla', label: 'Vaniljkräm', icon: '🍦', description: 'Klassisk vaniljkräm' },
        { id: 'cream', label: 'Vispgrädde', icon: '🥛', description: 'Lätt och luftig grädde' },
        { id: 'both', label: 'Båda', icon: '✨', description: 'Kombination av båda' }
    ];

    const handleNext = () => {
        if (formData.filling) {
            nextStep();
        } else {
            alert('Vänligen välj fyllning');
        }
    };

    return (
        <div className="step-content">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <h2 className="step-title">Fyllning</h2>
                <p className="step-description">
                    Välj fyllning för din tårta
                </p>
            </motion.div>

            <div className="options-grid">
                {fillingOptions.map((option, index) => (
                    <motion.div
                        key={option.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`option-card ${formData.filling === option.id ? 'selected' : ''}`}
                        onClick={() => updateFormData({ filling: option.id })}
                    >
                        <div className="option-icon">{option.icon}</div>
                        <h3 className="option-title">{option.label}</h3>
                        <p className="option-description">{option.description}</p>
                        {formData.filling === option.id && (
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

export default FillingStep;
