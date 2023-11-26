export const setCookie = (key, name) => {

    let maxAge7Days = 60 * 60 * 24 * 7;

    document.cookie = `${key}=${name}; max-age=${maxAge7Days}; sameSite; path=/`;
}

export const getCookie = (key) => {
    let cookieArray = document.cookie.split('; ');
    let result = "";

    cookieArray.forEach( (cookie, index) => {
        let [ cookieKey, cookieValue ] = cookie.split('=');

        if(key === cookieKey){
            result =  cookieValue;
        }
    });

    return result;
}

export const deleteCookie = (key) => {
    document.cookie = `${key}=; max-age=0`;
}


