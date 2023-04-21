import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteAllItemsComponent } from './delete-all-items/delete-all-items.component';
import { GenerateItemsComponent } from './generate-items/generate-items.component';
import { ItemListComponent } from './item-list/item-list.component';
import { NewItemComponent } from './new-item/new-item.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ItemListComponent },
  { path: 'new-item', component: NewItemComponent },
  { path: 'update-item', component: NewItemComponent },
  { path: 'delete-all', component: DeleteAllItemsComponent },
  { path: 'generate', component: GenerateItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
