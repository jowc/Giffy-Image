import { Location } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FetchService } from '../shared/fetch.service';
import { LoadingHandler } from '../shared/loading';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, AfterViewInit, OnDestroy {

  gifs?: any
  sub!: Subscription
  loading = new LoadingHandler()
  routeParams!: string

  constructor(
    private route: ActivatedRoute,
    private fetch: FetchService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      const params = p['slug']
      this.routeParams = params
    })
  }

  ngAfterViewInit(): void {
    this.getGif()
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.fetch.gifs$.next(null)
  }

  getGif() {
    this.loading.start()
    this.fetch.getGif(this.routeParams)
    this.sub = this.fetch.gifs$.subscribe(data => {
      this.gifs = data.data
      console.log("Detail data: ", this.gifs)
      this.loading.finish()
    })
  }

  back() {
    this.location.back()
  }

}
