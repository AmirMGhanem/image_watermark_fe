import { useState } from 'react';
import styles from './PhotoCard.module.css'; // Import the CSS module
import apiClient from '../../../config/axiosConfig';


export default function PhotoCard({ imageSrc, onNameChange, onDescriptionChange }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
        onNameChange && onNameChange(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        onDescriptionChange && onDescriptionChange(e.target.value);
    };

    const analyzeImage = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.get('/', { imageUrl: imageSrc });
            console.log('response', response);
            if(response.data && response.data.description) {
                setDescription(response.data.description);
            }
            else{
                alert('No description found');
            
            }
        } catch (error) {
            console.error('Error analyzing image:', error);
            alert('Error analyzing image');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.photoCard}>
            <img src={imageSrc} alt="photo" className={styles.photoImage} />
            <div className={styles.inputGroup}>
                <label className={styles.label}>
                    Enter name:
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className={styles.textInput}
                    />
                </label>
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>
                    Enter description:
                    <textarea
                        value={description}
                        onChange={handleDescriptionChange}
                        className={styles.textArea}
                    />
                </label>
            </div>

            <div>
                <button
                    onClick={analyzeImage}
                    disabled={isLoading}
                    className={styles.analyzeButton}
                >
                    {isLoading ? 'Analyzing...' : 'Describe'}
                </button>
            </div>
        </div>
    );
}
