import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { isEmpty } from 'validator';
import { HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

// ngrx
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

// Services
import { ApiService } from '../service/api.service';

// Components
import { PromoCreateComponent, DialogModes } from './promo-create.component';
import * as moment from 'moment';
import { sortArrayByKey, SORT } from '../common/helper';

// Model
import { Promo } from '../model/promo.model';

// ngrx actions
import * as RewardAction from '../state/create-promo.component-actions';

// ngrx reducers
import * as fromRoot from '../state/reducers';

//
import { IPromo, NPromo, WinningParameter } from '../model/promo.interface';

@Component({
    selector: 'promo-management',
    templateUrl: './promo-management.component.html',
    styleUrls: [
        './promo-management.component.css',
        '../../assets/styles/font-awesome.min.css'
    ]
})
export class PromotionManagementComponent implements OnInit {
    Arr = Array;
    promoCount = 10;
    promoList: Promo[] = [];
    selectAll = false;
    pagingTypes = [
        {value: '50', viewValue: '50'},
        {value: '25', viewValue: '25'},
        {value: '10', viewValue: '10'}
    ];
    statusTypes = [
        {value: 0, viewValue: 'Draft'},
        {value: 1, viewValue: 'Published'}
    ];
    promoTypes = [
        {value: 0, viewValue: 'All'},
        {value: 1, viewValue: 'Text'},
        {value: 2, viewValue: 'Carousel'},
        {value: 3, viewValue: 'Moving Graphic'}
    ];
    page = 1;
    pageSize = 10;
    total = 0;
    statusFilter = 1; // Default to published
    promoTypeFilter = 0; // Default to all
    isDateSortedAsc = 2; // Default to DESC
    isPromoIdSortedAsc = 0;
    isTitleSortedAsc = 0;
    isTypeSortedAsc = 0;
    // Promo model
    // promo = new Promo();
    promo: IPromo = NPromo;
    currentPage = 1;
    defaultPromoWinningParameter: WinningParameter[] = [{
        max_winning_per_hour: '',
        account_range_from: '',
        account_range_to: '',
        chance_factor: '',
        card_profile: [{
            id: ''
        }]
    }];
    
    defaultPromoCarousel = [{
        image: '',
        winning_parameters: [{
            max_winning_per_hour: '',
            account_range_from: '',
            account_range_to: '',
            chance_factor: '',
            card_profile: [{
                id: ''
            }]
        }]
    }];
    constructor(
        private dialog: MdDialog,
        private apiService: ApiService,
        private store: Store<fromRoot.State>,
    ) {
        // this.promo = new Promo();
    }

    ngOnInit() {
        this.getAllPromotions(this.page, this.pageSize);

        this.getAllRewards();
    }

    getAllPromotions (page: number, pageSize: number) {
        console.log('Status Filter:', this.statusFilter);
        // tslint:disable-next-line:max-line-length
        this.apiService.getAllPromotions(page, pageSize, this.statusFilter, this.promoTypeFilter, this.isDateSortedAsc, this.isPromoIdSortedAsc, this.isTitleSortedAsc, this.isTypeSortedAsc)
        .then((result) => {
            let iPromo = new Promo();
            for (let i = 0; i < result.data.length; i++) {
                iPromo = new Promo();
                const dataPromo = result.data[i];
                for (const key in iPromo) {
                    if (key) {
                        iPromo[key] = dataPromo[key];
                    }
                }
                this.promoList.push(iPromo);
            }
            this.promoList = result.data;
            this.total = result.meta.pagination.total;
            page = result.meta.pagination.current_page;
            this.currentPage = page;
            page++;
        })
        .catch((error) => {
            console.log(error);
        });
    }
    onSelectAll () {
        this.selectAll = !this.selectAll;
    }
    onCreateNewPromo() {
        const dialogRef = this.dialog.open(PromoCreateComponent, {
            data: {
                mode: DialogModes.ADD
            },
            disableClose: true
        });
        // sample dialog response handling
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const dataPromo = result.data;
                // this.promo = new Promo();
                const iPromo = new Promo();
                for (const key in this.promo) {
                    if (key) {
                        iPromo[key] = dataPromo[key];
                    }
                }
                if (this.currentPage === 1) {
                    this.promoList.pop();
                    this.promoList.unshift(iPromo);
                }
                this.total++;
            }
        });
    }
    onEditPromotion (index: number) {
        // Selected Promo
        const promo = this.promoList[index];
        console.log(promo, 'p');
        let promoData: any = {};
        for (let key in this.promo) {
            if (key === 'carousel_images') {
                if (promo[key] && promo[key].length) {
                    promoData[key] = promo[key];
                } else {
                    promoData[key] = this.defaultPromoCarousel;
                }
                continue;
            }

            if (key === 'winning_parameters') {
                if (promo[key] && promo[key].length) {
                    promoData[key] = promo[key];
                } else {
                    promoData[key] = this.defaultPromoWinningParameter;
                }
                continue;
            }
            
            promoData[key] = promo[key] || '';
        }
        console.log(promoData, '-------------------M');
        const dialogRef = this.dialog.open(PromoCreateComponent, {
            data: {
                mode: DialogModes.EDIT,
                promo: promoData
                },
            disableClose: true
        });
        // sample dialog response handling
        dialogRef.afterClosed().subscribe(result => {
            console.log(result.data + ' : ' + result.numberData);
        });
    }
    onStatusFilterChange(event) {
        this.getAllPromotions((this.page + 1), this.pageSize);
    }
    onPromoTypeFilterChange(event) {
        this.getAllPromotions((this.page + 1), this.pageSize);
    }
    onSortTableHeader(key: string) {
        let hasChange = false;
        switch (key) {
            case 'created_at.date':
                this.isDateSortedAsc++;
                if (this.isDateSortedAsc > 2) {
                    this.isDateSortedAsc = 0;
                }
                hasChange = true;
                break;
            case 'promo_id':
                this.isPromoIdSortedAsc++;
                if (this.isPromoIdSortedAsc > 2) {
                    this.isPromoIdSortedAsc = 0;
                }
                hasChange = true;
                break;
            case 'title':
                this.isTitleSortedAsc++;
                if (this.isTitleSortedAsc > 2) {
                    this.isTitleSortedAsc = 0;
                }
                hasChange = true;
                break;
            case 'type':
                this.isTypeSortedAsc++;
                if (this.isTypeSortedAsc > 2) {
                    this.isTypeSortedAsc = 0;
                }
                hasChange = true;
                break;
        }
        if (hasChange) {
            this.getAllPromotions((this.page + 1), this.pageSize);
        }
    }
    getFormattedDate(sDate: string): string {
        return moment(sDate).format('LL') || sDate;
    }
    getPromoTypeById(type: string): string {
        const promoTypeId = type.toString();
        switch (promoTypeId) {
            case '1':
                return 'Text';
            case '2':
                return 'Carousel';
            case '3':
                return 'Moving Graphic';
            default:
                return 'default';
        }
    }
    getPromoNameById(promo): string {
        return promo.title + (promo.status === 0 ? ' - draft' : '');
    }
    onPageChange(pagination: any) {
        console.log(pagination);
        // reset all sorting states when changing pages
        // execute page change
        this.page = pagination.pageIndex;
        this.pageSize = pagination.pageSize;
        this.getAllPromotions((this.page + 1), this.pageSize);
    }
    getAllRewards () {
        this.apiService.getAllRewards().subscribe((event) => {
            if (event.type === HttpEventType.UploadProgress) {
            } else if (event instanceof HttpResponse) {
                this.store.dispatch(new RewardAction.AReward({rewards: event.body.data}));
            }
        });
    }
}
