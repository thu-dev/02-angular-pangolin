import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendComponent } from './friend.component';
import { LayoutComponent } from './layout.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FriendsRoutingModule
    ],
    declarations: [
        LayoutComponent,
        FriendComponent,
    ]
})
export class FriendsModule { }