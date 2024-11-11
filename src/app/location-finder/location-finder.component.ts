import { Component} from '@angular/core';
import axios from 'axios';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataSharingService } from '../data-sharing.service';
import { House } from '../model/house.model';

@Component({
  selector: 'app-location-finder',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule ],
  templateUrl: './location-finder.component.html',
  styleUrl: './location-finder.component.css'
})
export class LocationFinderComponent {
  locationForm: FormGroup;
  dataToSending: House[] = [];
  constructor( private dataSharingService: DataSharingService) {
    this.locationForm = new FormGroup({
      location: new FormControl('', Validators.required),
      checkIn: new FormControl('', Validators.required),
      checkOut: new FormControl('', Validators.required),
      locale: new FormControl('pt'),
      currency: new FormControl('BRL'),
    });
  }
  
  async searchOnSubmit() {
    const { location, checkIn, checkOut, locale, currency } = this.locationForm.value;
    const options = {
      method: 'GET',
      url: 'https://airbnb-scraper-api.p.rapidapi.com/airbnb_search_stays',
      params: {
        location: location,
        checkIn: checkIn,
        checkOut: checkOut,
        locale: locale,
        currency: currency
      },
      headers: {
        'x-rapidapi-key': '24616c2cf4msh5f1b2e69a3c895ep10614cjsn8fcee24be6ad',
        'x-rapidapi-host': 'airbnb-scraper-api.p.rapidapi.com'
      }
    };
    try {
    	const response = await axios.request(options);
      this.dataToSending = response.data.data;
      this.dataSharingService.updateData(this.dataToSending);
    } catch (error) {
    	console.error(error);
    }
  }
}