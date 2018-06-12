import { Injectable } from '@angular/core';
import { Notification } from '../models'
import { Subject } from 'rxjs/Subject';


@Injectable()
export class NotificationService {
  notificationsSubject = new Subject();
  counter = 0;
  private notifications: Notification[] = [];

  constructor(
  ) {
    this.notificationsSubject.next(this.notifications);
  }

  addNotification(notification: Notification){
    notification.id = this.counter;
    this.counter = this.counter +1;
    this.notifications.push(notification);
    this.notificationsSubject.next(this.notifications);
  }


}
