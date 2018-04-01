import moment from 'moment-jalaali';

moment.loadPersian({ usePersianDigits: true, dialect: 'persian-modern' });

const persianDate = date => moment(date).fromNow();

export default persianDate;
