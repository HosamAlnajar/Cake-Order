import { motion } from 'framer-motion';
import './StepStyles.css';

function DeliveryMethodStep({ formData, updateFormData, nextStep, prevStep }) {
    const deliveryOptions = [
        {
            id: 'delivery',
            icon: '🚚',
            title: 'Leverans',
            description: 'Vi levererar tårtan till din dörr'
        },
        {
            id: 'pickup',
            icon: '🏠',
            title: 'Hämtas av kunden',
            description: 'Du hämtar tårtan i vårt bageri'
        }
    ];

    const handleSelect = (method) => {
        updateFormData({ deliveryMethod: method });
    };

    const handleNext = () => {
        if (formData.deliveryMethod) {
            nextStep();
        } else {
            alert('Vänligen välj ett leveranssätt');
        }
    };

    return (
        <div className="step-content">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <h2 className="step-title">Leveranssätt</h2>
                <p className="step-description">
                    Hur vill du få din tårta?
                </p>
            </motion.div>

            <div className="options-grid">
                {deliveryOptions.map((option, index) => (
                    <motion.div
                        key={option.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`option-card ${formData.deliveryMethod === option.id ? 'selected' : ''}`}
                        onClick={() => handleSelect(option.id)}
                    >
                        <div className="option-icon">{option.icon}</div>
                        <h3 className="option-title">{option.title}</h3>
                        <p className="option-description">{option.description}</p>
                        {formData.deliveryMethod === option.id && (
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

            {formData.deliveryMethod === 'delivery' && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="delivery-info"
                >
                    <p className="info-text">
                        📍 Leveransadress: <strong>{formData.address}</strong>
                    </p>
                    <p className="info-note">
                        Leveranskostnad beräknas baserat på avstånd
                    </p>
                </motion.div>
            )}

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

export default DeliveryMethodStep;
