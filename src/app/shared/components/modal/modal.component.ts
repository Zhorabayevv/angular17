import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, defer } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { IDynamicElements } from '../../interfaces/modal.interface';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'ui-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
    @Output('isOpenChange') isOpenChangeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    public modal$: Observable<any>;
    public elements$: Observable<IDynamicElements[]>;
    public isOpen$: Observable<boolean>;
    public form$: Observable<FormGroup>;

    public secondaryBtn: string = 'Отменить';

    constructor(private _modal: ModalService) {}

    ngOnInit(): void {
        this.initializeValues();
    }

    private initializeValues(): void {
        this.modal$ = defer(() => this._modal.modalData$);
        this.elements$ = defer(() => this._modal.elements$);
        this.isOpen$ = defer(() => this._modal.isOpen$);
        this.form$ = defer(() => this._modal.form$);
    }

    public closeModal(): void {
        this._modal.close();
    }

    public styleObject(img: string): Record<string, string> {
        return {
            '-webkit-mask-image': `url(assets/icons/${img}.svg)`,
            'mask-image': `url(assets/icons/${img}.svg)`,
        };
    }

    public performAction() {
        this._modal.performAction();
    }
}
