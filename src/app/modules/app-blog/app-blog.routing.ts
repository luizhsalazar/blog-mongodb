import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListagemBlogComponent } from './listagem-blog/listagem-blog.component';
import { ListagemPostsComponent } from './listagem-posts/listagem-posts.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path: '',
    component: ListagemBlogComponent,
  },
  {
    path: 'blogs/:id/posts',
    component: ListagemPostsComponent
  },
  {
    path: 'blogs/:id/posts/:post-id',
    component: PostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppBlogRoutingModule { }
