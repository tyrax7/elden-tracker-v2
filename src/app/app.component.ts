import { Component } from '@angular/core';
import { BossListComponent } from './components/boss-list/boss-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BossListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'elden-tracker-v2';
}