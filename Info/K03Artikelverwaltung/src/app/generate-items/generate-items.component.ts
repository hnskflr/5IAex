import { Component, OnInit } from '@angular/core';
import { ItemService } from '../shared/item-service';

@Component({
  selector: 'av-generate-items',
  templateUrl: './generate-items.component.html',
  styleUrls: ['./generate-items.component.scss']
})
export class GenerateItemsComponent implements OnInit {

  constructor(private is: ItemService) { }

  ngOnInit(): void {
  }

  generateItems() {
    this.is.createAllItems();
  }

}
