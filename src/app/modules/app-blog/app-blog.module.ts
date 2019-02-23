import { NgModule } from '@angular/core';
import { AppBlogRoutingModule } from './app-blog.routing';
import { CommonModule } from '@angular/common';
import { HomeBlogComponent } from './home-blog/home-blog.component';

@NgModule({
  declarations: [
    HomeBlogComponent
  ],
  imports: [
    CommonModule,
    AppBlogRoutingModule
  ],
  providers: []
})
export class AppBlogModule { }
