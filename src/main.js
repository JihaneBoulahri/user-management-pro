import { api } from './services/api.js';
import { UserManager } from './models/UserManager.js';
import { UIManager } from './ui/UIManger.js';
import { storage } from './services/storage.js';

async function init() {
  let stored = storage.get('users-v1');
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    try {
      const data = await api.get('../data.json');
      if (data && Array.isArray(data.users)) {
        await storage.set('users-v1', data.users);
      }
    } catch (err) {
      console.warn('Failed to load data.json', err);
    }
  }

  const manager = new UserManager();
  new UIManager(manager);
}

document.addEventListener('DOMContentLoaded', init);