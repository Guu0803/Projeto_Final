import { Component } from '@angular/core';
import { House } from '../model/house.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  id: string = '';
  listOfHouses: House[] = JSON.parse(localStorage.getItem('@Houses') || '[]');
  house: House | undefined
  constructor(private route: ActivatedRoute) {
    
  }
  ngOnInit(): void { 
    this.id = this.route.snapshot.params['id'];
    this.house = this.listOfHouses.find((house: House) => house.id === this.id);
  }
}
