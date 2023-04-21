import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateItemsComponent } from './generate-items.component';

describe('GenerateItemsComponent', () => {
  let component: GenerateItemsComponent;
  let fixture: ComponentFixture<GenerateItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
