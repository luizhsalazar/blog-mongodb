import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

export interface Blog {
  id: number;
  title: string;
  description: string;
}

const ELEMENT_DATA: Blog[] = [
  {id: 1, title: 'Blog do João', description: 'Blog de utilidade pública'},
  {id: 2, title: 'Blog da Cacá', description: 'Blog de mídias sociais'},
  {id: 3, title: 'Blog da Martina', description: 'Blog infantil'},
  {id: 4, title: 'Blog da Maria', description: 'Blog de tecnologias'},  
];

@Component({
  selector: 'app-listagem-blog',
  templateUrl: './listagem-blog.component.html',
  styleUrls: ['./listagem-blog.component.scss'],
})
export class ListagemBlogComponent {
  
  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
