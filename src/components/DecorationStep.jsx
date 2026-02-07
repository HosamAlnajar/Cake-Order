import { motion } from 'framer-motion';
import './StepStyles.css';

function DecorationStep({ formData, updateFormData, nextStep, prevStep }) {
    const decorationOptions = [
        { id: 'marzipan', label: 'Marsipan', icon: '🎨', description: 'Klassisk marsipantäckning', color: '#FFE5B4' },
        { id: 'chocolate', label: 'Choklad', icon: '🍫', description: 'Rik chokladglasyr', color: '#8B4513' },
        { id: 'fondant', label: 'Sockerpasta', icon: '🌸', description: 'Slät sockerpasta', color: '#FFB6C1' },
        { id: 'buttercream', label: 'Smörkräm', icon: '🧈', description: 'Krämig smörkräm', color: '#FFF8DC' }
    ];

    const handleNext = () => {
        if (formData.decoration) {
            nextStep();
        } else {
            alert('Vänligen välj dekoration');
        }
    };

    return (
        <div className="step-content">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <h2 className="step-title">Dekoration</h2>
                <p className="step-description">
                    Välj hur tårtan ska dekoreras
                </p>
            </motion.div>

            <div className="decoration-grid">
                {decorationOptions.map((option, index) => (
                    <motion.div
                        key={option.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`decoration-card ${formData.decoration === option.id ? 'selected' : ''}`}
                        onClick={() => updateFormData({ decoration: option.id })}
                        style={{
                            '--decoration-color': option.color
                        }}
                    >
                        <div className="decoration-preview" style={{ background: option.color }}>
                            <span className="decoration-icon">{option.icon}</span>
                        </div>
                        <div className="decoration-info">
                            <h3 className="option-title">{option.label}</h3>
                            <p className="option-description">{option.description}</p>
                        </div>
                        {formData.decoration === option.id && (
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

export default DecorationStep;
