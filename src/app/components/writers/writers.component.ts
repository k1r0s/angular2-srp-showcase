import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ResourceContainerFetch, ResourceContainer } from '../../behaviors/resource-container';
import { ReturnException } from '../../behaviors/return-exception';
import { CacheContainer, ArgsCacheReader, ArgsCacheWriter } from '../../behaviors/cache-holder';
import { DialogHolder, OpenDialogBehavior } from '../../behaviors/dialog-holder';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { UserRepository } from '../../services/user-repository.service';
import { CommonCache } from '../../services/common-cache.service';
import { User } from '../../models/user';
import { LoadingDialog , ShowLoading, HideLoading } from '../../behaviors/loading-dialog';

@Component({
  selector: 'writers',
  templateUrl: './writers.component.html',
  styleUrls: ['./writers.component.css']
})
export class WritersComponent implements LoadingDialog, ResourceContainer<User>, CacheContainer, DialogHolder, OnInit {

  public static readonly SELECTED_USER = 'selected-user';
  public static readonly USER_LIST = 'user-list';

  public userList: User[] = [];
  public dialogRef: MdDialogRef<UserDialogComponent>;
  public loadingDialogRef: MdDialogRef<any>;
  public forbiddenCity = 'South Elvis';


  constructor(
    public service: UserRepository,
    public cacheSrv: CommonCache,
    public dialogFactory: MdDialog,
    private router: Router
  ) {}

  public ngOnInit() {
    setTimeout(() => this.setup());
  }

  @ArgsCacheReader()
  @ShowLoading
  @ResourceContainerFetch
  @ArgsCacheWriter()
  public setup(data?: User[]) {
    this.cacheSrv.set(WritersComponent.USER_LIST, data);
    this.userList = data;

  }

  @HideLoading
  public onResourceFulfit() {}

  @ReturnException
  @OpenDialogBehavior(UserDialogComponent)
  public selectUser(user: User): User {

    if (user.address.city === this.forbiddenCity) {
      throw new Error(`We cannot retrieve info from people settled in ${user.address.city} >.<'`);
    }

    return user;
  }

  public onDialogClose(selectedUser?: User): void {
    if (selectedUser) {
      this.cacheSrv.set(WritersComponent.SELECTED_USER, selectedUser);
      this.router.navigate([`/posts/${selectedUser.name.toLowerCase().replace(' ', '-')}`]);
    }
  }
}
