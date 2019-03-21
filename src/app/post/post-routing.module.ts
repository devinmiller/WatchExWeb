import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCollageComponent } from './post-collage/post-collage.component';

const routes: Routes = [
  {
    path: '',
    component: PostCollageComponent
  },
  {
    path: ':f',
    component: PostCollageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
