import { User } from '../domain/user.domain';
import { URL_SERVICIOS } from '../config/config';

import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  usuario: User;
  token: string;
  debug = '?XDEBUG_SESSION_START=18475';

  constructor(public http: HttpClient, public router: Router) {
    console.log('Servicio de usuarios');
  }

  registrarUser(user: User): Observable<any> {
    const url: string = URL_SERVICIOS + '/users';

    return this.http.post(url, user);
  }

  actualizarUsuario(user: User): Observable<any> {
    const url: string = URL_SERVICIOS + '/usuario/' + user.id;
    return this.http.put(url, user);
  }

  findAllUsers(): Observable<any> {
    const url = URL_SERVICIOS + '/users';
    const params = this.createHttpParams({});
    return this.http.get<any>(url, { params: params })
    .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }



  findUserById(id): Observable<any> {
    const url = URL_SERVICIOS + '/users/' + id;
    return this.http.get(url);
  }

  public findAllUsersPaginate(page: number, size: number): Observable<any> {
    const url = URL_SERVICIOS + '/users-paginate' + `/size/${size}?page=${page}`;
    const params = this.createHttpParams({});

    return this.http.get<any>(url, { params: params })
        .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    this.log('error', error);
    return throwError(error);
  }

private log(level: string, message: any): void {
        console[level](message);
}

private createHttpParams(values: { [index: string]: any }): HttpParams {
    let params: HttpParams = new HttpParams();

    Object.keys(values).forEach((key: string) => {
        const value: any = values[key];
        if (value !== undefined) {
            params = params.set(key, String(value));
        }
    });

    return params;
}


}
