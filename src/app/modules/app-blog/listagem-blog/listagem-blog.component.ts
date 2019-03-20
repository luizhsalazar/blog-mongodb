import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { BlogService } from '../app-blog.service';
import { Blog } from 'src/app/shared/models/blog.model';

@Component({
	selector: 'app-listagem-blog',
	templateUrl: './listagem-blog.component.html',
	styleUrls: ['./listagem-blog.component.scss'],
})
export class ListagemBlogComponent implements OnInit {
	
	displayedColumns: string[] = ['title', 'description', 'actions'];
	dataSource = null;
	
	constructor(
		private blogService: BlogService
	) {}
		
	ngOnInit(): void {
		this.blogService.getBlogs()
		.subscribe((response: Blog[]) => {
			this.dataSource = new MatTableDataSource(response);
		});
	}	
	
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}
	