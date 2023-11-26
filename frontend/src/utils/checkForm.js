export function checkForm(dataToCheck, setFormError){

    let isOk = true;

    for( let [key, value] of Object.entries(dataToCheck)){

        if(value === ""){
            setFormError( prev => ({
                target: key,
                message: "This field can not be empty"
            }));
            
            isOk = false;
            break;
        }


    }

    if(isOk){
        setFormError({
            target: "",
            message: "",
        });
        return true;
    }
    else{
        return false;
    }
}

export function noEmptyKeyValues(object){

    const formatedObject = {};

    for (let [key, value] of Object.entries(object)){

        if(value !== ""){
            formatedObject[key] = value;
        }
    }
    
    return formatedObject;

}

