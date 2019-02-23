import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppBlogModule } from './modules/app-blog/app-blog.module';

const routes: Routes = [
  {
    path: 'blogs',
    loadChildren: () => AppBlogModule
  },
  {
    path: '',
    redirectTo: 'blogs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
