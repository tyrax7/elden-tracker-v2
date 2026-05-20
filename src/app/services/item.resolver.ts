import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Item } from '../models/boss.model';
import { ItemService } from './item.service';

export const itemResolver: ResolveFn<Item[]> = () => {
  return inject(ItemService).getAllItems();
};