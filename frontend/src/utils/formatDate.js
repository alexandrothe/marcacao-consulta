/**
 * convert DD/MM/YYYY to YYYY/MM/DD
 * @param {string} date - date of format DD/MM/YYYY 
 * @returns {string}
 */
export const convertDateToYYYYMMDD = (date) => {
    let [day, month, year] = date.split('/');

    return `${year}-${month}-${day}`;
}

/**
 * convert YYYY/MM/DD to DD/MM/YYYY
 * @param {string} date - date of format YYYY/MM/DD 
 * @returns {string}
 */
export const convertDateToDDMMYYYY = (date) => {
  
    let [year, month, day] = date.split('-');
    
    return `${day}/${month}/${year}`;

}

/**
 * check if the date provided by the user is valid
 * @param {string} date - date of format dd/mm/yy 
 * @returns {boolean}
 */
export const checkDate = (date) => {
    const currentDate = new Date().toISOString().split('T')[0];

    const [currentYear, currentMonth, currentDay] = currentDate.split('-');
    const [ day, month, year ] = date.split('/');

    
    //check if day month or year provided by the use are empty
    if(!day || !month || !year){
        return false;
    }
    // check if the year provide by the user is greater than the currentYear
    else if(year > currentYear){
        return false;
    }
    // check if the year provided by the user is less then currentYear
    // and if the month is greater than current month
    else if (year <= currentYear && month > currentMonth){
        return false;
    }
    // check if the year and month provided by the user are less then current Year and Month
    // and if the day is greater than current day   
    else if ( year <= currentYear && month <= currentMonth && day > currentDay){
        return false;
    }
    // if got here, means the birthday is Ok.
    else {
        return true;
    }
}
