import { EventEmitter, Injectable, Type } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { DialogPosition, PrimeNgAlerts, TOAST_TIME } from '../app-config';
import { ToastTypes } from '../app-toasts/app-toasts.component';

@Injectable({
  providedIn: 'platform',
})
export class AppAlertService {
  confirmAcceptedEvent = new EventEmitter<any>();

  position = DialogPosition.CENTER;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService
  ) {}

  private getMessageObject = (
    message: string,
    type: PrimeNgAlerts
  ): Message => {
    return {
      life: type === PrimeNgAlerts.ERROR ? TOAST_TIME + 3000 : TOAST_TIME,
      severity:
        type === PrimeNgAlerts.UNOBSTRUSIVE ? 'info' : type.toLocaleLowerCase(),
      detail: type === PrimeNgAlerts.ERROR ? message.toUpperCase() : message,
      key:
        type === PrimeNgAlerts.ERROR
          ? ToastTypes.Error
          : type === PrimeNgAlerts.UNOBSTRUSIVE
          ? ToastTypes.Unobstrusive
          : ToastTypes.General,
    };
  };

  showToast(message: string, type = PrimeNgAlerts.INFO) {
    this.messageService.clear();
    this.messageService.add(this.getMessageObject(message, type));
  }

  hideToasts() {
    this.messageService.clear();
  }

  openDialog(
    component: Type<any>,
    config?: DynamicDialogConfig
  ): DynamicDialogRef {
    return this.dialogService.open(component, { closable: false, ...config });
  }

  showConfirmation(config: {
    acceptFunction: Function;
    rejectFunction?: Function;
    message?: string;
    position?: DialogPosition;
    data?: any;
    popupTarget?: EventTarget;
    icon?: string;
  }) {
    this.position = config.position ? config.position : DialogPosition.CENTER;
    this.confirmationService.confirm({
      message:
        config.message || 'Are you sure that you want to perform this action?',
      icon: config.icon || 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-success',
      rejectButtonStyleClass: 'p-button-text p-button-danger',
      defaultFocus: 'close',
      key: config.position
        ? 'positionDialog'
        : config.popupTarget
        ? 'popup'
        : 'default',
      target: config.popupTarget ? config.popupTarget : undefined,

      accept: () => {
        if (config.acceptFunction) config.acceptFunction(config.data);
      },
      reject: () => {
        if (config.rejectFunction) config.rejectFunction(config.data);
      },
    });
  }
}
