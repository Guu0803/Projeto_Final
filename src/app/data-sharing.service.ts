import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { House } from './model/house.model';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private dataSource = new BehaviorSubject<any[]>([]);
  currentData = this.dataSource.asObservable();
  private favoriteDataSource = new BehaviorSubject<any[]>([]);
  favoriteData = this.favoriteDataSource.asObservable();
  updateData(newData: House[]) {
    this.dataSource.next(newData);
  }
  updateFavorite(newData: House[]) {
    this.favoriteDataSource.next(newData);
  }
  constructor() { }
}
