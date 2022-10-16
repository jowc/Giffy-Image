import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FetchService } from './shared/fetch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private fetch: FetchService) { }

  ngOnInit(): void {
    this.retainData()
  }

  retainData() {
    let ls = localStorage.getItem('gif')
    if (ls) {
      const currentData = JSON.parse(ls)
      console.log(currentData)
      this.fetch.gifs$.next(currentData)
    }
  }


}
