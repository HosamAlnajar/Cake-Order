import { motion } from 'framer-motion';
import { useState } from 'react';
import './StepStyles.css';

function NotesStep({ formData, updateFormData, nextStep, prevStep }) {
    const [dragOver, setDragOver] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            updateFormData({ uploadedImage: file });
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            updateFormData({ uploadedImage: file });
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    return (
        <div className="step-content">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <h2 className="step-title">Övriga önskemål</h2>
                <p className="step-description">
                    Berätta mer om hur du vill ha din tårta
                </p>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="form-group"
            >
                <label className="form-label">Speciella önskemål eller meddelande</label>
                <textarea
                    className="form-textarea"
                    placeholder="T.ex. text på tårtan, färgönskemål, allergier..."
                    value={formData.notes}
                    onChange={(e) => updateFormData({ notes: e.target.value })}
                    rows={5}
                />
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="form-group"
            >
                <label className="form-label">Ladda upp inspirationsbild (valfritt)</label>
                <div
                    className={`file-upload ${dragOver ? 'drag-over' : ''}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => document.getElementById('file-input').click()}
                >
                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    {formData.uploadedImage ? (
                        <div className="uploaded-file">
                            <span className="file-icon">📷</span>
                            <p className="file-name">{formData.uploadedImage.name}</p>
                            <p className="file-size">
                                {(formData.uploadedImage.size / 1024).toFixed(2)} KB
                            </p>
                        </div>
                    ) : (
                        <div className="upload-placeholder">
                            <span className="upload-icon">📸</span>
                            <p className="upload-text">Klicka eller dra en bild hit</p>
                            <p className="upload-hint">PNG, JPG upp till 10MB</p>
                        </div>
                    )}
                </div>
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

export default NotesStep;
