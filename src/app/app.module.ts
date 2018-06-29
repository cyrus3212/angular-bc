import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './state/reducers';

// Views
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardSummaryComponent } from './dashboard/dashboard-summary.component';
import { PromotionManagementComponent } from './promotion/promo-management.component';
import { AdminManagementComponent } from './admin/admin-management.component';
import { PromoAssignmentComponent } from './promotion/promo-assignment/promo-assignment.component';
// Dialog Views
import { PromoCreateComponent } from './promotion/promo-create.component';
import { PromoAssignDialogComponent } from './promotion/promo-assign-dialog/promo-assign-dialog.component';
import { PromoAssignBranchFranchiseeComponent } from './promotion/promo-assign-branch-franchisee/promo-assign-branch-franchisee.component';
import { ImportDialogComponent } from './importlist/import-dialog/import-dialog.component';
// Routing
import { AppRoutingModule } from './app-routing.module';
// Guards
import { AuthenticationGuard } from './guard/authentication.guard';
// AMD Imports
import { MdButtonModule, MdProgressBarModule, MdDialogModule, MdToolbarModule, MdSelectModule, MdGridListModule } from '@angular/material';
import { MdDatepickerModule, MdNativeDateModule, MdCheckboxModule, MdRadioModule, MdSnackBarModule } from '@angular/material';
import { MdPaginatorModule, MdInputContainer, MdInputModule, MD_PLACEHOLDER_GLOBAL_OPTIONS } from '@angular/material';
// BrowserAnimationsModule
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// Entry Imports
import { ProgressDialog } from './dialog/progress.dialog';
import { MessageDialogComponent } from './dialog/message-dialog.component';
// Service imports
import { ApiService } from './service/api.service';
// WYSIWYG
import { TextEditorComponent } from './common/text-editor.component';
import { ImportlistComponent } from './importlist/importlist.component';

@NgModule({
  declarations: [
    // user views
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DashboardSummaryComponent,
    PromotionManagementComponent,
    PromoAssignmentComponent,
    AdminManagementComponent,
    // end user views
    ProgressDialog,
    MessageDialogComponent,
    // dialog views start
    PromoCreateComponent,
    PromoAssignDialogComponent,
    PromoAssignBranchFranchiseeComponent,
    ImportDialogComponent,
    // dialog views end
    // common components start
    TextEditorComponent,
    // cc end
    ImportlistComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    StoreModule.forRoot(reducers),
    // material modules start
    [NoopAnimationsModule, MdButtonModule, MdProgressBarModule, MdDialogModule, MdToolbarModule, MdSelectModule, MdDatepickerModule],
    [MdNativeDateModule, MdCheckboxModule, MdRadioModule, MdSnackBarModule, MdPaginatorModule, MdInputModule, MdGridListModule],
    // material modules end
    ReactiveFormsModule
  ],
  entryComponents: [
    ProgressDialog,
    MessageDialogComponent,
    PromoCreateComponent,
    PromoAssignDialogComponent,
    PromoAssignBranchFranchiseeComponent,
    ImportDialogComponent,
    TextEditorComponent
  ],
  providers: [
    ApiService,
    AuthenticationGuard,
    // to disable placeholder
    // {provide: MD_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'never' }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
