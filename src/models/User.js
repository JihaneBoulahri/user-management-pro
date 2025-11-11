import { ValidationError } from '../utils/errors.js';


export class User {
#id; #name; #email; #age;


constructor({ id, name, email, age }) {
    this.#id = id;
    this.#name = String(name ?? '').trim();
    this.#email = String(email ?? '').trim();
    this.#age = Number(age);
    this.validate();
}


validate() {
    if (!Number.isInteger(this.#id) || this.#id <= 0) {
        throw new ValidationError('ID invalide');
    }
    if (!this.#name || this.#name.length < 2) {
        throw new ValidationError('Le nom doit contenir au moins 2 caractères');
    }
    if (!this.#email || !this.#email.includes('@') || !this.#email.includes('.')) {
        throw new ValidationError('Format d\'email invalide');
    }
    if (!Number.isFinite(this.#age) || this.#age < 1 || this.#age > 120) {
        throw new ValidationError('L\'âge doit être entre 1 et 120');
    }
}


update(data = {}) {
    if (data.name !== undefined) this.#name = String(data.name).trim();
    if (data.email !== undefined) this.#email = String(data.email).trim();
    if (data.age !== undefined) this.#age = Number(data.age);
    this.validate();
}


toJSON() {
    return { id: this.#id, name: this.#name, email: this.#email, age: this.#age };
}


// getters
get id() { 
    return this.#id; 
}
get name() { 
    return this.#name; 
}
get email() { 
    return this.#email; 
}
get age() { 
    return this.#age; 
}
}