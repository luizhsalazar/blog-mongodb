import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Post } from "src/app/shared/models/post.model";

const ELEMENT_DATA: Post[] = [
  {id: 1, title: 'Como Bolsonaro arruinou a vida de muitos', subtitle: '', content: '', date: new Date()},
  {id: 2, title: 'Melhore o alcance de seus posts através das redes sociais', subtitle: '', content: '', date: new Date()},
  {id: 3, title: 'Quem matou Marielle e Anderson?', subtitle: '', content: '', date: new Date()},
  {id: 4, title: '100 dias de governo Bolsonaro', subtitle: '', content: '', date: new Date()}
];

@Component({
  selector: 'app-listagem-posts',
  templateUrl: './listagem-posts.component.html',
  styleUrls: ['./listagem-posts.component.scss'],
})
export class ListagemPostsComponent {

  public displayedColumns: string[] = ['id', 'title', 'date', 'actions'];
  public dataSource = new MatTableDataSource(ELEMENT_DATA);
  public currentBlogId: number = 0;

  constructor(private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.currentBlogId = params['id'];
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}