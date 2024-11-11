import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NgFor } from '@angular/common';
import { House } from '../model/house.model';
import { DataSharingService } from '../data-sharing.service';


@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CardComponent, NgFor],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {
  listOfHouses: House[] = [];
  constructor(private dataSharingService: DataSharingService) { }
  ngOnInit() {
   this.dataSharingService.favoriteData.subscribe((data) => {
     if (data && data.length > 0) {
        this.listOfHouses = data;
      }
    });
  }
}
