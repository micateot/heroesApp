import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseURL: string = environments.baseURL;

  constructor(private httpClient: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseURL}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined>{
    return this.httpClient.get<Hero>(`${this.baseURL}/heroes/${id}`)
      .pipe(
        catchError( error => of(undefined))
      )
  }

  getSuggestions(query: string):Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${this.baseURL}/heroes?q=${query}&_limit=6`);
  }

}
