import { motion } from 'framer-motion';
import './CakePreview.css';

function CakePreview({ shape = 'round', tiers = 1, decoration = 'buttercream' }) {
    // Color schemes based on decoration type
    const decorationColors = {
        marzipan: { primary: '#FFE5B4', secondary: '#FFD700', accent: '#FFA500' },
        chocolate: { primary: '#8B4513', secondary: '#654321', accent: '#D2691E' },
        fondant: { primary: '#FFB6C1', secondary: '#FF69B4', accent: '#FF1493' },
        buttercream: { primary: '#FFF8DC', secondary: '#FFE4B5', accent: '#FFDAB9' }
    };

    const colors = decorationColors[decoration] || decorationColors.buttercream;

    // Generate tiers array
    const tiersArray = Array.from({ length: tiers }, (_, i) => i);

    // Calculate tier sizes (each tier is smaller than the one below)
    const getTierSize = (tierIndex) => {
        const baseSize = 100;
        const reduction = 20;
        return baseSize - (tierIndex * reduction);
    };

    // Get shape class
    const getShapeClass = () => {
        switch (shape) {
            case 'round': return 'cake-tier-round';
            case 'square': return 'cake-tier-square';
            case 'heart': return 'cake-tier-heart';
            case 'rectangle': return 'cake-tier-rectangle';
            case 'hexagon': return 'cake-tier-hexagon';
            default: return 'cake-tier-round';
        }
    };

    return (
        <div className="cake-preview-container">
            <motion.div
                className="cake-preview"
                initial={{ scale: 0, rotateY: 0 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ duration: 1, type: "spring" }}
            >
                <div className="cake-stack">
                    {tiersArray.reverse().map((tierIndex) => (
                        <motion.div
                            key={tierIndex}
                            className="tier-wrapper"
                            initial={{ y: -100, opacity: 0, rotateX: -90 }}
                            animate={{ y: 0, opacity: 1, rotateX: 0 }}
                            transition={{
                                delay: tierIndex * 0.2,
                                type: "spring",
                                stiffness: 100
                            }}
                        >
                            <motion.div
                                className={`cake-tier ${getShapeClass()}`}
                                style={{
                                    width: `${getTierSize(tierIndex)}%`,
                                    height: `${60 + tierIndex * 10}px`,
                                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    rotateY: 5,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                {/* Decorative frosting lines */}
                                <div className="frosting-lines">
                                    {[...Array(3)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="frosting-line"
                                            style={{
                                                background: colors.accent,
                                                top: `${25 + i * 25}%`
                                            }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Cake topper */}
                <motion.div
                    className="cake-topper"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: tiers * 0.2 + 0.3, type: "spring" }}
                >
                    🎂
                </motion.div>

                {/* Sparkles */}
                <div className="sparkles">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="sparkle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                            }}
                        >
                            ✨
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Preview Label */}
            <motion.p
                className="preview-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                Din tårta
            </motion.p>
        </div>
    );
}

export default CakePreview;
