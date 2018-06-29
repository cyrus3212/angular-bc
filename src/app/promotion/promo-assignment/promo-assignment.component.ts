import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MdDialog } from '@angular/material';
import { DialogModes } from '../promo-create.component';
import { PromoAssignDialogComponent } from '../promo-assign-dialog/promo-assign-dialog.component';

@Component({
  selector: 'app-promo-assignment',
  templateUrl: './promo-assignment.component.html',
  styleUrls: [
    './promo-assignment.component.css',
    '../promo-management.component.css',
    '../../../assets/styles/font-awesome.min.css'
  ]
})
export class PromoAssignmentComponent implements OnInit {
    @ViewChild('popUpStartEndDateFilter') popUpStartEndDateFilter: ElementRef;
    @ViewChild('popUpStatusFilter') popUpStatusFilter: ElementRef;
    @ViewChild('popUpPromoType') popUpPromoType: ElementRef;

    Arr = Array;
    promoCount = 10;

    selectAll = false;
    showStartEndDateFIlterTooltip = false;
    showPromoTypeTooltip = false;
    showStatusTooltip = false;

    pagingTypes = [
        {value: '50', viewValue: '50'},
        {value: '25', viewValue: '25'},
        {value: '10', viewValue: '10'}
    ];
    statusTypes = [
        {value: '0', viewValue: 'Draft'},
        {value: '1', viewValue: 'Published'},
        {value: '2', viewValue: 'Stopped'},
        {value: '3', viewValue: 'Paused'}
    ];
    constructor(private dialog: MdDialog) {}

    ngOnInit() {}

    onSelectAll () {
        this.selectAll = !this.selectAll;
    }
    onStartEndDateFilterClick(event) {
        this.showStartEndDateFIlterTooltip = !this.showStartEndDateFIlterTooltip;
        this.showPromoTypeTooltip = false;
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
    onPromoTypeFilterClick(event) {
        this.showPromoTypeTooltip = !this.showPromoTypeTooltip;
        this.showStatusTooltip = false;
        this.showStartEndDateFIlterTooltip = false;

        if (this.showPromoTypeTooltip) {
            const target = event.target;
            const targetLeft = target.offsetLeft;
            let targetTop = target.offsetTop;

            targetTop = targetTop + 55;

            this.popUpPromoType.nativeElement.style.left = targetLeft + 'px';
            this.popUpPromoType.nativeElement.style.top = targetTop + 'px';
        }
    }
    onStatusFilterClick(event) {
        this.showStatusTooltip = !this.showStatusTooltip;
        this.showPromoTypeTooltip = false;
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
    onCreateNewPromo() {
        const dialogRef = this.dialog.open(PromoAssignDialogComponent, {
            data: {
                mode: DialogModes.ADD
            },
            disableClose: true
        });
        // sample dialog response handling
        dialogRef.afterClosed().subscribe(result => {
            console.log(result.data + ' : ' + result.numberData);
        });
    }
    onEditPromotion (index: number) {
        const dialogRef = this.dialog.open(PromoAssignDialogComponent, {
            data: {
                mode: DialogModes.EDIT
            },
            disableClose: true
        });
        // sample dialog response handling
        dialogRef.afterClosed().subscribe(result => {
            console.log(result.data + ' : ' + result.numberData);
        });
    }

}
