import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from "@angular/material"
import { ResourceContainer, ResourceContainerFetch } from '../../behaviors/resource-container';
import { Post } from '../../models/post';
import { PostRepository } from '../../services/post-repository.service';
import { ArgsCacheReader , ArgsCacheWriter , CacheContainer } from '../../behaviors/cache-holder';
import { ShowLoading , LoadingDialog , HideLoading } from '../../behaviors/loading-dialog';
import { CommonCache } from '../../services/common-cache.service';
import { WritersComponent } from '../writers/writers.component';
import { User } from '../../models/user';

@Component({
  selector: 'user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements ResourceContainer<Post>, CacheContainer, LoadingDialog, OnInit {

  public loadingDialogRef: MdDialogRef<any>;
  public servicePath: string;
  public userPostList: Post[] = [];
  public selectedUser: User;

  constructor(
    public service: PostRepository,
    public cacheSrv: CommonCache,
    public router: Router,
    public dialogFactory: MdDialog,
  ) {}

  public ngOnInit() {
    this.selectedUser = this.cacheSrv.get(WritersComponent.SELECTED_USER) as User;
    if (!this.selectedUser) { return this.router.navigate(['/']); }
    this.fetchPosts(this.selectedUser.id);
  }

  @ArgsCacheReader({ argDriverIndex: 0 })
  @ShowLoading
  @ResourceContainerFetch
  @ArgsCacheWriter({ argDriverIndex: 0 })
  private fetchPosts(userId: number, data?: Post[]) {
    this.userPostList = data;
  }

  @HideLoading
  public onResourceFulfit () {}
}
