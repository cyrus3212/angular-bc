import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-promo-assign-branch-franchisee',
  templateUrl: './promo-assign-branch-franchisee.component.html',
  styleUrls: [
    './promo-assign-branch-franchisee.component.css',
    '../../../assets/styles/font-awesome.min.css'
  ]
})
export class PromoAssignBranchFranchiseeComponent implements OnInit {
  title = 'Select Branch/Franchisee';
  Arr = Array;
  branchCount = 5;
  selectAll = false;

  constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<PromoAssignBranchFranchiseeComponent>) {
  }
  ngOnInit() {
  }
  onGeneratePromoPackageClick() {}
  onSelectAll () {
      this.selectAll = !this.selectAll;
  }
}
