import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from '../shared/item';
import { ItemService } from '../shared/item-service';

@Component({
  selector: 'av-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  items: Array<Item> = [];
  itemsDataSource = new MatTableDataSource<Item>();
  displayedColumns: string[] = ['image', 'id', 'description', 'count', 'buy-price', 'sell-price', 'launch-date'];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe(
      (data) => {
        this.itemsDataSource = new MatTableDataSource(data);
      }
    );
  }

}
