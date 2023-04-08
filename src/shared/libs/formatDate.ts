import dayjs, { Dayjs } from "dayjs";

export function formatDate(date?: number | Dayjs): string {
	if(!date) return '';
	if (!dayjs.isDayjs(date)) date = dayjs.unix(date)
	//current datetime
	const now = dayjs()
	//default format. It will narrates as function works

	//if year of date isnt current, then return full date by default format
	if (!date.isSame(now, 'year')) return date.format('YYYY MMM D')

	//if month and week isnt same, then return date as MMMM D HH:MM
	if (!date.isSame(now, 'month') && !date.isSame(now, 'week')) return date.format('MMM D')

	//if date is same week but not same day, then return date as DDDD HH:MM
	if (!date.isSame(now, 'date')) return date.format('dddd')

	//here date is today
	return 'Today at ' + date.format('HH:MM')
}