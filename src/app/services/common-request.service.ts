import { Http } from "@angular/http"
import { Observable } from "rxjs"

export abstract class CommonRequest {
  private api = "https://jsonplaceholder.typicode.com/"
  private headers = new Headers({ "Accept": "application/json" });
  private curr: Observable<any[]>

  constructor(private http: Http, private url: string) {}

  public getResource(): Observable<any[]> {
    if(this.curr) { return this.curr }
    return this.curr = this.http
        .get(this.api + this.url)
        .share()
        .map(res => res.json())
        .catch(this.handleError)
  }

  private handleError(error: any): Observable<any> {
      console.error(`An error ocurred stack`, error)
      return Observable.throw(error.message)
  }

}
