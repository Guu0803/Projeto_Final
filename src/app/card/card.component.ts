import { Component, Input } from '@angular/core';
import { House } from '../model/house.model';
import { NgFor, NgIf, } from '@angular/common';
import {  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent {
  @Input() house!: House;
  currentIndex: number = 0;
  images: string[] = [];
  favorite: boolean = false;
  housePrice: string = '';
  favoriteList: House[] = [];
  listOfHouse = JSON.parse(localStorage.getItem('@Houses') || '[]');
  currentRoute: string = '';
  favoriteHouses: House[] = [];
  private routeSub: Subscription | undefined;
 

constructor(private router: Router,  private dataSharingService: DataSharingService) { }
  toDetails(id:string) {
   this.router.navigate(['/details', id]);
  }
  ngOnInit(): void {
    this.images = this.house.images;
    this.routeSub = this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }
  displayContent(route: string):boolean {
    return this.currentRoute.includes(route);
  }
  ngOnDestroy(): void {
    this.routeSub!.unsubscribe();
  }
  goToIndex(index: number) {
    this.currentIndex = index;
  }
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
  toggleFavorite() {
    (this.favorite) ? (this.favorite = false) : (this.favorite = true);
  }
  
  unfavorite(id: string) {
    console.log(id, 'unfavorite')

    this.listOfHouse = this.listOfHouse.filter((house: House) => house.id !== id);
    localStorage.setItem('@Favorite', JSON.stringify(this.listOfHouse));
  }
  addFavorite(id: string) {
    const houseToAdd = this.listOfHouse.find((element: House) => element.id === id);
    this.favoriteList.push(houseToAdd);
    this.dataSharingService.updateFavorite(this.favoriteList);
  }
}

