import { Http } from "@angular/http"
import { Observable } from "rxjs"

export abstract class CommonRequest {
  private api = "https://jsonplaceholder.typicode.com"
  private headers = new Headers({ "Accept": "application/json" });

  constructor(private http: Http, private resource: string) {}

  public getResource(path = ''): Promise<any[]> {
    return this.http
        .get(`${this.api}/${this.resource}/${path}`)
        .share()
        .delay(2000)
        .map(res => res.json())
        .catch(this.handleError)
        .toPromise()
  }

  private handleError(error: any): Observable<any> {
      console.error(`An error ocurred stack`, error)
      return Observable.throw(error.message)
  }

}
