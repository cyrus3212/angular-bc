import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdDialog } from '@angular/material';
import { DialogModes } from '../promo-create.component';
import { PromoAssignBranchFranchiseeComponent } from '../promo-assign-branch-franchisee/promo-assign-branch-franchisee.component';

@Component({
  selector: 'app-promo-assign-dialog',
  templateUrl: './promo-assign-dialog.component.html',
  styleUrls: [
    './promo-assign-dialog.component.css',
    '../../../assets/styles/font-awesome.min.css'
  ]
})
export class PromoAssignDialogComponent implements OnInit {
  title = 'Assign Promotion';
  dialogMode = DialogModes.ADD;
  Arr = Array;
  sliderCount = 3;
  // promo types
  PROMO_TEXT = 'Text';
  PROMO_CAROUSEL = 'Carousel';
  PROMO_MOVING_GRAPHICS = 'Moving Graphic';
  selectedPromoType = this.PROMO_TEXT;
  // promo types array
  promoTypes = [
      {value: this.PROMO_TEXT, viewValue: 'Promo 1'},
      {value: this.PROMO_CAROUSEL, viewValue: 'Promo 2'},
      {value: this.PROMO_MOVING_GRAPHICS, viewValue: 'Promo 3'}
  ];
  // merchants array
  merchants = [
      {value: 1, viewValue: 'Merchant 1'},
      {value: 2, viewValue: 'Merchant 2'},
      {value: 3, viewValue: 'Merchant 3'}
  ];
  cardTypes = [
      {value: 1, viewValue: 'Card Type 1'},
      {value: 2, viewValue: 'Card Type 2'},
      {value: 3, viewValue: 'Card Type 3'}
  ];
  assignmentNames = [
      {value: 1, viewValue: 'Assignment Name 1'},
      {value: 2, viewValue: 'Assignment Name 2'},
      {value: 3, viewValue: 'Assignment Name 3'}
  ];
  // constructor
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<PromoAssignDialogComponent>, private dialog: MdDialog) {
    this.dialogMode = data.mode;
    this.title = (this.dialogMode === DialogModes.ADD) ? 'Assign Promotion' : 'Edit Assigned Promotion';
  }
  ngOnInit() {}
  onGeneratePromoPackageClick() {}
  onSelectChange(event: any) {
    this.selectedPromoType = event.value;
  }
  onBranchOrFranchiseeClick() {
        const dialogRef = this.dialog.open(PromoAssignBranchFranchiseeComponent, {
            data: {
                mode: DialogModes.EDIT
            },
            disableClose: true
        });
  }
}
