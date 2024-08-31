import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

import {
    IConfirmModal,
    IDynamicElements,
    IFormModal,
    IModal,
} from '../interfaces/modal.interface';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import { SelectComponent } from '../components/select/select.component';
import { FormInputComponent } from '../components/formInput/formInput.component';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private modalData$$: Subject<IConfirmModal | IModal> = new BehaviorSubject<
        IConfirmModal | IModal
    >(this.setDefaultData());
    private elements$$: Subject<IDynamicElements[]> = new BehaviorSubject<IDynamicElements[]>([]);
    private isOpen$$: Subject<boolean> = new BehaviorSubject<boolean>(false);
    private denyModal$$: Subject<boolean> = new BehaviorSubject<boolean>(false);
    private form$$: Subject<FormGroup> = new BehaviorSubject<FormGroup>(new FormGroup({}));

    public modalForm: FormGroup = new FormGroup({});

    constructor() {}

    public get modalData$(): Observable<IConfirmModal | IModal> {
        return this.modalData$$.asObservable();
    }

    public get elements$(): Observable<IDynamicElements[]> {
        return this.elements$$.asObservable();
    }

    public get isOpen$(): Observable<boolean> {
        return this.isOpen$$.asObservable();
    }

    public get denyModal$(): Observable<boolean> {
        return this.denyModal$$.asObservable();
    }

    public get form$(): Observable<FormGroup> {
        return this.form$$.asObservable();
    }

    public createDynamicElements(form: IFormModal[]): IDynamicElements[] {
        let elements: IDynamicElements[] = [];

        this.form$.pipe(map((item) => console.log(item)));

        form.forEach((item) => {
            switch (item.type) {
                case 'checkbox':
                    elements.push({
                        component: CheckboxComponent,
                        properties: item.properties,
                    });
                    break;
                case 'input':
                    elements.push({
                        component: FormInputComponent,
                        properties: item.properties,
                    });

                    break;
                case 'select':
                    elements.push({
                        component: SelectComponent,
                        properties: item.properties,
                    });
                    break;
                case 'radio':
                    break;
            }
        });

        return elements;
    }

    public create(value: IModal, form: FormGroup): void {
        this.form$$.next(form);
        this.isOpen$$.next(true);
        this.modalData$$.next(value);
        this.elements$$.next(this.createDynamicElements(value.form));
        this.denyModal$$.next(false);
    }

    public createConfirm(value: IConfirmModal) {
        this.isOpen$$.next(true);
        this.denyModal$$.next(false);
        this.modalData$$.next(value);
    }

    public setDefaultData(): IModal {
        return {
            title: '',
            closeIcon: true,
            button: {
                name: '',
                type: '',
            },
            form: [
                {
                    type: 'radio',
                    properties: {},
                },
            ],
        };
    }

    public performAction(): void {
        this.denyModal$$.next(true);
        this.isOpen$$.next(false);
    }

    public close(): void {
        this.isOpen$$.next(false);
        this.denyModal$$.next(false);
    }
}
