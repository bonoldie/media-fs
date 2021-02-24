import axios from "axios";

/**
 * Axios interceptor setup
 * inject access-token 
 */
axios.interceptors.request.use(function(config){
    config.headers['access-token'] = 'ad409947-cd3d-3a28-905d-d8b73936b72d'
    return config
})

axios.interceptors.response.use(function(response){
    if(response.status >= 400){
        console.groupCollapsed(`%c [${response.config.method.toUpperCase()}] ${response.config.url}`,'background: red; color: black')
            console.log(response);
        console.groupEnd();
    }else{
        console.groupCollapsed(`%c [${response.config.method.toUpperCase()}] ${response.config.url}`,'background: #222; color: #bada55')
            console.log(response);
        console.groupEnd();
    }

    return response
})