import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Boss } from '../models/boss.model';
import { BossService } from './boss.service';
 
// Le Resolver charge les données AVANT que la page s'affiche
// → plus jamais de flash "0 boss" au chargement
export const bossResolver: ResolveFn<Boss[]> = () => {
  return inject(BossService).getAllBosses();
};
 