import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FetchService } from '../shared/fetch.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, AfterViewInit, OnDestroy {

  data?: any
  sub!: Subscription

  constructor(
    private route: ActivatedRoute,
    private _route: Router,
    private fetch: FetchService
  ) { }

  ngOnInit(): void {
    this.getGif()
  }

  ngAfterViewInit(): void {
    if (!this.data) {
      this._route.navigate([''])
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  getGif() {
    this.sub = this.route.params.subscribe(p => {
      const params = p['slug']
      this.fetch.getGif(params)
      this.sub = this.fetch.gifs$.subscribe(data => this.data = data)
    })
  }

}
