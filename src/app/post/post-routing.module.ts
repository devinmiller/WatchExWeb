import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostCollageComponent } from './post-collage/post-collage.component';

const routes: Routes = [
  {
    path: 'post-list',
    component: PostListComponent
  },
  {
    path: 'post-collage',
    component: PostCollageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
