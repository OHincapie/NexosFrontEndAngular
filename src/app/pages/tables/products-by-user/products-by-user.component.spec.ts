import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsByUserComponent } from './products-by-user.component';

describe('ProductsByUserComponent', () => {
  let component: ProductsByUserComponent;
  let fixture: ComponentFixture<ProductsByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsByUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
