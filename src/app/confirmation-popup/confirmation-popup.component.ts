import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-confirmation-popup',
  imports: [],
  templateUrl: './confirmation-popup.component.html',
  styleUrl: './confirmation-popup.component.css',
})
export class ConfirmationPopupComponent {

  popUpText = "";
  visible = signal(false);
  private confirmCallback?: () => void;

  hasConfirmFunction() {
    return !!this.confirmCallback;
  }

  showMessage(message: string, onConfirm?: () => void) {
    this.popUpText = message;
    this.confirmCallback = onConfirm;
    this.visible.set(true);
  }

  confirmAction() {
    this.confirmCallback?.();
    this.close();
  }

  close() {
    this.visible.set(false);
  }
}
