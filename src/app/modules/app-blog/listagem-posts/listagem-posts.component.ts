import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Post } from "src/app/shared/models/post.model";
import { BlogService } from '../app-blog.service';
import { Blog } from 'src/app/shared/models/blog.model';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listagem-posts',
  templateUrl: './listagem-posts.component.html',
  styleUrls: ['./listagem-posts.component.scss'],
})
export class ListagemPostsComponent {

  public displayedColumns: string[] = ['title', 'subtitle', 'date', 'actions'];
  public dataSource: MatTableDataSource<Post>;
  public currentBlog: Blog = new Blog();
  public hasData: boolean = false;
  public isLogged: boolean = false;
  public currentBlogId: string;
  public currentUser: SocialUser;

  constructor(
    private activeRoute: ActivatedRoute,
    private blogService: BlogService,
    private authService: AuthService,
    private _location: Location) {
  }

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
		this.isLogged = user != null;
		this.currentUser = user;
	});
    
    this.activeRoute.params.subscribe(params => {
      this.currentBlogId = params['id'];
      this.getBlogPosts(this.currentBlogId);
    })
  }

  getBlogPosts(blogId: string) {
    
	this.blogService.getBlogPosts(blogId)
      .subscribe((response: Post[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.hasData = this.dataSource.data.length > 0;
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

  backClicked() {
    this._location.back();
  }

  delete(id: string) {
		this.blogService.deletePost(this.currentBlogId, id)
			.subscribe(() => this.getBlogPosts(this.currentBlogId));
	}

}