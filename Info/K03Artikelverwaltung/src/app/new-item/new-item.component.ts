import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../shared/item';
import { ItemFactory } from '../shared/item-factory';
import { ItemService } from '../shared/item-service';
import { ItemValidator } from '../shared/item-validator';

@Component({
  selector: 'av-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {

  itemForm!: FormGroup;
  today: string = "";
  item!: Item; 
  editMode: boolean = false;

  constructor(private is: ItemService, private fb: FormBuilder, private router: Router) {
    var state = this.router.getCurrentNavigation()?.extras.state;

    if (state != null) this.item = state as Item;
  }

  ngOnInit(): void {
    var date = new Date();
    this.today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

    var item = ItemFactory.empty();

    this.itemForm = this.fb.group({
      id: [item.id, ItemValidator.idFormat],
      description: [item.description, Validators.required],
      number: [item.number, Validators.min(0)],
      prices: this.fb.group({
        purchasingPrice: [item.purchasingPrice, Validators.min(0)],
        retailPrice: [item.retailPrice, Validators.min(0)],
      }, { validators: ItemValidator.purchasingPriceLower }),
      launchDate: [item.launchDate, Validators.required],
      images: this.fb.array([
        this.fb.group({
          url: [item.images[0].url, Validators.required],
          title: item.images[0].title,
        })
      ]),
    });

    if (this.item != null) {
      this.editMode = true;
      this.itemForm.controls.id.setValue(this.item.id);
      this.itemForm.controls.id.disable();
      this.itemForm.controls.description.setValue(this.item.description);
      this.itemForm.controls.number.setValue(this.item.number);
      this.prices.controls.purchasingPrice.setValue(this.item.purchasingPrice);
      this.prices.controls.retailPrice.setValue(this.item.retailPrice);
      this.itemForm.controls.launchDate.setValue(this.item.launchDate);
      this.item.images.forEach((img, index) => {
        if (index > 0) this.addImage();

        this.images.controls[index].setValue(img);
      });
    }
  }

  get images(): FormArray {
    return this.itemForm.get('images') as FormArray;
  }

  get prices(): FormGroup {
    return this.itemForm.get('prices') as FormGroup;
  }

  createItemFromForm() {
    var item = ItemFactory.empty();
    item.id = this.itemForm.controls.id.value;
    item.description = this.itemForm.controls.description.value;
    item.number = this.itemForm.controls.number.value;
    item.purchasingPrice = this.prices.value.purchasingPrice;
    item.retailPrice = this.prices.value.retailPrice;
    item.launchDate = this.itemForm.controls.launchDate.value;
    item.images = this.itemForm.controls.images.value;

    return item;
  }

  updateItem() {
    this.is.updateItem(this.createItemFromForm()).subscribe(() => this.router.navigateByUrl(""));
    // this.router.navigateByUrl("");
  }

  addItem() {
    this.is.createItem(this.createItemFromForm()).subscribe(() => this.router.navigateByUrl(""));
    // this.router.navigateByUrl("");
  }

  deleteItem() {
    // TODO
    this.is.deleteItem(this.item.id).subscribe(() => {this.router.navigateByUrl("");});
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  addImage() {
    this.images.push(this.fb.group({
      url: "",
      title: "",
    }));
  }
}
