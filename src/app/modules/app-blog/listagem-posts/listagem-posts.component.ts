import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Post } from "src/app/shared/models/post.model";
import { BlogService } from '../app-blog.service';
import { Blog } from 'src/app/shared/models/blog.model';

@Component({
  selector: 'app-listagem-posts',
  templateUrl: './listagem-posts.component.html',
  styleUrls: ['./listagem-posts.component.scss'],
})
export class ListagemPostsComponent {

  public displayedColumns: string[] = ['title', 'subtitle', 'date', 'actions'];
  public dataSource: MatTableDataSource<Post>;
  public currentBlog: Blog;

  constructor(
    private activeRoute: ActivatedRoute,
    private blogService: BlogService) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.getBlogPosts(params['id']);
    })
  }

  getBlogPosts(blogId: string) {
    
		this.blogService.getBlogPosts(blogId)
      .subscribe((response: Post[]) => {
        this.dataSource = new MatTableDataSource(response);
      }
    );

    this.blogService.getBlog(blogId)
      .subscribe((response: Blog) => {
        this.currentBlog = response;
      }
    );
	}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}