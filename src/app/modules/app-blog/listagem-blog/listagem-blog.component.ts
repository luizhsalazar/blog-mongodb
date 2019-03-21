import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { BlogService } from '../app-blog.service';
import { Blog } from 'src/app/shared/models/blog.model';
import { ModalBlogComponent } from '../modal-blog/modal-blog.component';

@Component({
	selector: 'app-listagem-blog',
	templateUrl: './listagem-blog.component.html',
	styleUrls: ['./listagem-blog.component.scss'],
})
export class ListagemBlogComponent implements OnInit {
	
	public displayedColumns: string[] = ['title', 'description', 'actions'];
	public dataSource = null;
	public loading: boolean = false;
	
	constructor(
		private blogService: BlogService,
		private dialog: MatDialog
	) {}
		
	ngOnInit(): void {
		this.getBlogs();
	}	
	
	private getBlogs() {
		this.loading = true;
		this.blogService.getBlogs()
			.subscribe((response: Blog[]) => {
				this.dataSource = new MatTableDataSource(response);
				this.loading = false;
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
	