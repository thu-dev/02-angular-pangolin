import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '../_services';

// import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import { users } from './add-edit.component';
import { CartService } from '../_services';
// import { users } from '../_models';

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

    addToCart(users) {
        this.cartService.addToCart(users);
        window.alert('Your friend has been added to the list!');
      }
    
}

