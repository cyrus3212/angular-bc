import { Component, Input, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, RadioControlValueAccessor, FormArray, FormGroupDirective, NgForm } from '@angular/forms';
import { MdButton } from '@angular/material';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

// ngrx
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

// Model
import { Promo, PROMO_DEFAULT } from '../model/promo.model';
import { Reward } from '../model/reward.model';
import { BCConstants } from '../constants/bc.constants';

// Components
import { MessageDialogComponent } from '../dialog/message-dialog.component';

// Service
import { ApiService } from '../service/api.service';

// ngrx reducers
import * as fromRoot from '../state/reducers';
import { IPromo, NPromo, WinningParameter } from '../model/promo.interface';

export const DialogModes = {
    ADD: 1,
    EDIT: 2
};

@Component({
    selector: 'dialog-promo-create',
    templateUrl: './promo-create.component.html',
    styleUrls: [
        './promo-create.component.css',
        '../../assets/styles/font-awesome.min.css'
    ]
})
export class PromoCreateComponent implements OnInit {
    @ViewChild('sliderImagefilePicker') sliderImagefilePicker;
    title = 'Add New Promotion';
    PROMO_TEXT = '1';
    PROMO_CAROUSEL = '2';
    PROMO_MOVING_GRAPHICS = '3';
    dialogMode = DialogModes.ADD;
    statusTypes = [
        {value: 0, viewValue: 'Draft'},
        {value: 1, viewValue: 'Published'}
    ];
    promoTypes = [
        {id: '1', value: 'Text'},
        {id: '2', value: 'Carousel'},
        {id: '3', value: 'Moving Graphic'}
    ];
    textPlacementOptions = [
        {value: '1', viewValue: 'Left to Right'},
        {value: '2', viewValue: 'Right to Left'}
    ];
    movePatterns = [
        {value: '1', viewValue: 'Top of Screen'},
        {value: '2', viewValue: 'Bottom of Screen'}
    ];
    timerOptions = [
        {value: '0', viewValue: '5 sec'},
        {value: '1', viewValue: '4 sec'},
        {value: '2', viewValue: '3 sec'},
        {value: '3', viewValue: '2 sec'},
        {value: '4', viewValue: '1 sec'}
    ];
    selectedPromoType = this.PROMO_TEXT;
    // promo: Promo = PROMO_DEFAULT;
    // promos: Promo[];
    rewards: Observable<any>;
    accountRanges = 1;
    // Loading state
    isUploadingPhoto = false;
    isUploadingCharacterPhoto = false;
    isUploadingSuccessScreenPhoto = false;
    isUploadingCarouselPhoto = false;
    // Form Group
    promotionForm: FormGroup;
    // Image Upload
    backgroundImage = '';
    successImage = '';
    characterImage = '';
    // Promo interface model
    promo: IPromo;
    defaultPromoWinningParameter: WinningParameter = {
        max_winning_per_hour: '',
        account_range_from: '',
        account_range_to: '',
        chance_factor: '',
        card_profile: [{
            id: ''
        }]
    };
    defaultPromoCarousel = {
        image: '',
        winning_parameters: {
            max_winning_per_hour: '',
            account_range_from: '',
            account_range_to: '',
            chance_factor: '',
            card_profile: [{
                id: ''
            }]
        }
    };
    backgroundImageFileName = '';
    characterImageFileName = '';
    successImageFileName = '';
    sliderImageIndex = 0;
    isUploadingSliderImage = [];
    sliderImageFileName = [];
    // tslint:disable-next-line:max-line-length
    constructor(
        @Inject(MD_DIALOG_DATA) public data: any,
        private apiService: ApiService,
        private dialog: MdDialog,
        public dialogRef: MdDialogRef<MessageDialogComponent>,
        private store: Store<fromRoot.State>,
        private fb: FormBuilder
    ) {
        this.dialogMode = data.mode;
        store.subscribe(state => {
            this.rewards = state.reward.rewards;
        });
        console.log(data.promo, 're');

        if (data.mode === 2) {
            this.promo = data.promo;
        } else {
            this.clearPromo();
        }
    }
    ngOnInit () {
        this.promotionForm = this.initializePromotionForm();
        this.initializeWinningParameters();
        // Default winning parameters
        this.addWinningParameters();
    }
    initializePromotionForm () {
        return this.fb.group({
            id: [''],
            promo_id: [''],
            title: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
            description: ['', Validators.maxLength(100)],
            status: [''],
            type: [''],
            reward_id: ['', Validators.required],
            credit_load_amount: [''],
            info_text1: ['', Validators.maxLength(16)],
            info_text2: ['', Validators.maxLength(16)],
            text_placement: [''],
            text_movement: [''],
            background_image: [''],
            character_image: [''],
            success_text: [''],
            success_image: [''],
            fade_timer: [''],
            fade_move_pattern: [''],
            fade_movement_speed: [''],
            carousel_sequence: [''],
            carousel_interval_speed: [''],
            carousel_pause_speed: [''],
        });
    }
    initializePromotionFormControl (controlName, controlAbstract) {
        this.promotionForm.addControl(controlName, controlAbstract);
    }
    initializeWinningParameters () {
        this.initializePromotionFormControl('winning_parameters', this.fb.array([]));
    }
    addWinningParameters () {
        if (!this.promotionForm.controls.hasOwnProperty('winning_parameters')) {
            this.initializeWinningParameters();
        }
        const control = <FormArray>this.promotionForm.controls['winning_parameters'];
        if (!control.length) {
            // this.promo.winning_parameters.push(this.defaultPromoWinningParameter);
            control.push(this.initializeWinningParametersValue());
        }
    }
    addCarouselImages (isInit = false) {
        if (this.promo.carousel_images.length === 4) {
            return;
        }
        if (!this.promotionForm.controls.hasOwnProperty('carousel_images')) {
            this.initializeCarouselImages();
        }
        if (!isInit) {
            this.promo.carousel_images.push({
                image: '',
                winning_parameters: [{
                    max_winning_per_hour: '',
                    account_range_from: '',
                    account_range_to: '',
                    chance_factor: '',
                    card_profile: [{
                        id: '1'
                    }]
                }]
            });
            this.isUploadingSliderImage.push(false);
            this.sliderImageFileName.push('');
        }
        const control = <FormArray>this.promotionForm.controls['carousel_images'];
        control.push(this.initializeCarouselImagesWithWinningParameters());
    }
    initializeCarouselImagesWithWinningParameters () {
        return this.fb.group({
            image: '',
            winning_parameters: this.fb.array([
                this.fb.group({
                    max_winning_per_hour: [{value: '', disabled: true}],
                    account_range_from: [{value: '', disabled: true}],
                    account_range_to: [{value: '', disabled: true}],
                    // tslint:disable-next-line:max-line-length
                    chance_factor: [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.min(1), Validators.max(50)])],
                    card_profile: this.initializeCardProfiles()
                })
            ])
        });
    }
    initializeWinningParametersValue () {
        return this.fb.group({
            max_winning_per_hour: [''],
            account_range_from: [''],
            account_range_to: [''],
            chance_factor: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(50)])],
            card_profile: this.initializeCardProfiles()
        });
    }
    initializeCardProfiles () {
        return this.fb.array([
            this.fb.group({
                id: ['']
            })
        ]);
    }
    initializeCarouselImages () {
        this.initializePromotionFormControl('carousel_images', this.fb.array([]));
    }
    initializeCarouselWinningParameters () {
        if (this.promotionForm.controls.hasOwnProperty('winning_parameters')) {
            delete this.promotionForm.controls.winning_parameters;
        }
        //
        this.promotionForm.controls.carousel_images = this.fb.array([
            this.fb.group({
                image: '',
                winning_parameters: this.fb.array([
                    this.fb.group({
                        max_winning_per_hour: [''],
                        account_range_from: [''],
                        account_range_to: [''],
                        chance_factor: ['', Validators.compose([Validators.min(1), Validators.max(50)])],
                        card_profile: this.initializeCardProfiles()
                    })
                ])
            })
        ]);
    }
    keyupHandlerFunction(event: any) {
        this.promo.success_text = event;
    }
    onSelectChange(event: any) {
        this.isUploadingSliderImage = [false];
        this.sliderImageFileName = [''];
        this.promo.fade_move_pattern = '';
        this.promo.fade_movement_speed = '';
        this.promo.fade_timer = '';
        this.promo.carousel_interval_speed = '';
        this.promo.carousel_pause_speed = '';
        this.promo.carousel_sequence = '';
        this.promo.carousel_images = [{
            image: '',
            winning_parameters: [{
                max_winning_per_hour: '',
                account_range_from: '',
                account_range_to: '',
                chance_factor: '',
                card_profile: [{
                    id: '1'
                }]
            }]
        }];
        this.promo.winning_parameters = [{
            max_winning_per_hour: '',
            account_range_from: '',
            account_range_to: '',
            chance_factor: '',
            card_profile: [{
                id: '1'
            }]
        }];
        if (event.value === this.PROMO_CAROUSEL) {
            const hasWinningParameters = this.promotionForm.controls.hasOwnProperty('winning_parameters');
            if (hasWinningParameters) {
                delete this.promotionForm.controls.winning_parameters;
            }
            this.initializeCarouselImages();
            this.addCarouselImages(true);
        } else {
            const hasCarouselImages = this.promotionForm.controls.hasOwnProperty('carousel_images');
            if (hasCarouselImages) {
                delete this.promotionForm.controls.carousel_images;
            }
            this.initializeWinningParameters();
            this.addWinningParameters();
        }
        this.selectedPromoType = event.value;
    }
    savePromotion (data) {
        let dialog = this.dialog.open(MessageDialogComponent, {
                    disableClose: true,
                    data: {
                        title: 'Info',
                        message: 'Creating new promo...',
                        hasActions: false
                    }
                });
        const formData: any = {};
        for (const key in this.promo) {
            // console.log(this.promo[key], key);
            if (key === 'carousel_images') {
                continue;
            }
            if (key === 'winning_parameters') {
                continue;
            }
            if (key === 'type') {
                if (this.promo.type === '2') { // Carousel
                    formData.carousel_images = this.promo.carousel_images;
                    formData.type = this.promo.type;
                } else {
                    formData.type = this.promo.type;
                    formData.winning_parameters = this.promo.winning_parameters;
                }
            } else {
                if (!Array.isArray(this.promo[key]) && this.promo[key] !== '') {
                    formData[key] = this.promo[key];
                }
                if (Array.isArray(this.promo[key])) {
                    formData[key] = this.promo[key];
                }
            }
        }
        console.log(formData, 'FORM DATA');
        this.apiService.createNewPromo(formData)
        .then((result) => {
            dialog.close();
            dialog = this.dialog.open( MessageDialogComponent, {
                        data: {
                            title: 'Info',
                            message: 'Creating new promo...',
                            hasActions: false
                        }
                    });
            this.apiService.createNewPromo(formData)
            // tslint:disable-next-line:no-shadowed-variable
            .then((result) => {
                dialog.close();
                dialog = this.dialog.open( MessageDialogComponent, {
                            data: {
                                title: 'Info',
                                message: 'Saved successfully!',
                                hasActions: true
                            }
                        });
                dialog.afterClosed().subscribe(() => {
                    this.dialogRef.close({
                        data: result.data,
                        numberData: result.promo_id
                    });
                });
            })
            .catch((error) => {
                dialog.close();
                if (error.status === 500) {
                    dialog = this.dialog.open( MessageDialogComponent, {
                        data: {
                            title: 'Error',
                            message: 'Server Error.',
                            hasActions: true
                        }
                    });
                }
            });
        })
        .catch((error) => {
            dialog.close();
            const err = JSON.parse(error._body);
            let messages: any = [];
            if (Array.isArray(err)) {
                messages = err;
            } else {
                if (typeof err === 'object') {
                    for (const key in err) {
                        if (err[key]) {
                            messages.push(err[key]);
                        }
                    }
                } else {
                    messages.push('Server error.');
                    console.log(err);
                }
            }
            dialog = this.dialog.open(MessageDialogComponent, {
                data: {
                    title: 'Failed to save promotion!',
                    messages: messages,
                    hasActions: true
                }
            });
        });
    }
    onImageUpload (e) {
        if (e.srcElement.files.length) {
            this.setLoadingPhoto(e.target.name, true);
            this.apiService.uploadImage(e).subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    // Upload progress
                } else if (event instanceof HttpResponse) {
                    this.promo[e.target.name] = event.body.data.file_path;
                    switch (e.target.name) {
                        case 'success_image':
                            if (e.srcElement.files[0].name.length > 5) {
                                this.successImageFileName = e.srcElement.files[0].name.substring(0, 5) + '...';
                            } else {
                                this.successImageFileName = e.srcElement.files[0].name;
                            }
                            break;
                        case 'background_image':
                            if (e.srcElement.files[0].name.length > 5) {
                                this.backgroundImageFileName = e.srcElement.files[0].name.substring(0, 5) + '...';
                            } else {
                                this.backgroundImageFileName = e.srcElement.files[0].name;
                            }
                            break;
                        case 'character_image': 
                            if (e.srcElement.files[0].name.length > 5) {
                                this.characterImageFileName = e.srcElement.files[0].name.substring(0, 5) + '...';
                            } else {
                                this.characterImageFileName = e.srcElement.files[0].name;
                            }
                            break;
                        default:
                            break;
                    }
                    this.promotionForm.controls[e.target.name].setValue(event.body.data.file_path);
                    this.setLoadingPhoto(e.target.name, false);
                }
            }, error => {
                this.setLoadingPhoto(e.target.name, false);
            });
        } else {
            this.setLoadingPhoto(e.target.name, false);
        }
    }
    setUploadedImage (name, value) {
        switch (name) {
            case 'sucess_image':
                this.successImage = value;
                break;
            case 'background_image':
                this.backgroundImage = value;
                break;
            case 'character_image': 
                this.characterImage = value;
                break;
            default:
                break;
        }
    }
    setLoadingPhoto (name: string, flag: boolean) {
        switch (name) {
            case 'success_image':
                this.isUploadingSuccessScreenPhoto = flag;
                break;
            case 'background_image':
                this.isUploadingPhoto = flag;
                break;
            case 'character_image':
                this.isUploadingCharacterPhoto = flag;
                break;
            case 'slider_image':
                this.isUploadingCarouselPhoto = flag;
                break;
            default:
                break;
        }
    }
    myErrorStateMatcher(control: FormControl, form: FormGroupDirective | NgForm): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control.invalid && (control.dirty || control.touched || isSubmitted));
    }
    chanceStateMatcher(control: FormControl, form: FormGroupDirective | NgForm): boolean {
        const val = control.value;
        const isValid = val <= 100 && val > 0;
        return control.touched && !isValid;
    }
    // savePromotion (formData) {
    //     console.log(this.promo, 'NEW PROMO');
    //     console.log(formData, 'Form Data');
    // }
    clearPromo () {
        this.promo = {
            id: '',
            promo_id: '',
            title: '',
            description: '',
            status: '',
            type: '',
            reward_id: '',
            credit_load_amount: '',
            info_text1: '',
            info_text2: '',
            text_placement: '',
            text_movement: '',
            background_image: '',
            character_image: '',
            success_text: '',
            success_image: '',
            fade_timer: '',
            fade_move_pattern: '',
            fade_movement_speed: '',
            winning_parameters: [{
                max_winning_per_hour: '',
                account_range_from: '',
                account_range_to: '',
                chance_factor: '',
                card_profile: [{
                    id: '1'
                }]
            }],
            carousel_sequence: '',
            carousel_interval_speed: '',
            carousel_pause_speed: '',
            carousel_images: [{
                image: '',
                winning_parameters: [{
                    max_winning_per_hour: '',
                    account_range_from: '',
                    account_range_to: '',
                    chance_factor: '',
                    card_profile: [{
                        id: '1'
                    }]
                }]
            }],
        }
    }
    openSliderImagefilePicker (i) {
        this.sliderImageIndex = i;
        this.sliderImagefilePicker.nativeElement.click();
    }
    onSliderImageUpload (e) {
        if (e.srcElement.files.length) {
            console.log(e.srcElement.files, 'file');
            this.isUploadingSliderImage[this.sliderImageIndex] = true;
            this.apiService.uploadImage(e).subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    // Upload progress
                } else if (event instanceof HttpResponse) {
                    this.promo.carousel_images[this.sliderImageIndex].image = event.body.data.file_path;
                    this.sliderImageFileName[this.sliderImageIndex] = e.srcElement.files[0].name;
                    const pf: any = this.promotionForm.controls['carousel_images'];
                    pf.controls[this.sliderImageIndex].controls.image.setValue(event.body.data.file_path);
                    this.isUploadingSliderImage[this.sliderImageIndex] = false;
                    this.enableCarouselWinningParametersInput();
                }
            }, error => {
                this.isUploadingSliderImage[this.sliderImageIndex] = false;
            });
        } else {
            this.isUploadingSliderImage[this.sliderImageIndex] = false;
        }
    }
    enableCarouselWinningParametersInput () {
        const pf: any = this.promotionForm.controls['carousel_images'];
        // tslint:disable-next-line:max-line-length
        pf.controls[this.sliderImageIndex].setControl('winning_parameters', this.fb.array([
            this.fb.group({
                max_winning_per_hour: [{value: '', disabled: false}],
                account_range_from: [{value: '', disabled: false}],
                account_range_to: [{value: '', disabled: false}],
                chance_factor: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(50)])],
                card_profile: this.initializeCardProfiles()
            })
        ]));
    }
    deleteCarousel (i: number) {
        const cci = <FormArray>this.promotionForm.controls['carousel_images'];
        cci.controls.splice(i, 1);
        this.promo.carousel_images.splice(i, 1);
        this.isUploadingSliderImage.splice(i, 1);
        this.sliderImageFileName.splice(i, 1);
        // console.log(this.promo.carousel_images, '1');
        // console.log(this.promo.carousel_images, '2');
    }
    copyCarousel (i) {
        if (this.promo.carousel_images.length === 4) {
            return;
        }
        const carousel = this.promo.carousel_images[i];
        this.promo.carousel_images.push(carousel);
        this.isUploadingSliderImage.push(false);
        this.sliderImageFileName.push(this.sliderImageFileName[i]);
        const control = <FormArray>this.promotionForm.controls['carousel_images'];
        control.push(this.fb.group({
            image: [carousel.image],
            winning_parameters: this.fb.array([
                this.fb.group({
                    max_winning_per_hour: [{value: carousel.winning_parameters[0].max_winning_per_hour, disabled: true}],
                    account_range_from: [{value: carousel.winning_parameters[0].account_range_from, disabled: true}],
                    account_range_to: [{value: carousel.winning_parameters[0].account_range_to, disabled: true}],
                    // tslint:disable-next-line:max-line-length
                    chance_factor: [{value: carousel.winning_parameters[0].chance_factor, disabled: true}, Validators.compose([Validators.required, Validators.min(1), Validators.max(50)])],
                    card_profile: this.initializeCardProfiles()
                })
            ])
        }));
        console.log(control, 'control');
    }
}
