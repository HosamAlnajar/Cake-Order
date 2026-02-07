import { motion } from 'framer-motion';
import './StepStyles.css';

function CustomerInfoStep({ formData, updateFormData, nextStep, prevStep }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.phone && formData.address) {
            nextStep();
        } else {
            alert('Vänligen fyll i alla fält');
        }
    };

    return (
        <div className="step-content">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <h2 className="step-title">Kunduppgifter</h2>
                <p className="step-description">
                    Berätta lite om dig själv så att vi kan kontakta dig
                </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="form">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="form-group"
                >
                    <label className="form-label">Namn *</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Ditt fullständiga namn"
                        value={formData.name}
                        onChange={(e) => updateFormData({ name: e.target.value })}
                        required
                    />
                </motion.div>

                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="form-group"
                >
                    <label className="form-label">E-post *</label>
                    <input
                        type="email"
                        className="form-input"
                        placeholder="din@email.se"
                        value={formData.email}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        required
                    />
                </motion.div>

                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="form-group"
                >
                    <label className="form-label">Telefonnummer *</label>
                    <input
                        type="tel"
                        className="form-input"
                        placeholder="070-123 45 67"
                        value={formData.phone}
                        onChange={(e) => updateFormData({ phone: e.target.value })}
                        required
                    />
                </motion.div>

                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="form-group"
                >
                    <label className="form-label">Adress *</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Gatuadress, Postnummer, Stad"
                        value={formData.address}
                        onChange={(e) => updateFormData({ address: e.target.value })}
                        required
                    />
                </motion.div>

                <div className="step-navigation">
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-outline"
                        onClick={prevStep}
                    >
                        ← Tillbaka
                    </motion.button>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-primary"
                    >
                        Nästa →
                    </motion.button>
                </div>
            </form>
        </div>
    );
}

export default CustomerInfoStep;
