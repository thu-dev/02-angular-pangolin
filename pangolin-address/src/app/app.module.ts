import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';


// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { AddEditComponent } from './users/add-edit.component';
import { ListComponent } from './users/list.component';
import { FriendComponent } from './friends/friend.component';
import { ImageCropperModule } from 'ngx-image-cropper';



@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'users', component: ListComponent },
            { path: 'friends', component: FriendComponent },
            ]),
        ImageCropperModule

    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        AddEditComponent,
        ListComponent,
        FriendComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent],

})
export class AppModule { };