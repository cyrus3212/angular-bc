import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-management',
    templateUrl: 'admin-management.component.html',
    styleUrls: [
        './admin-management.component.css',
        '../promotion/promo-management.component.css',
        '../../assets/styles/font-awesome.min.css'
    ]
})
export class AdminManagementComponent implements OnInit {
    Arr = Array;
    promoCount = 10;
    selectAll = false;
    statusTypes = [
        {value: '0', viewValue: 'Active'},
        {value: '1', viewValue: 'Inactive'}
    ];

    constructor() {}
    ngOnInit() {}
    onSelectAll () {
        this.selectAll = !this.selectAll;
    }
    onCreateNewUser() {}
}
