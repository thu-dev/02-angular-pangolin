import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '../_services';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../_services';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({ templateUrl: 'list.component.html' })

export class ListComponent implements OnInit {

    users = null;

    constructor(private accountService: AccountService,
        private route: ActivatedRoute,
        private cartService: CartService,
        ) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }


    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.users = this.users.filter(x => x.id !== id) 
            });
    }

    addToCart(friends) {
        this.cartService.addToCart(friends);
        window.alert('Your friend has been added to the list!');

      }
    
    
}




