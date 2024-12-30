// api.js

const API_URL = 'https://djape-music-lab.onrender.com';

// Generate Music from Backend
export const generateMusic = async (prompt) => {
    try {
        const response = await fetch(`${API_URL}/generate-music/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error(`Failed to generate music: ${response.statusText}`);
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error generating music:', error);
        alert('Failed to generate music. Please try again.');
    }
};
