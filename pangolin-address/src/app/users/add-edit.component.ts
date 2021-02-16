import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { FileUploader } from 'ng2-file-upload';

import { AccountService, AlertService, CartService } from '../_services';

@Component({ templateUrl: 'add-edit.component.html',
styleUrls: [ './add-edit.component.css' ]

 })




export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;



    name = 'Angular 4';
    url = null;

    changingImage: boolean;

    imageChangedEvent: any = '';
    croppedImage: any = '';
    date: any;


    uploader:FileUploader;
    hasBaseDropZoneOver:boolean;
    hasAnotherDropZoneOver:boolean;
    response:string;
    

    // fileChangeEvent(event: any): void {
    //     this.imageChangedEvent = event;
    // }
    // imageCropped(event: ImageCroppedEvent) {
    //     this.croppedImage = event.base64;
    // }
    // imageLoaded(image: HTMLImageElement) {
    //     // show cropper
    // }
    // cropperReady() {
    //     // cropper ready
    // }
    // loadImageFailed() {
    //     // show message
    // }


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private cartService: CartService,
    ) {}


    
    
    
    

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            age: [''],
            family: [''],
            race: [''],
            food: [''],
            fileinput: [''],
            password: ['', passwordValidators]
        });

        if (!this.isAddMode) {
            this.accountService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.f.firstName.setValue(x.firstName);
                    this.f.lastName.setValue(x.lastName);
                    this.f.username.setValue(x.username);
                    this.f.age.setValue(x.age);
                    this.f.family.setValue(x.family);
                    this.f.race.setValue(x.race);
                    this.f.food.setValue(x.food);
                    this.f.fileinput.setValue(x.fileInput);
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('User added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['.', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private updateUser() {
        this.accountService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['..', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    changingImageClick() {
        this.changingImage = true;
    }

    SaveNewImage() {
        this.changingImage = false;
    }


    onSelectFile(event) {
        if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
      
        reader.readAsDataURL(event.target.files[0]); // read file as data url
      
        reader.onload = (event) => { // called once readAsDataURL is completed
            this.url = event.target.result;
            }
          }
        }
        public delete(){
          this.url = null;
        }


}