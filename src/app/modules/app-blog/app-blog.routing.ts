import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeBlogComponent } from './home-blog/home-blog.component';

const routes: Routes = [
  {
    path: '',
    component: HomeBlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppBlogRoutingModule { }
