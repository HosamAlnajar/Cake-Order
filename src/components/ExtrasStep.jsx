import { motion } from 'framer-motion';
import './StepStyles.css';

function ExtrasStep({ formData, updateFormData, nextStep, prevStep }) {
    const extras = [
        { id: 'cakepops', icon: '🍭', label: 'Cakepops', description: '12 st färgglada cakepops' },
        { id: 'macarons', icon: '🍪', label: 'Macarons', description: '20 st franska macarons' },
        { id: 'cookies', icon: '🍪', label: 'Cookies', description: '15 st dekorerade kakor' }
    ];

    const toggleExtra = (extraId) => {
        const currentExtras = formData.extras || [];
        if (currentExtras.includes(extraId)) {
            updateFormData({ extras: currentExtras.filter(e => e !== extraId) });
        } else {
            updateFormData({ extras: [...currentExtras, extraId] });
        }
    };

    return (
        <div className="step-content">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <h2 className="step-title">Extra godsaker</h2>
                <p className="step-description">
                    Vill du lägga till något extra? (Valfritt)
                </p>
            </motion.div>

            <div className="options-grid">
                {extras.map((extra, index) => (
                    <motion.div
                        key={extra.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`option-card ${(formData.extras || []).includes(extra.id) ? 'selected' : ''}`}
                        onClick={() => toggleExtra(extra.id)}
                    >
                        <div className="option-icon">{extra.icon}</div>
                        <h3 className="option-title">{extra.label}</h3>
                        <p className="option-description">{extra.description}</p>
                        {(formData.extras || []).includes(extra.id) && (
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

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="info-box"
            >
                <p className="info-text">
                    💡 Du kan välja flera alternativ eller hoppa över detta steg
                </p>
            </motion.div>

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
                    onClick={nextStep}
                >
                    Nästa →
                </motion.button>
            </div>
        </div>
    );
}

export default ExtrasStep;
