import { NgModule } from '@angular/core';
import { AppBlogRoutingModule } from './app-blog.routing';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule, MatIconModule, MatCardModule, MatDividerModule } from '@angular/material';
import { ListagemBlogComponent } from './listagem-blog/listagem-blog.component';
import { ListagemPostsComponent } from './listagem-posts/listagem-posts.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    ListagemBlogComponent,
    ListagemPostsComponent,
    PostComponent
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
    MatDividerModule
  ],
  providers: []
})
export class AppBlogModule { }
