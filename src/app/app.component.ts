import { Component } from '@angular/core';
import { EventService } from './services/event.service';
import { GamerService } from './services/gamer.service';
import { NotificationService } from './services/notification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EventService, GamerService, NotificationService]
})
export class AppComponent {
  title = 'app';
}
