export interface IGetCurrentDate {
	year: number
	month: number
	day: number
	hour: number
	minute: number
	second: number
}

export default function getCurrentDate(): IGetCurrentDate {
	var currentdate = new Date();
	return {
		year: currentdate.getFullYear(),
		month: currentdate.getMonth(),
		day: currentdate.getDate(),

		hour: currentdate.getHours(),
		minute: currentdate.getMinutes(),
		second: currentdate.getSeconds(),
	}
}