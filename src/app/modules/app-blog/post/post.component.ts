import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/shared/models/post.model';
import { BlogService } from '../app-blog.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {

  public currentPost: Post = new Post();
  
  constructor(
    private activeRoute: ActivatedRoute,
    private blogService: BlogService,
    private _location: Location
  ) {}
  
  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.getPost(params['id'], params['post-id']);
    })
  }

  getPost(blogId: string, postId: string) {
    this.blogService.getPost(blogId, postId)
      .subscribe((response: Post) => {
        this.currentPost = response;
      }
    )
  }

  backClicked() {
    this._location.back();
  }
}
