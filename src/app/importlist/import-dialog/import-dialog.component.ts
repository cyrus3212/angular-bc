import { HttpResponse, HttpEventType } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { IMPORT_TYPES } from '../../common/helper';

@Component({
  selector: 'app-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: [
    './import-dialog.component.css',
    '../../../assets/styles/font-awesome.min.css'
  ]
})
export class ImportDialogComponent implements OnInit {
  title = 'Import List';
  type = '';
  status = '';
  value = 0;
  processComplete = false;
  // determinate
  mode = 'indeterminate';
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MD_DIALOG_DATA) public data: any, private apiService: ApiService, public dialogRef: MdDialogRef<ImportDialogComponent>) {
    if (data.type) {
      this.type = data.type;
      this.status = this.getTitleByType(this.type);
    }
  }
  getTitleByType(type: string): string {
    switch (type) {
      case IMPORT_TYPES.CARD_PROFILE:
        return 'Importing Card Profiles...';
    }
    return '';
  }
  ngOnInit() {
    this.startImport();
  }
  startImport() {
    this.apiService.importCollection(IMPORT_TYPES.CARD_PROFILE).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        if (this.mode === 'indeterminate') {
          this.mode = 'determinate';
        }
        console.log(event.loaded + ' | ' + event.total);
        this.value = Math.round(100 * event.loaded / event.total);
        console.log(`File is ${this.value}% uploaded.`);
      } else if (event instanceof HttpResponse) {
        this.processComplete = true;
        console.log('SUCCESS:', event);
      }
    }, error => {
      console.log('ERROR:', error);
    });
  }
  onCloseDialogClick() {
    this.dialogRef.close({});
  }
}
