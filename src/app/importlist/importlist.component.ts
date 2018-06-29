import {HttpResponse, HttpEventType} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IMPORT_TYPES } from '../common/helper';
import { MdDialog } from '@angular/material';
import { ImportDialogComponent } from './import-dialog/import-dialog.component';

@Component({
  selector: 'app-importlist',
  templateUrl: './importlist.component.html',
  styleUrls: [
    './importlist.component.css',
    '../../assets/styles/font-awesome.min.css'
  ]
})
export class ImportlistComponent implements OnInit {
  title = 'Import List';
  summary = 'Import Card Profiles, Account Ranges, Merchants, Branches, Franchisees and Transaction Data';
  constructor(
    private dialog: MdDialog
  ) {}
  ngOnInit() {
  }
  onCardProfileFileSelected() {
    const dialogRef = this.dialog.open(ImportDialogComponent, {
            data: {
                type: IMPORT_TYPES.CARD_PROFILE
            },
            disableClose: true
        });
  }
  onAccountRangesFileSelected() {
  }
  onMerchantsFile() {
  }
  onBranchesFileSelected() {
  }
  onFranchieesFileSelected() {
  }
  onTransactionDataFileSelected() {
  }
}
