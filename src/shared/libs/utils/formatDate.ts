import dayjs, { Dayjs } from "dayjs";

export function formatDate(date: number): string {
	const argDate = dayjs(date)
	//current datetime
	const now = dayjs()
	//default format. It will narrates as function works

	//if year of date isnt current, then return full date by default format
	if (!argDate.isSame(now, 'year')) return argDate.format('YYYY MMM D')

	//if month and week isnt same, then return date as MMMM D HH:MM
	if (!argDate.isSame(now, 'month') && !argDate.isSame(now, 'week')) return argDate.format('MMM D')

	//if date is same week but not same day, then return date as DDDD HH:MM
	if (!argDate.isSame(now, 'date')) return argDate.format('dddd hh:mm')

	//here date is today
	return argDate.format('HH:MM')
}