const { parse, format, asYouType } = require('libphonenumber-js');
const _ = require('lodash');
const users = require('./users.json');

const activeUsers = users.filter(u => !u.is_deleted && !u.is_bot && u.tz)

const timezoneLabels = activeUsers.reduce((acc, user) => {
    const tzOffset = user.tz_offset;
    if(!_.has(acc, tzOffset) && user.tz) {
        acc[tzOffset] = {
            label: user.tz_label,
            name: user.tz
        }
    }

    return acc;

}, {})

const timezones = _.orderBy(_.toPairs(_.countBy(activeUsers, 'tz_offset')).map(user => ({offset: user[0], count: user[1]})), 'count', 'desc')

console.log(timezones.map(timezone => {
    return {
        label: timezoneLabels[timezone.offset].label,
        name: timezoneLabels[timezone.offset].name,
        count: timezone.count
    }
}))

