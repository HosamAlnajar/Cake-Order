import { motion } from 'framer-motion';
import './ProgressBar.css';

function ProgressBar({ currentStep, totalSteps, steps }) {
    const progress = (currentStep / (totalSteps - 1)) * 100;

    return (
        <div className="progress-container container">
            <div className="progress-bar">
                <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </div>

            <div className="progress-steps">
                {steps.slice(1).map((step, index) => (
                    <motion.div
                        key={index}
                        className={`progress-step ${index + 1 < currentStep ? 'completed' :
                                index + 1 === currentStep ? 'active' : ''
                            }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <div className="step-circle">
                            {index + 1 < currentStep ? '✓' : index + 1}
                        </div>
                        <span className="step-title">{step.title}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default ProgressBar;
