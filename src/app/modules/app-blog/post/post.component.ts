import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/shared/models/post.model';
import { BlogService } from '../app-blog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {

  public currentPost: Post = new Post();

  // public currentPost: Post = {
  //   _id: '15616516516',
  //   blog_id: '15616516516',
  //   title: 'Quem matou Marielle e Anderson?',
  //   subtitle: 'O caso que chocou e o Brasil e continua sendo mistério após 1 ano',
  //   content: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds' + 
  //           'of dog from Japan. A small, agile dog that copes very well with mountainous terrain,' + 
  //           'the Shiba Inu was originally bred for hunting.',
  //   date: new Date()
  // };
  
  constructor(
    private activeRoute: ActivatedRoute,
    private blogService: BlogService
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
}
