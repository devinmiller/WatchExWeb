import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material';

import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  declarations: [PostListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    PostRoutingModule
  ]
})
export class PostModule { }
