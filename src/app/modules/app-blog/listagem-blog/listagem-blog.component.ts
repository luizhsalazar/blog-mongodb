import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { BlogService } from '../app-blog.service';
import { Blog } from 'src/app/shared/models/blog.model';
import { ModalBlogComponent } from '../modal-blog/modal-blog.component';
import { AuthService, SocialUser } from 'angularx-social-login';

@Component({
	selector: 'app-listagem-blog',
	templateUrl: './listagem-blog.component.html',
	styleUrls: ['./listagem-blog.component.scss'],
})
export class ListagemBlogComponent implements OnInit {

	public displayedColumns: string[] = ['title', 'description', 'author', 'actions'];
	public dataSource = null;
	public loading: boolean = false;
	public isLogged: boolean = false;
	public hasData: boolean = false;
	public currentUser: SocialUser;

	constructor(
		private blogService: BlogService,
		private dialog: MatDialog,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.authService.authState.subscribe(user => {
			this.isLogged = user != null;
			this.currentUser = user;
		});

		this.getBlogs();		
	}

	private getBlogs() {
		this.loading = true;
		this.blogService.getBlogs()
			.subscribe((response: Blog[]) => {
				this.dataSource = new MatTableDataSource(response);
				this.loading = false;
				this.hasData = this.dataSource.data.length > 0;
			}
		);
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	newBlog() {
		const dialogRef = this.dialog.open(ModalBlogComponent, {
			width: '500px',
			disableClose: true
		});

		dialogRef.afterClosed().subscribe(result => {
			this.getBlogs();
		});
	}

	delete(id: string) {
		this.blogService.deleteBlog(id)
			.subscribe(() => this.getBlogs());
	}
}
