import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  locationForm: FormGroup;

  constructor(private router: Router) {
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
      console.log(response.data.data)
      localStorage.setItem('@Houses', JSON.stringify(response.data.data));
      this.router.navigate(['listing-of-houses']);
    } catch (error) {
    	console.error(error);
    }
  }
}
