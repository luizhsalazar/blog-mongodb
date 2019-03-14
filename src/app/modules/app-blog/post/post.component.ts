import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {

  public currentPost: Post = {
    id: 1,
    title: 'Quem matou Marielle e Anderson?',
    subtitle: 'O caso que chocou e o Brasil e continua sendo mistério após 1 ano',
    content: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds' + 
            'of dog from Japan. A small, agile dog that copes very well with mountainous terrain,' + 
            'the Shiba Inu was originally bred for hunting.',
    date: new Date()
  };
  
  constructor(private activeRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      // this.currentPost = params['post-id'];      
    })
  }
}
