import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { LocationFinderComponent } from './location-finder/location-finder.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListingOfHousesComponent } from './listing-of-houses/listing-of-houses.component';
import { DetailsComponent } from './details/details.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LocationFinderComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    ListingOfHousesComponent,
    DetailsComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projeto-final';
}
