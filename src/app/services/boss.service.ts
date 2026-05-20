import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/boss.model';

@Injectable({
  providedIn: 'root'
})
export class BossService {
  private http = inject(HttpClient);
  private apiUrl = 'https://eldenring.fanapis.com/api/bosses';

  getBosses(limit: number = 100): Observable<ApiResponse> {
    // On demande 100 boss d'un coup pour remplir le site
    return this.http.get<ApiResponse>(`${this.apiUrl}?limit=${limit}`); 
  }
}