import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FetchService } from './shared/fetch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'giphy-search';

  data?: any;

  message?: string

  sub?: Subscription

  constructor(private fetch: FetchService) { }

  ngOnInit(): void {
    this.sub = this.fetch.getData('sphinx').subscribe((data: any) => this.data = data, (e: string) => this.message = e)
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

}
