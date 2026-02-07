import { motion } from 'framer-motion';
import { useState } from 'react';
import CakePreviewSVG from './CakePreviewSVG';
import './StepStyles.css';

function SummaryStep({ formData, prevStep, handleSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            handleSubmit();
        }, 2000);
    };

    // Translation helpers
    const getShapeLabel = (shape) => {
        const labels = {
            round: 'Rund',
            square: 'Fyrkantig',
            heart: 'Hjärta',
            rectangle: 'Rektangel',
            hexagon: 'Hexagon'
        };
        return labels[shape] || shape;
    };

    const getFillingLabel = (filling) => {
        const labels = {
            vanilla: 'Vaniljkräm',
            cream: 'Vispgrädde',
            both: 'Båda'
        };
        return labels[filling] || filling;
    };

    const getBaseLabel = (base) => {
        const labels = {
            chocolate: 'Choklad',
            vanilla: 'Vanilj',
            special: 'Special'
        };
        return labels[base] || base;
    };

    const getDecorationLabel = (decoration) => {
        const labels = {
            marzipan: 'Marsipan',
            chocolate: 'Choklad',
            fondant: 'Sockerpasta',
            buttercream: 'Smörkräm'
        };
        return labels[decoration] || decoration;
    };

    const getExtrasLabel = (extras) => {
        const labels = {
            cakepops: 'Cakepops',
            macarons: 'Macarons',
            cookies: 'Cookies'
        };
        return extras.map(e => labels[e] || e).join(', ') || 'Inga extra';
    };

    if (isSuccess) {
        return (
            <div className="step-content success-screen">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="success-content"
                >
                    <div className="checkmark">✓</div>
                    <h2 className="success-title">Tack för din beställning!</h2>
                    <p className="success-message">
                        Vi har mottagit din beställning och kommer att kontakta dig inom 24 timmar
                        för att bekräfta detaljerna.
                    </p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="success-emoji"
                    >
                        🎂 🎉 ✨
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="step-content summary-step">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <h2 className="step-title">Sammanfattning</h2>
                <p className="step-description">
                    Kontrollera din beställning innan du skickar
                </p>
            </motion.div>

            <div className="summary-layout">
                {/* Cake Preview */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="summary-preview"
                >
                    <CakePreviewSVG
                        shape={formData.cakeShape}
                        tiers={formData.tiers}
                        decoration={formData.decoration}
                    />
                </motion.div>

                {/* Summary Details */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="summary-details"
                >
                    <div className="summary-section">
                        <h3 className="summary-section-title">👤 Kunduppgifter</h3>
                        <div className="summary-item">
                            <span className="summary-label">Namn:</span>
                            <span className="summary-value">{formData.name}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">E-post:</span>
                            <span className="summary-value">{formData.email}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Telefon:</span>
                            <span className="summary-value">{formData.phone}</span>
                        </div>
                    </div>

                    <div className="summary-section">
                        <h3 className="summary-section-title">🚚 Leverans</h3>
                        <div className="summary-item">
                            <span className="summary-label">Metod:</span>
                            <span className="summary-value">
                                {formData.deliveryMethod === 'delivery' ? 'Leverans' : 'Hämtas av kunden'}
                            </span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Datum:</span>
                            <span className="summary-value">
                                {new Date(formData.eventDate).toLocaleDateString('sv-SE')}
                            </span>
                        </div>
                    </div>

                    <div className="summary-section">
                        <h3 className="summary-section-title">🎂 Tårtdesign</h3>
                        <div className="summary-item">
                            <span className="summary-label">Form:</span>
                            <span className="summary-value">{getShapeLabel(formData.cakeShape)}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Våningar:</span>
                            <span className="summary-value">{formData.tiers}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Portioner:</span>
                            <span className="summary-value">{formData.servings} bitar</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Botten:</span>
                            <span className="summary-value">{getBaseLabel(formData.cakeBase)}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Fyllning:</span>
                            <span className="summary-value">{getFillingLabel(formData.filling)}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Dekoration:</span>
                            <span className="summary-value">{getDecorationLabel(formData.decoration)}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Extra:</span>
                            <span className="summary-value">{getExtrasLabel(formData.extras || [])}</span>
                        </div>
                    </div>

                    {formData.notes && (
                        <div className="summary-section">
                            <h3 className="summary-section-title">📝 Önskemål</h3>
                            <p className="summary-notes">{formData.notes}</p>
                        </div>
                    )}

                    {formData.uploadedImage && (
                        <div className="summary-section">
                            <h3 className="summary-section-title">📷 Uppladdad bild</h3>
                            <p className="summary-value">{formData.uploadedImage.name}</p>
                        </div>
                    )}
                </motion.div>
            </div>

            <div className="step-navigation">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-outline"
                    onClick={prevStep}
                    disabled={isSubmitting}
                >
                    ← Tillbaka
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary btn-submit"
                    onClick={onSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className="spinner" />
                            Skickar...
                        </>
                    ) : (
                        <>
                            Skicka beställning 🎉
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    );
}

export default SummaryStep;
