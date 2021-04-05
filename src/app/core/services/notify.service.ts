import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    public messageService: MessageService
  ) { }

  showNotification(type: 'success' | 'warn' | 'error' | 'info' | string, 
    message: string, duration: number = 6000) : void {
      this.messageService.add({
        key: 'appGlobal', 
        severity: type, 
        summary: message,
        detail: '', 
        life: duration, 
        sticky: duration === 0
      });
  }

  clearViaService(): void{
    this.messageService.clear()
  }
}
