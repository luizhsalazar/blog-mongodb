import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppBlogModule } from './modules/app-blog/app-blog.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatMenuModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    // Material Modules
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    
    AppBlogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
