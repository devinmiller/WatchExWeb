import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FlexLayoutModule} from '@angular/flex-layout';
import { MatTableModule, MatInputModule, MatIconModule, MatButtonModule, MatPaginatorModule, MatToolbarModule, MatProgressSpinnerModule } from '@angular/material';

import { PostRoutingModule } from './post-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostCollageComponent } from './post-collage/post-collage.component';
import { ScrollingModule, ScrollDispatchModule } from '@angular/cdk/scrolling';
import { PostImageComponent } from './post-image/post-image.component';
import { PostColumnComponent } from './post-column/post-column.component';

@NgModule({
  declarations: [PostCollageComponent, PostImageComponent, PostColumnComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    PostRoutingModule,
    ScrollingModule,
    ScrollDispatchModule
  ]
})
export class PostModule { }
