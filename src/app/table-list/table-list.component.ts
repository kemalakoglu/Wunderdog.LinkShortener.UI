import { Component, OnInit } from '@angular/core';
import { APIService } from '../../custom-components/http-service/service';
import { keys } from "../../constants/keys";

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  displayedColumns: string[] = ['longUrl', 'link', 'createdAt'];

  dataSource = [
    {  _id: "623a1f9db1e4c547c407f158",  longUrl: 'https://github.com/kemalakoglu',  link: 'https://bit.ly/3inHd0a',  createdAt: "2022-03-21T21:58:57.000Z",  __v: 0},
    {  _id: "623a1f9db1e4c547c407f15a",  longUrl: 'https://github.com/kemalakoglu',  link: 'https://bit.ly/3inHd0a',  createdAt: "2022-03-21T21:58:57.000Z",  __v: 0},
    {  _id: "623a1f9fb1e4c547c407f15f",  longUrl: 'https://github.com/kemalakoglu',  link: 'https://bit.ly/3inHd0a',  createdAt: "2022-03-21T21:58:57.000Z",  __v: 0},
    {  _id: "623a2012086dd117aaa71ee0",  longUrl: 'https://github.com/kemalakoglu',  link: 'https://bit.ly/3inHd0a',  createdAt: "2022-03-21T21:58:57.000Z",  __v: 0},
    {  _id: "623a1f9db1e4c547c407f158",  longUrl: 'https://github.com/kemalakoglu',  link: 'https://bit.ly/3inHd0a',  createdAt: "2022-03-21T21:58:57.000Z",  __v: 0},
    {  _id: "623a1f9db1e4c547c407f15a",  longUrl: 'https://github.com/kemalakoglu',  link: 'https://bit.ly/3inHd0a',  createdAt: "2022-03-21T21:58:57.000Z",  __v: 0},
    {  _id: "623a1f9fb1e4c547c407f15f",  longUrl: 'https://github.com/kemalakoglu',  link: 'https://bit.ly/3inHd0a',  createdAt: "2022-03-21T21:58:57.000Z",  __v: 0},
    {  _id: "623a2012086dd117aaa71ee0",  longUrl: 'https://github.com/kemalakoglu',  link: 'https://bit.ly/3inHd0a',  createdAt: "2022-03-21T21:58:57.000Z",  __v: 0}
  ];
  clickedRows = new Set<Link>();


  constructor(private service: APIService) {
    this.getData();
  }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    
    this.service.get(keys.apiAddress + 'dashboard/listByPageAsync')
      .then((data: any) => {
        console.log(data);
        console.log(JSON.parse(data));
        this.dataSource = JSON.parse(data);
        console.log(this.dataSource);
      });
  }
}

export interface Link {
  _id: string,
  longUrl: string,
  link: string,
  createdAt: string,
}
