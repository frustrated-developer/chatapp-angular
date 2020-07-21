import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'dateFormat'
})

export class DateFormatPipe implements PipeTransform {

    transform(value: any, args: any): string {
        let date = '';
        if (value) {
            date = this.makeDateFormat(value, args);
        } else {
            date = '';
        }

        return date;
    }

    makeDateFormat(value, format) {
        if (value) {
            return moment(value).format(format);
        } else {
            return '09 December 2019 - 12:40 PM';
        }
    }

}
