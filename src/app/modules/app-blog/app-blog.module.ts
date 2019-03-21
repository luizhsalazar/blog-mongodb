import { NgModule } from '@angular/core';
import { AppBlogRoutingModule } from './app-blog.routing';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule, MatIconModule, MatCardModule, MatDividerModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { ListagemBlogComponent } from './listagem-blog/listagem-blog.component';
import { ListagemPostsComponent } from './listagem-posts/listagem-posts.component';
import { PostComponent } from './post/post.component';
import { ModalBlogComponent } from './modal-blog/modal-blog.component';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ListagemBlogComponent,
    ListagemPostsComponent,
    PostComponent,
    ModalBlogComponent
  ],
  imports: [
    CommonModule,
    AppBlogRoutingModule,

    // Material Modules
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,

    // Flex Layout
    FlexLayoutModule
  ],
  providers: [],
  entryComponents: [
    ModalBlogComponent
  ]
})
export class AppBlogModule { }
