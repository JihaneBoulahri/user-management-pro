export const storage = {
    get(key) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    },


    set(key, value) {
        return new Promise((resolve) => {
            setTimeout(() => {
                localStorage.setItem(key, JSON.stringify(value));
                resolve();
            }, 80);
        });
    }
};