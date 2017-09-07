import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CommonRequest } from './common-request.service';
import { Observable } from 'rxjs/Observable';
import { Post } from '../models/post';

@Injectable()
export class PostRepository extends CommonRequest {
  constructor(http: Http) {
    super(http, 'posts');
  }

  public getResource(userId: string): Observable<Post[]> {
    const path = `?userId=${userId}`;
    return super.getResource(path);
  }
}
