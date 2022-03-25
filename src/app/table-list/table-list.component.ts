import { Component, OnInit } from '@angular/core';
import { APIService } from '../../custom-components/http-service/service';
import { keys } from "../../constants/keys";
import * as _ from 'lodash';
declare function deleteLink(id): any;
declare function createLink(link): any;
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'longUrl', 'link', 'createdAt'];

  dataSource = [];
  clickedRows = new Set<Link>();
  linkValue = "Please Insert Link";

  constructor(private service: APIService) {
    this.getData();
  }

  ngOnInit() {
  }

  createInsertedLink() {
    createLink(this.linkValue);
  }

  deleteSelected() {
    console.log(this.clickedRows);
    if (this.clickedRows.size > 0) {
      this.clickedRows.forEach(function (value) {
        console.log(_.get(value, 'id'));
        deleteLink(_.get(value, 'id'));
      });
    }
  }

  private getData() {

    this.service.get(keys.apiAddress + 'query/listByPageAsync')
      .then((data: any) => {
        this.dataSource = JSON.parse(JSON.parse(data));
      });
  }
}

export class Link {
  constructor(id, longUrl, link, createdAt) {
    this.id = id;
    this.longUrl = longUrl;
    this.link = link;
    this.createdAt = createdAt;
  }
  public id: string;
  public longUrl: string;
  public link: string;
  public createdAt: string;
}
