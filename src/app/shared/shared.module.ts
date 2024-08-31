import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { ModalComponent } from './components/modal/modal.component';
import { InputComponent } from './components/input/input.component';
import { IconComponent } from './components/icon/icon.component';
import { FormControlPipe } from './pipes/formControl.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DatepickerRangeComponent } from './components/datepicker-range/datepicker-range.component';
// import { RouterComponent } from './components/routerNavigate/routerNavigate.component';
import { OnClickOutsideDirective } from './directives/onClickOutside.directive';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { FormInputComponent } from './components/formInput/formInput.component';
import { ValidationText } from './components/validationError/validationError.component';
import { SelectComponent } from './components/select/select.component';
import { AlertComponent } from './components/alert/alert.component';
import { TabFilterComponent } from './components/tabFilter/tabFilter.component';
import { MultiSelectComponent } from './components/multiSelect/multiSelect.component';
import { TableComponent } from './components/table/table.component';
import { PhoneNumberFormatPipe } from './pipes/phoneNumber.pipe';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ThemeSwitcherComponent } from './components/themeSwitcher/themeSwitcher.component';
import { ButtonComponent } from './components/button/button.component';
import { TableWrapperComponent } from './components/tableWrapper/tableWrapper.component';
import { HeaderFilterComponent } from './components/headerFilter/headerFilter.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PasswordInputComponent } from './components/passwordInput/passwordInput.component';
import { SharedService } from './services/shared.service';

@NgModule({
    imports: [
        CommonModule,
        NgxMaskDirective,
        NgxMaskPipe,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    declarations: [
        // directives
        OnClickOutsideDirective,

        // pipes
        FormControlPipe,
        PhoneNumberFormatPipe,

        // icons
        IconComponent,

        // components
        ModalComponent,
        InputComponent,
        SidebarComponent,
        DatepickerRangeComponent,
        DatepickerComponent,
        // RouterComponent,
        CheckboxComponent,
        FormInputComponent,
        SelectComponent,
        MultiSelectComponent,
        ValidationText,
        AlertComponent,
        TabFilterComponent,
        TableWrapperComponent,
        TableComponent,
        DropdownComponent,
        HeaderFilterComponent,
        ProfileComponent,
        PasswordInputComponent,
        ThemeSwitcherComponent,
        ButtonComponent,
    ],
    exports: [
        // directives
        OnClickOutsideDirective,

        // pipes
        // FormControlPipe,

        // icons
        IconComponent,

        // components
        ModalComponent,
        InputComponent,
        SidebarComponent,
        DatepickerRangeComponent,
        DatepickerComponent,
        // RouterComponent,
        CheckboxComponent,
        FormInputComponent,
        SelectComponent,
        MultiSelectComponent,
        ValidationText,
        AlertComponent,
        TabFilterComponent,
        TableWrapperComponent,
        TableComponent,
        DropdownComponent,
        HeaderFilterComponent,
        ProfileComponent,
        PasswordInputComponent,
        ThemeSwitcherComponent,
        ButtonComponent,
    ],
    providers: [provideNgxMask(), SharedService],
})
export class SharedModule {}
