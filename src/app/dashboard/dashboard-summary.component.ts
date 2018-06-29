import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../state/reducers';
import * as LogoutActions from '../state/dashboard.component-actions';

@Component({
    selector: 'dashboard-summary',
    templateUrl: './dashboard-summary.component.html',
    styleUrls: [
        './dashboard.component.css',
        '../../assets/styles/font-awesome.min.css'
    ]
})
export class DashboardSummaryComponent implements AfterViewInit {
    @ViewChild('popUpStartEndDateFilter') popUpStartEndDateFilter: ElementRef;
    @ViewChild('popUpTotalFilter') popUpTotalFilter: ElementRef;
    @ViewChild('popUpStatusFilter') popUpStatusFilter: ElementRef;
    // temp repeat for promotion content
    Arr = Array;
    promoCount = 10;
    position = 1;

    isPromoAssignmentSortASC = false;
    isCreatedDateSortASC = false;

    comparisonTypes = [
        {value: '0', viewValue: 'Equal To'},
        {value: '1', viewValue: 'Greater Than'},
        {value: '2', viewValue: 'Lesser Than'}
    ];
    statusTypes = [
        {value: '0', viewValue: 'Draft'},
        {value: '1', viewValue: 'Published'},
        {value: '2', viewValue: 'Stopped'},
        {value: '3', viewValue: 'Paused'}
    ];
    pagingTypes = [
        {value: '50', viewValue: '50'},
        {value: '25', viewValue: '25'},
        {value: '10', viewValue: '10'}
    ];

    showStartEndDateFIlterTooltip = false;
    showTotalTooltip = false;
    showStatusTooltip = false;

    constructor(private store: Store<fromRoot.State>) {}

    ngAfterViewInit(): void {
    }

    onTogglePromoAssignmentNameSorting () {
        this.isPromoAssignmentSortASC = !this.isPromoAssignmentSortASC;
    }

    onToggleCreatedDateSorting () {
        this.isCreatedDateSortASC = !this.isCreatedDateSortASC;
    }

    onStartEndDateFilterClick(event) {
        this.showStartEndDateFIlterTooltip = !this.showStartEndDateFIlterTooltip;
        this.showTotalTooltip = false;
        this.showStatusTooltip = false;

        if (this.showStartEndDateFIlterTooltip) {
            const target = event.target;
            const targetLeft = target.offsetLeft;
            let targetTop = target.offsetTop;

            targetTop = targetTop + 55;

            this.popUpStartEndDateFilter.nativeElement.style.left = targetLeft + 'px';
            this.popUpStartEndDateFilter.nativeElement.style.top = targetTop + 'px';
        }
    }

    onTotalFilterClick(event) {
        this.showTotalTooltip = !this.showTotalTooltip;
        this.showStartEndDateFIlterTooltip = false;
        this.showStatusTooltip = false;

        if (this.showTotalTooltip) {
            const target = event.target;
            const targetLeft = target.offsetLeft;
            let targetTop = target.offsetTop;

            targetTop = targetTop + 55;

            this.popUpTotalFilter.nativeElement.style.left = targetLeft + 'px';
            this.popUpTotalFilter.nativeElement.style.top = targetTop + 'px';
        }
    }

    onStatusFilterClick(event) {
        this.showStatusTooltip = !this.showStatusTooltip;
        this.showTotalTooltip = false;
        this.showStartEndDateFIlterTooltip = false;

        if (this.showStatusTooltip) {
            const target = event.target;
            const targetLeft = target.offsetLeft;
            let targetTop = target.offsetTop;

            targetTop = targetTop + 55;

            this.popUpStatusFilter.nativeElement.style.left = targetLeft + 'px';
            this.popUpStatusFilter.nativeElement.style.top = targetTop + 'px';
        }
    }
}
