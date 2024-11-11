import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingOfHousesComponent } from './listing-of-houses.component';

describe('ListingOfHousesComponent', () => {
  let component: ListingOfHousesComponent;
  let fixture: ComponentFixture<ListingOfHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingOfHousesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingOfHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
