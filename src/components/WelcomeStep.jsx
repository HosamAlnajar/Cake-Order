import { motion } from 'framer-motion';
import './StepStyles.css';

function WelcomeStep({ nextStep }) {
    return (
        <div className="step-content welcome-step">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="welcome-icon"
            >
                🎂
            </motion.div>

            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-display text-gradient welcome-title"
            >
                Välkommen till vår tårtdesigner!
            </motion.h2>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="welcome-description"
            >
                Låt oss hjälpa dig att skapa den perfekta tårtan för ditt speciella tillfälle.
                Vi guidar dig steg för steg genom designprocessen.
            </motion.p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="welcome-features"
            >
                <div className="feature-item">
                    <span className="feature-icon">✨</span>
                    <span>Anpassningsbar design</span>
                </div>
                <div className="feature-item">
                    <span className="feature-icon">🎨</span>
                    <span>Många valmöjligheter</span>
                </div>
                <div className="feature-item">
                    <span className="feature-icon">🚚</span>
                    <span>Leverans eller upphämtning</span>
                </div>
            </motion.div>

            <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-large"
                onClick={nextStep}
            >
                Börja designa din tårta →
            </motion.button>
        </div>
    );
}

export default WelcomeStep;
