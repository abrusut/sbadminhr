import { User } from '../domain/user.domain';
import { URL_SERVICIOS } from '../config/config';

import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Evaluation } from '../domain/evaluation.domain';



@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  usuario: User;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    console.log('Servicio de evaluaciones');
  }

  saveEvaluation(evaluation: Evaluation): Observable<any> {
    const url: string = URL_SERVICIOS + '/evaluation';

    return this.http.post(url, evaluation);
  }

  public findAllEvaluationPaginate(page: number, size: number): Observable<any> {
    const url = URL_SERVICIOS + '/evaluation-paginate' + `/size/${size}?page=${page}`;
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
