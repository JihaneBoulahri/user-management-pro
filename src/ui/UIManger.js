import { Toast } from './Toast.js';

export class UIManager {
  constructor(userManager) {
    this.userManager = userManager;

    this.form = document.getElementById('user-form');
    this.tbody = document.querySelector('#users-table tbody');
    this.btnAdd = document.getElementById('submit-btn');
    this.btnCancel = document.getElementById('cancel-btn');

    this.inputId = document.getElementById('user-id');
    this.inputName = document.getElementById('name');
    this.inputEmail = document.getElementById('email');
    this.inputAge = document.getElementById('age');

    this.setupEvents();
    this.showUsers();
  }

  setupEvents() {
    this.form.addEventListener('submit', async (event) => {
      event.preventDefault();
      this.saveUser();
    });

    this.btnCancel.addEventListener('click', () => {
      this.clearForm();
    });

    this.tbody.addEventListener('click', async (event) => {
      const button = event.target.closest('button');
      if (!button) return;

      const id = Number(button.dataset.id);

      if (button.classList.contains('edit')) {
        this.fillForm(id);
      }

      if (button.classList.contains('delete')) {
        const ok = confirm("Supprimer l'utilisateur ?");
        if (!ok) return;
        await this.userManager.deleteUser(id);
        Toast.success("Utilisateur supprimé");
        this.showUsers();
      }
    });
  }

  async saveUser() {
    const id = this.inputId.value;
    const userData = {
      name: this.inputName.value,
      email: this.inputEmail.value,
      age: Number(this.inputAge.value)
    };

    try {
      if (id) {
        await this.userManager.updateUser(Number(id), userData);
        Toast.success("Utilisateur mis à jour");
      } else {
        await this.userManager.addUser(userData);
        Toast.success("Utilisateur ajouté");
      }

      this.clearForm();
      this.showUsers();
    } catch (err) {
      Toast.error(err.message);
    }
  }

  fillForm(id) {
    const user = this.userManager.getUser(id);

    this.inputId.value = user.id;
    this.inputName.value = user.name;
    this.inputEmail.value = user.email;
    this.inputAge.value = user.age;

    this.btnAdd.textContent = "Mettre à jour";
  }

  clearForm() {
    this.form.reset();
    this.inputId.value = "";
    this.btnAdd.textContent = "Ajouter";
  }

  showUsers() {
    const users = this.userManager.getAll();
    this.tbody.innerHTML = "";

    if (users.length === 0) {
      this.tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#777;">Aucun utilisateur</td></tr>`;
      return;
    }

    users.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>
          <button class="edit" data-id="${user.id}">Modifier</button>
          <button class="delete" data-id="${user.id}">Supprimer</button>
        </td>
      `;
      this.tbody.appendChild(row);
    });
  }
}
