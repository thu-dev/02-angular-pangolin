import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '../_services';
import { Router,ActivatedRoute } from '@angular/router';
import { CartService } from '../_services';

import { Injectable } from '@angular/core';


@Component({ templateUrl: 'friend.component.html' })

export class FriendComponent implements OnInit {


    friends = this.cartService.getItems();


    users = null;

    constructor(private accountService: AccountService,
        private route: ActivatedRoute,
        private router: Router,
        private cartService: CartService,
        ) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    remove(index: number): void {
        this.friends.splice(index, 1);
       }

    getById(id: string) {
        this.friends.forEach((friend,index) => {
          if(friend.id==id)
          return friend.id
        });
        return "0";
      }
}

// @Injectable()
// export class SharingService {
//   private storageName: string = "Settings";

//   constructor() { }

//   setSettings(user: any) {
//     localStorage.setItem(this.storageName, JSON.stringify(user));
//   }

//   getUserSettings() {
//     let user = localStorage.getItem(this.storageName);
//     return JSON.parse(user);
//   }

//   clearUserSettings() {
//     localStorage.removeItem(this.storageName);
//   }

//   cleanAll() {
//     localStorage.clear()
//   }

// }