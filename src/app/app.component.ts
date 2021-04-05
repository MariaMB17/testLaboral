import { Component, OnInit } from '@angular/core';
import { NotifyService } from './core/services/notify.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-pescaderia';

  constructor(
    private _notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this._notifyService.showNotification(
      'success',
      'prueba',
      15000
    )
  }
}
