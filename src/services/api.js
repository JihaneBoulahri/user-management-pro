export const api = {
    async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            throw new NetworkError('Failed to fetch data');
        }
    }
};