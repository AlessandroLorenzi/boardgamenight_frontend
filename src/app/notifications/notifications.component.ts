import { Component, OnInit } from '@angular/core';
import { Notification } from '../models';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[]

  constructor(
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
      this.notificationService.notificationsSubject.subscribe(
        notifications => this.set_notifications(notifications),
      );
  }
  set_notifications(notifications){
    this.notifications = notifications;
  }

}
