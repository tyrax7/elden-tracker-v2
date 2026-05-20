import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BossListComponent } from './components/boss-list/boss-list.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { bossResolver } from './services/boss.resolver';
import { itemResolver } from './services/item.resolver';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'bosses',
    component: BossListComponent,
    resolve: { bosses: bossResolver }
  },
  {
    path: 'items',
    component: ItemListComponent,
    resolve: { items: itemResolver }
  },
];