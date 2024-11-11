import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { LocationFinderComponent } from '../location-finder/location-finder.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, LocationFinderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  currentRoute: string = '';
  private routeSub: Subscription | undefined;
  username: string = '';
  loggedIn: boolean  = false;

  ngOnInit():void {
    this.routeSub = this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });

    if (localStorage.getItem('@User')) { 
      this.loggedIn = true;
      this.username = localStorage.getItem('@User') || '';
      this.username = this.username.replace(/"/g, '');
    }

  }
  ngOnDestroy(): void {
    this.routeSub!.unsubscribe();
  }
  displayContent(route: string):boolean {
    return this.currentRoute.includes(route);
  }
  constructor(private router: Router) { }
  dropdownOpen: boolean = false;
  searchLocation: boolean = false;
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  closeDropdown() {
    this.dropdownOpen = false;
  }
  showSearch() {
    this.searchLocation = !this.searchLocation;
  }
  logout() {
    localStorage.removeItem('@User');
    this.loggedIn = false;
    this.username = '';
    sessionStorage.removeItem('@Token');
    this.router.navigate(['/login']);
  }
}
