import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';


@Injectable({providedIn: 'root'})
export class AuthService {

  private baseURL = environments.baseURL;
  private user?: User;

  constructor(private http: HttpClient) { }


  public get currentUser() : User | undefined {
    if(!this.user) return undefined;

    return structuredClone(this.user);
  }

  public login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/users/1`).pipe(
      tap(user => this.user = user),
      tap(user => localStorage.setItem('token', 'asfkjoiurt76g.347ryw87rfhf.vnldñgjvo8dh'))
    )
  }

  public logout(){
    this.user = undefined;
    localStorage.clear();
  }


}
