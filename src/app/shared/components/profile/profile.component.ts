import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import {
    AnimationBuilder,
    AnimationPlayer,
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';

import { IShortEntity } from 'src/app/shared/interfaces/shortEntity.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { IMaskGroups } from 'src/app/shared/interfaces/maskPattern.interface';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
    selector: 'ui-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    animations: [
        trigger('contentState', [
            state(
                'void',
                style({
                    transform: 'translateX(100%)',
                }),
            ),
            state(
                '*',
                style({
                    transform: 'translateX(0)',
                }),
            ),
            transition(':enter', [animate('0.3s ease-out')]),
            transition(':leave', [
                animate(
                    '0.3s ease-out',
                    style({
                        transform: 'translateX(100%)',
                    }),
                ),
            ]),
        ]),
    ],
})
export class ProfileComponent implements OnInit {
    @ViewChild('drawerContent') drawerContent: ElementRef;

    @Input('isOpen') isOpenProps: boolean = false;

    @Output('isOpenChange') isOpenChangeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    private player: AnimationPlayer;
    public tabs: IShortEntity[] = [
        {
            code: 'general',
            name: 'Общая информация',
        },
        {
            code: 'security',
            name: 'Безопасность',
        },
    ];
    public userContent: Record<string, string> = {
        image: 'assets/images/user-photo.webp',
        name: 'Y. Abylaikhan',
        email: 'abyltrouble@gmail.com',
    };
    public profileForm: FormGroup = this._fb.group({
        iin: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
        lastname: [null, Validators.required],
        firstname: [null, Validators.required],
        middlename: [null],
        login: ['abyltrouble@gmail.com'],
        email: [null, [Validators.required, Validators.email]],
        phone: [null, Validators.required],
        password: [null],
        newPassword: [null],
        confirmPassword: [null],
    });
    public masks: IMaskGroups = {
        phone: {
            mask: '+0 (000) 000-00-00',
            pattern: { '0': { pattern: new RegExp('[A-Za-z0-9]') } },
        },
        iin: {
            mask: '000000000000',
            pattern: { '0': { pattern: new RegExp('[0-9]') } },
        },
    };
    public selectedGeneralTab: boolean = true;

    constructor(
        private _fb: FormBuilder,
        private _animationBuilder: AnimationBuilder,
        private _alertService: AlertService,
        private _sharedService: SharedService,
    ) {}

    ngOnInit(): void {}

    public closeDrawer(): void {
        const animation = this._animationBuilder.build([
            animate('300ms ease-in', style({ transform: 'translateX(100%)' })),
        ]);

        this.player = animation.create(this.drawerContent.nativeElement);
        this.player.onDone(() => {
            this.isOpenChangeEvent.emit(this.isOpenProps);
        });
        this.player.play();
    }

    public selectedTab(tabCode: string): void {
        if (tabCode === 'general') {
            this.selectedGeneralTab = true;

            this.updateValidators(true);
        } else {
            this.selectedGeneralTab = false;

            this.updateValidators(false);
        }
    }

    private updateValidators(isGeneral: boolean) {
        const generalValidators = {
            iin: [Validators.required, Validators.minLength(12), Validators.maxLength(12)],
            lastname: Validators.required,
            firstname: Validators.required,
            email: [Validators.required, Validators.email],
            phone: Validators.required,
        };

        const otherValidators = {
            password: Validators.required,
            newPassword: Validators.required,
            confirmPassword: [
                Validators.required,
                this._sharedService.confirmPasswordValidator('newPassword', this.profileForm),
            ],
        };

        if (isGeneral) {
            this.applyValidators(this.profileForm, generalValidators);
            this.clearValidatorsForControls(this.profileForm, Object.keys(otherValidators));
        } else {
            this.applyValidators(this.profileForm, otherValidators);
            this.clearValidatorsForControls(this.profileForm, Object.keys(generalValidators));
        }
    }

    private applyValidators(
        control: FormGroup,
        validatorsMap: { [key: string]: ValidatorFn | ValidatorFn[] },
    ) {
        Object.keys(validatorsMap).forEach((controlName) => {
            this._sharedService.setValidatorsAndValidity(
                control,
                controlName,
                validatorsMap[controlName],
            );
        });
    }

    private clearValidatorsForControls(control: FormGroup, controlNames: string[]) {
        controlNames.forEach((controlName) => {
            this._sharedService.clearValidators(control, controlName);
        });
    }

    // private confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    //     const newPassword = this.profileForm?.get('newPassword')?.value;
    //     const confirmPassword = control.value;

    //     if (newPassword !== confirmPassword) {
    //         return { confirmPasswordMismatch: true };
    //     } else {
    //         return null;
    //     }
    // }

    public submitForm(): void {}
}
