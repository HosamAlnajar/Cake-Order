import { motion } from 'framer-motion';
import './StepStyles.css';

function EventDateStep({ formData, updateFormData, nextStep, prevStep }) {
    const handleNext = () => {
        if (formData.eventDate) {
            nextStep();
        } else {
            alert('Vänligen välj ett datum');
        }
    };

    // Get today's date in YYYY-MM-DD format for min attribute
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="step-content">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <h2 className="step-title">Datum för evenemang</h2>
                <p className="step-description">
                    När behöver du tårtan? 📅
                </p>
            </motion.div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="date-picker-container"
            >
                <div className="date-icon">🎉</div>
                <input
                    type="date"
                    className="form-input date-input"
                    value={formData.eventDate}
                    min={today}
                    onChange={(e) => updateFormData({ eventDate: e.target.value })}
                />
                {formData.eventDate && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="selected-date"
                    >
                        Valt datum: <strong>{new Date(formData.eventDate).toLocaleDateString('sv-SE', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</strong>
                    </motion.p>
                )}
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="info-box"
            >
                <p className="info-title">💡 Tips</p>
                <p className="info-text">
                    Vi rekommenderar att beställa minst 7 dagar i förväg för att säkerställa
                    tillgänglighet och bästa kvalitet.
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
                    onClick={handleNext}
                >
                    Nästa →
                </motion.button>
            </div>
        </div>
    );
}

export default EventDateStep;
