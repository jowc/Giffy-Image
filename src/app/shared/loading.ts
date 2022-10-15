import { BehaviorSubject, delay, of, switchMap } from "rxjs";




export class LoadingHandler {

  loading = new BehaviorSubject<boolean>(false)

  loading$ = this.loading.pipe(
    switchMap(state => {
      if (state == false) {
        return of(false)
      }
      return of(true).pipe(delay(1000))
    })
  )

  start() {
    this.loading.next(true)
  }

  finish() {
    this.loading.next(false)
  }

}
