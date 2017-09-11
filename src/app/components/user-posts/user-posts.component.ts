import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from "@angular/material"
import { InitResourceContainer } from '../../behaviors/resource-container';
import { Post } from '../../models/post';
import { PostRepository } from '../../services/post-repository.service';
import { CacheContainer } from '../../behaviors/cache-holder';
import { LoadingDialog } from '../../behaviors/loading-dialog';
import { CommonCache } from '../../services/common-cache.service';
import { WritersComponent } from '../writers/writers.component';
import { User } from '../../models/user';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';

@Component({
  selector: 'user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements InitResourceContainer<Post>, CacheContainer, LoadingDialog, OnInit {

  public loadingDialogRef: MdDialogRef<any>
  public servicePath: string
  public userPostList: Post[] = []
  public selectedUser: User

  constructor(
    public service: PostRepository,
    public cacheSrv: CommonCache,
    public router: Router,
    public dialogFactory: MdDialog,
  ) {}

  public ngOnInit() {
    this.setup()
  }

  private setup() {
    this.selectedUser = this.cacheSrv.get(WritersComponent.SELECTED_USER) as User
    if (!this.selectedUser) { return this.router.navigate(['/']) }
    this.fetchPosts(this.selectedUser.id)
  }

  private fetchPosts(userId: number, data?: Post[]) {
    const key: string = `${UserPostsComponent.name}||fetchPosts||${userId}`
    const result = this.cacheSrv.get(key)
    if (result) {
      this.userPostList = result
    } else {
      setTimeout(() => {
        this.loadingDialogRef = this.dialogFactory.open(
          LoadingDialogComponent, { disableClose: true }
        )
      })

      const resourcePromise = this.service.getResource(userId.toString())

      resourcePromise.then((data) => {
        this.cacheSrv.set(key, data)
        this.userPostList = data
        this.loadingDialogRef.close()
      })
    }
  }
}
