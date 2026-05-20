import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, expand, reduce, EMPTY } from 'rxjs';
import { Item, ItemApiResponse } from '../models/boss.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private http = inject(HttpClient);
  private apiUrl = 'https://eldenring.fanapis.com/api/items';
  private pageSize = 50;

  getAllItems(): Observable<Item[]> {
    const fetchPage = (page: number) =>
      this.http.get<ItemApiResponse>(`${this.apiUrl}?limit=${this.pageSize}&page=${page}`);

    let currentPage = 0;

    return fetchPage(0).pipe(
      expand((response: ItemApiResponse) => {
        const fetched = (currentPage + 1) * this.pageSize;
        if (fetched < response.total) {
          currentPage++;
          return fetchPage(currentPage);
        }
        return EMPTY;
      }),
      reduce((allItems: Item[], response: ItemApiResponse) => {
        return [...allItems, ...response.data];
      }, [])
    );
  }
}