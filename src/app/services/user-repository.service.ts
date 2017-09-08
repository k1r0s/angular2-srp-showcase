import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CommonRequest } from './common-request.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

@Injectable()
export class UserRepository extends CommonRequest {
  constructor(http: Http) {
    super(http, 'users');
  }

  public getResource(): Promise<User[]> {
    return super.getResource();
  }
}
