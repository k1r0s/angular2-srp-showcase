import { Routes } from '@angular/router'
import { WritersComponent } from './components/writers/writers.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';

export const appRoutes: Routes = [
  {
    path: 'writers',
    component: WritersComponent
  },
  {
    path: 'posts/:userName',
    component: UserPostsComponent
  },
  { path: '',
    redirectTo: '/writers',
    pathMatch: 'prefix'
  }
];
