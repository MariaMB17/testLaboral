import {
  JsonConverter,
  JsonCustomConvert,
} from 'json2typescript';
import * as moment from 'moment';

@JsonConverter
export class DateConverter implements JsonCustomConvert<Date> {
  serialize(convertDate: Date): any {
    if (convertDate !== null) {
      const finalDate = moment(convertDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
      return finalDate;
    }
  }
  deserialize(convertDate: any): Date {
    if (convertDate !== null) {
      return moment(convertDate, 'YYYY-MM-DD HH:mm').toDate();
    } else {
      return convertDate;
    }
  }
}