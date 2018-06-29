import { Component } from '@angular/core';

@Component({
  selector: 'progress-dialog',
  template: `
  <div class="dialog">
  <div class="margin-left-x2">Loading...</div>
  </div>
  `,
  styleUrls: ['./progress.dialog.css']
})
export class ProgressDialog {
//   constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {}
}
