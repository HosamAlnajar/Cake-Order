import { motion } from 'framer-motion';
import CakePreviewSVG from './CakePreviewSVG';
import { ShapeIcons } from './ShapeIcons';
import './StepStyles.css';

function CakeDesignStep({ formData, updateFormData, nextStep, prevStep }) {
    const shapes = [
        { id: 'round', icon: ShapeIcons.round, label: 'Rund' },
        { id: 'square', icon: ShapeIcons.square, label: 'Fyrkantig' },
        { id: 'heart', icon: ShapeIcons.heart, label: 'Hjärta' },
        { id: 'rectangle', icon: ShapeIcons.rectangle, label: 'Rektangel' },
        { id: 'hexagon', icon: ShapeIcons.hexagon, label: 'Hexagon' }
    ];

    const handleNext = () => {
        if (formData.cakeShape && formData.tiers) {
            nextStep();
        } else {
            alert('Vänligen välj form och antal våningar');
        }
    };

    return (
        <div className="step-content">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <h2 className="step-title">Tårtdesign</h2>
                <p className="step-description">
                    Välj form och antal våningar för din tårta
                </p>
            </motion.div>

            <div className="design-layout">
                {/* Cake Preview */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="preview-section"
                >
                    <CakePreviewSVG
                        shape={formData.cakeShape}
                        tiers={formData.tiers}
                        decoration={formData.decoration}
                    />
                </motion.div>

                {/* Controls */}
                <div className="controls-section">
                    {/* Shape Selection */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="control-title">Välj form</h3>
                        <div className="shape-grid">
                            {shapes.map((shape, index) => (
                                <motion.button
                                    key={shape.id}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4 + index * 0.05 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`shape-button ${formData.cakeShape === shape.id ? 'selected' : ''}`}
                                    onClick={() => updateFormData({ cakeShape: shape.id })}
                                >
                                    <span className="shape-icon">{shape.icon}</span>
                                    <span className="shape-label">{shape.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Tiers Selection */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-lg"
                    >
                        <h3 className="control-title">Antal våningar</h3>
                        <div className="tier-selector">
                            {[1, 2, 3, 4].map((tier) => (
                                <motion.button
                                    key={tier}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`tier-button ${formData.tiers === tier ? 'selected' : ''}`}
                                    onClick={() => updateFormData({ tiers: tier })}
                                >
                                    <span className="tier-number">{tier}</span>
                                    <span className="tier-label">våning{tier > 1 ? 'ar' : ''}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>
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

export default CakeDesignStep;
