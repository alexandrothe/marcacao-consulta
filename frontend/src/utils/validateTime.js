/**
 * check if the Time provided by the user is valid
 * @param {string} time - only hour and minute HH-MM
 * @returns { boolean }  
 */
export const validateTime = (time) => {
    const [ hour, min] = time.split(':');

    if( !hour || !min ){
        return false;
    }
    else if( hour < 0 || hour > 23){
        return false;
    }
    else if ( min < 0 || min > 59){
        return false;
    }
    else{
        return true;
    }
}
