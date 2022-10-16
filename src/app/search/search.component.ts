import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FetchService } from '../shared/fetch.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  data?: any;

  message?: string

  sub?: Subscription

  constructor(private fetch: FetchService) { }

  ngOnInit(): void {
    this.fetch.gifs$.subscribe(data => { console.log(data); this.data = data; })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

  qSearch(q: string, meta?: any): void {
    if (this.message) this.message = ''
    const query = q.trim()
    if (query.length < 1) {
      this.message = "Your search query is empty"
    } else {
      console.log(query)
      this.sub = this.fetch.getData(query).subscribe()
    }
  }

}
