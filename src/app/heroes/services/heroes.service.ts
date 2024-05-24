import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
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

  addHero(hero: Hero): Observable<Hero>{
    return this.httpClient.post<Hero>(`${this.baseURL}/heroes/`, hero);
  }

  updateHero(hero: Hero): Observable<Hero>{
    if(!hero.id) throw Error('El id es obligatorio');
    return this.httpClient.patch<Hero>(`${this.baseURL}/heroes/${hero.id}`, hero);
  }

  deleteHero(heroId: string): Observable<boolean>{
    return this.httpClient.delete(`${this.baseURL}/heroes/${heroId}`)
      .pipe(
        catchError( error => of(false)),
        map( response => true)
      )
  }

}
