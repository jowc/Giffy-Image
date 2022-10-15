import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  private baseUrl: string = "https://api.giphy.com/v1/gifs/search"

  constructor(private http: HttpClient) { }

  getData(term: string): any {
    term = term.trim()

    const options = term ?
      {
        params: new HttpParams()
          .append('api_key', environment.giffY)
          .append('q', term)
          .append('limit', 25)
          .append('offset', 0)
          .append('rating', 'y')
          .append('lang', 'en')
      } : {};


    return this.http.get(`${this.baseUrl}`, options).pipe(catchError((e: any) => this.handleError(e)))
  }

  private handleError(e: HttpErrorResponse): any {
    throwError(() => new Error(e.error.meta.msg))
  }
}
