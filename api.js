// API URL (Update with your backend URL)
const API_URL = 'https://c4077dd2-52b3-41b5-a924-eef3de96a25c-00-1qrlpxpt2f9f8.kirk.replit.dev';

// Generate Music from Backend
export const generateMusic = async (prompt) => {
    try {
        const response = await fetch(`${API_URL}/generate-music/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error('Failed to generate music');
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error generating music:', error);
        alert('Failed to generate music. Please try again.');
    }
};
