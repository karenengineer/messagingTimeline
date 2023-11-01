import { Injectable } from '@angular/core';
import { Observable, map, BehaviorSubject } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { User, ServerResponse } from "src/app/models/types";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3001';
  public user: BehaviorSubject<User> = new BehaviorSubject<any>('');

  constructor(private http: HttpClient) { }

  postUser(username: string): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.apiUrl}/login`, { name: username });
  }


  getUser(username: string | undefined | null): Observable<ServerResponse> {
    let params = new HttpParams();
    params = params.append('username', String(username));
    return this.http.get(`${this.apiUrl}/user`, { params: params })
      .pipe(map((data: any) => {
        this.user = new BehaviorSubject<User>(data.result);
        return data;
      }))
  }


}
