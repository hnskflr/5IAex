import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAllItemsComponent } from './delete-all-items.component';

describe('DeleteAllItemsComponent', () => {
  let component: DeleteAllItemsComponent;
  let fixture: ComponentFixture<DeleteAllItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAllItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAllItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
