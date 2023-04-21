import { Component, OnInit } from '@angular/core';
import { ItemService } from '../shared/item-service';

@Component({
  selector: 'av-delete-all-items',
  templateUrl: './delete-all-items.component.html',
  styleUrls: ['./delete-all-items.component.scss']
})
export class DeleteAllItemsComponent implements OnInit {

  constructor(private is: ItemService) { }

  ngOnInit(): void {
  }

  deleteAll() {
    this.is.deleteAllItems().subscribe();
  }

}
