import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneNumberFormat',
})
export class PhoneNumberFormatPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) {
            return '';
        }

        const digits = value.replace(/\D/g, '');

        const part0 = digits.slice(0, 1);
        const part1 = digits.slice(1, 4);
        const part2 = digits.slice(4, 7);
        const part3 = digits.slice(7, 9);
        const part4 = digits.slice(9, 14);

        return `+${part0}  (${part1}) ${part2}-${part3}-${part4}`;
    }
}
