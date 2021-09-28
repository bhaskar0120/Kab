export function monthNumber(){
	const d = new Date();
    let docName = (d.getYear()-121)*12+d.getMonth();
    return `${docName}`;
}
export function nextMonth(){
    const d= new Date();
    let docName = (d.getYear()-121)*12+d.getMonth()+1;
    return `${docName}`;
}