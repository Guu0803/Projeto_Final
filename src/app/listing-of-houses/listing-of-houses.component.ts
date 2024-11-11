import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NgFor } from '@angular/common';
import axios from 'axios';
import { DataSharingService } from '../data-sharing.service';
import { House } from '../model/house.model';

@Component({
  selector: 'app-listing-of-houses',
  standalone: true,
  imports: [CardComponent, NgFor],
  templateUrl: './listing-of-houses.component.html',
  styleUrl: './listing-of-houses.component.css'
})
export class ListingOfHousesComponent {
  houses = JSON.parse(localStorage.getItem('@Houses') || '[]');
  listOfHouses: House[] = [];
  
  constructor(private dataSharingService: DataSharingService) { }

  ngOnInit() {
    this.dataSharingService.currentData.subscribe((data) => {
      if (data && data.length > 0) {
        this.listOfHouses = data;
      } else { 
        this.searchOnSubmit()
        this.listOfHouses = JSON.parse(localStorage.getItem('@Houses') || '[]');
      }
    });
  }
  async  searchOnSubmit() {
    const options = {
      method: 'GET',
      url: 'https://airbnb-scraper-api.p.rapidapi.com/airbnb_search_stays',
      params: {
        location: 'Brazil',
        checkIn: '2025-10-25',
        checkOut: '2025-10-28',
        locale: 'pt',
        currency: 'BRL'
      },
      headers: {
        'x-rapidapi-key': '24616c2cf4msh5f1b2e69a3c895ep10614cjsn8fcee24be6ad',
        'x-rapidapi-host': 'airbnb-scraper-api.p.rapidapi.com'
      }
    };
    try {
      const response = await axios.request(options);
      this.listOfHouses = response.data.data;
      localStorage.setItem('@Houses', JSON.stringify(this.listOfHouses));
    } catch (error) {
    	console.error(error);
    }
  }
}