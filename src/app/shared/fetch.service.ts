import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, take, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  private baseUrl: string = "https://api.giphy.com/v1/gifs/search"

  gifs$ = new BehaviorSubject<any>(null)

  constructor(private http: HttpClient) { }

  getData(term: string): any {
    const options = term ?
      {
        params: new HttpParams()
          .append('api_key', environment.giffY)
          .append('q', term)
          .append('limit', 6)
          .append('offset', 0)
          .append('rating', 'y')
          .append('lang', 'en')
      } : {};


    return this.http.get(`${this.baseUrl}`, options).pipe(
      tap((data: any) => this.gifs$.next(data)),
      catchError((e: any) => this.handleError(e))
    )
  }

  getGif(slug: string): any {
    // let gifDetail = null
    return this.gifs$.subscribe((data: any) => {
      if (data) {
        const newData = data.data.find((data: any) => data.slug === slug)
        this.gifs$.next(newData)
        localStorage.setItem('gif', JSON.stringify(newData))
      }
    })
    // return gifDetail
  }

  private handleError(e: any): any {
    console.log("Err handler: ", e)
    throwError(() => new Error(e.error.meta.msg))
  }
}
