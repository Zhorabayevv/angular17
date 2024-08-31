import { Component, Input, OnInit, Output } from '@angular/core';
import { provideNgxMask } from 'ngx-mask';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
    selector: 'ui-datepicker-range',
    templateUrl: './datepicker-range.component.html',
    styleUrl: './datepicker-range.component.scss',
    providers: [provideNgxMask()],
})
export class DatepickerRangeComponent implements OnInit {
    @Input('label') labelProps: string = '';

    @Output('firstDate') firstDate: Date | undefined;
    @Output('lastDate') lastDate: Date | undefined;

    private days$$: Subject<Date[]> = new BehaviorSubject<Date[]>([]);
    private emptySpace$$: Subject<number[]> = new BehaviorSubject<number[]>([]);
    public switchTemplate: Record<string, boolean> = {
        showPicker: false,
        chooseTemplate: false,
        chooseCurrentYear: false,
        chooseCurrentMonth: false,
    };
    public months: string[] = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ];
    public years: number[] = [];
    public weekdays: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    public currentMonth: number = new Date().getMonth();
    public currentYear: number = new Date().getFullYear();
    public today: Date = new Date(new Date().setHours(0, 0, 0, 0));
    private datePattern: RegExp = new RegExp(
        '^([0-3]{1}[0-9]{1}\\.[0-1]{1}[0-9]{1}\\.[2]{1}[0-9]{3})$',
    );

    ngOnInit(): void {
        this.setDays({ month: this.currentMonth, year: this.currentYear });
        this.years = this.makeRangeArray(this.currentYear - 6, this.currentYear + 5);
    }

    public get days$(): Observable<Date[]> {
        return this.days$$.asObservable();
    }

    public get emptySpace$(): Observable<number[]> {
        return this.emptySpace$$.asObservable();
    }

    public setDays(value: { month: number; year: number }): void {
        const days = this.getDaysOfMonth(value.month, value.year);
        this.days$$.next(days);
        this.emptySpace$$.next(this.makeWeekdaysArray(days[0].getDay()));
    }

    public showCalendar(): void {
        event?.stopPropagation();

        this.switchTemplate.showPicker = this.switchTemplate.showPicker ? false : true;
    }

    public hideCalendar(): void {
        this.switchTemplate.showPicker = false;
    }

    public choosePeriod(): void {
        this.switchTemplate.chooseTemplate = !this.switchTemplate.chooseTemplate;
        this.switchTemplate.chooseCurrentYear = true;
        this.switchTemplate.chooseCurrentMonth = false;
    }

    public setCurrentYear(year: number): void {
        event?.stopPropagation();

        this.currentYear = year;

        this.switchTemplate.chooseCurrentYear = false;
        this.switchTemplate.chooseCurrentMonth = true;
    }

    public setCurrentMonth(month: any): void {
        event?.stopPropagation();

        this.currentMonth = month;

        this.setDays({ month: this.currentMonth, year: this.currentYear });

        this.switchTemplate.chooseTemplate = false;
        this.switchTemplate.chooseCurrentMonth = false;
    }

    private getDaysOfMonth(month: number, year: number): Date[] {
        if (month === 12) {
            month = 0;
            year = ++year;
        }

        if (month === -1) {
            month = 11;
            year = --year;
        }

        const date = new Date(year, month, 1);
        const days = [];

        this.currentMonth = month;
        this.currentYear = year;

        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return days;
    }

    public selectDate(date: Date): void {
        if (!this.firstDate || date < this.firstDate || (this.firstDate && this.lastDate)) {
            this.firstDate = date;
            this.lastDate = undefined;

            return;
        }

        this.setCurrentMonth(this.firstDate.getMonth());

        this.lastDate = date;
        this.switchTemplate.showPicker = !this.switchTemplate.showPicker;
    }

    public changeDate(date: string, str: any): void {
        if (str === '' || !this.datePattern.test(str)) {
            this.clearInput(date);
            return;
        }

        if (str.length !== 10) {
            return;
        }

        const dateArray: string[] = str.split('.');
        const day = +dateArray[0];
        const month = +dateArray[1] - 1;
        const year = +dateArray[2];

        const newDate = new Date(year, month, day);

        if (date === 'first') {
            this.firstDate = newDate;
            this.setCurrentMonth(month);

            return;
        }

        this.lastDate = newDate >= this.firstDate! ? newDate : undefined;
    }

    private clearInput(date: string): void {
        if (date === 'first') {
            this.firstDate = undefined;

            return;
        }

        this.lastDate = undefined;
    }

    private makeWeekdaysArray(count: number): number[] {
        const arr = [6, 0, 1, 2, 3, 4, 5];

        return Array(arr[count]).fill(0);
    }

    private makeRangeArray(min: number, max: number): number[] {
        const rangeArr = [];

        for (min; min <= max; min++) {
            rangeArr.push(min);
        }

        return rangeArr;
    }

    public compareDates(date: Date | undefined, compare: Date): boolean {
        const first = date?.getDate() + '.' + date?.getMonth() + '.' + date?.getFullYear();
        const second =
            compare?.getDate() + '.' + compare?.getMonth() + '.' + compare?.getFullYear();

        return first === second;
    }
}
