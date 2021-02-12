import { Injectable } from '@angular/core';
import { Friend, User } from '../_models';
import { environment } from '../../environment';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
  
})
export class CartService {


  
    friends = [];

  
    addToCart(user:User) {
       this.friends.push(user);
    }
  
 


    getItems() {
      return this.friends;
    }


    clearCart() {
      this.friends = [];
      return this.friends;
    }

    delete(id: string) {
      this.friends.forEach((friend,index)=>{
        if(friend.id==id)
        this.friends.splice(index,1);
      })
    return this.friends
      }


      // private userSubject: BehaviorSubject<User>;
      // public user: Observable<User>;
    
      // constructor(
      //     private router: Router,
      //     private http: HttpClient
      // ) 
      // {
      //     this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      //     this.user = this.userSubject.asObservable();
      // }
    
      // public get userValue(): User {
      //     return this.userSubject.value;
      // }
    
      // login(username, password) {
      //     return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
      //         .pipe(map(user => {
      //             // store user details and jwt token in local storage to keep user logged in between page refreshes
      //             localStorage.setItem('user', JSON.stringify(user));
      //             this.userSubject.next(user);
      //             return user;
      //         }));
      // }


  }