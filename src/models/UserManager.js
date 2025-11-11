import { User } from './User.js';
import { storage } from '../services/storage.js';
import { NotFoundError } from '../utils/errors.js';


const STORAGE_KEY = 'users-v1';


export class UserManager {
#users = [];
#nextId = 1;


constructor() {
this.loadFromStorage();
}


loadFromStorage() {
const data = storage.get(STORAGE_KEY);
if (data && Array.isArray(data)) {
        this.#users = data.map(u => new User(u));
        if (this.#users.length > 0) {
            this.#nextId = Math.max(...this.#users.map(u => u.id)) + 1;
        }
    }
}


async save() {
return storage.set(STORAGE_KEY, this.#users.map(u => u.toJSON()));
}


async addUser(data) {
const id = this.#nextId++;
const user = new User({ id, ...data });
this.#users.push(user);
await this.save();
return user;
}


getUser(id) {
const u = this.#users.find(x => x.id === Number(id));
if (!u) throw new NotFoundError('Utilisateur introuvable');
return u;
}


async updateUser(id, data) {
const user = this.getUser(id);
user.update(data);
await this.save();
return user;
}


async deleteUser(id) {
const idx = this.#users.findIndex(x => x.id === Number(id));
if (idx === -1) throw new NotFoundError('Utilisateur introuvable');
this.#users.splice(idx, 1);
await this.save();
}


getAll() {
// return plain objects for UI convenience
return this.#users.map(u => u.toJSON());
}


}