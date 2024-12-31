export function getDatesBetween(
    startDate: Array<number>, endDate:Array<number>, skip: number) {
    let delta = skip || 1
    var sdate = new Date(startDate[0], startDate[1], startDate[2])
    var edate = new Date(endDate[0], endDate[1], endDate[2])
    const currentDate = new Date(sdate.getTime())
    const dates = [];
    while (currentDate <= edate) {
        dates.push(new Date(currentDate));
        //dates.push(new Date(currentDate).toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + delta);
    }
    return dates;
}
