import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BossListComponent } from './components/boss-list/boss-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bosses', component: BossListComponent },
];