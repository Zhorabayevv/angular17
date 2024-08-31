import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { IMaskGroups } from 'src/app/shared/interfaces/maskPattern.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    standalone: true,
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
    imports: [
        CommonModule,
        TranslateModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
})
export class AdminComponent implements OnInit {
    public testForm: FormGroup = this._fb.group({
        test_input: [null, [Validators.required, Validators.email]],
        test_select: [null, Validators.required],
        test_multi_select: [null, Validators.required],
    });
    public masks: IMaskGroups = {
        phone: {
            mask: '+0 (000) 000-00-00',
            pattern: { '0': { pattern: new RegExp('[A-Za-z0-9]') } },
        },
    };

    constructor(
        private _fb: FormBuilder,
        private _alertService: AlertService,
    ) {}

    ngOnInit(): void {}

    public cancel(): void {
        this._alertService.error('Title', this.testForm.get('test_input')?.value);
    }
}
