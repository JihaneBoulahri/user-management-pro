export class Toast {

  static show(message, type = 'info') {
    const toast = document.createElement('div');

    toast.className = 'toast ' + type;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  static success(msg) {
    this.show(msg, 'success');
  }

  static error(msg) {
    this.show(msg, 'error');
  }

  static info(msg) {
    this.show(msg, 'info');
  }
}
