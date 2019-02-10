import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FlexLayoutModule} from '@angular/flex-layout';
import { MatTableModule, MatInputModule, MatIconModule, MatButtonModule, MatPaginatorModule } from '@angular/material';

import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostCollageComponent } from './post-collage/post-collage.component';

@NgModule({
  declarations: [PostListComponent, PostCollageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    PostRoutingModule
  ]
})
export class PostModule { }
