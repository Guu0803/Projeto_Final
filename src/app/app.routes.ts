import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ListingOfHousesComponent } from './listing-of-houses/listing-of-houses.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LocationFinderComponent } from './location-finder/location-finder.component';
import { HomeComponent } from './home/home.component';
import { FavoriteComponent } from './favorite/favorite.component';
export const routes: Routes = [
  { path: 'details/:id', component: DetailsComponent },
  { path: 'listing-of-houses', component: ListingOfHousesComponent },
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent},
  { path: 'location-finder', component: LocationFinderComponent },
  { path: '', component: HomeComponent },
  { path: 'favorite', component: FavoriteComponent },
];
