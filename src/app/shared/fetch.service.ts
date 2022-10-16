import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, take, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  private baseUrl: string = "https://api.giphy.com/v1/gifs"

  gifs$ = new BehaviorSubject<any>(null)

  constructor(private http: HttpClient) { }

  getData(term: string): any {
    const options = term ?
      {
        params: new HttpParams()
          .append('api_key', environment.giffY)
          .append('q', term)
          .append('limit', 8)
          .append('offset', 0)
          .append('rating', 'y')
          .append('lang', 'en')
      } : {};


    return this.http.get(`${this.baseUrl}/search`, options).pipe(
      tap((data: any) => this.gifs$.next(data)),
      catchError((e: any) => this.handleError(e))
    )
  }

  getGif(id: string): any {
    const options = id ?
      {
        params: new HttpParams()
          .append('ids', id)
          .append('api_key', environment.giffY)
      } : {};
    return this.http.get(`${this.baseUrl}`, options).pipe(
      take(1),
      map((data: any) => {
        console.log('Get gif: ', data)
        this.gifs$.next(data)
      }),
      catchError((e: any) => this.handleError(e))
    ).subscribe()

  }

  private handleError(e: any): any {
    console.log("Err handler: ", e)
    throwError(() => new Error(e.error.meta.msg))
  }
}
