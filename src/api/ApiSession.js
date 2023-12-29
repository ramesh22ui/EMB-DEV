import Axios from "axios";
import API_CONFIG  from "./API_CONFIG";
import _ from "loadsh";

export default class ApiSession {
    constructor(){
        Axios.defaults.baseURL = API_CONFIG.baseUrl;
        // Axios.defaults.headers.common["token"] = localStorage.getItem("")
    }
    logout = ()=>{
        Axios.defaults.responseType = "json";
        return this.apiDelete(API_CONFIG.endpoints.logoutAPI)
    }
    getUsers = ()=>{
        Axios.defaults.responseType = "json";
        return this.apiGet(API_CONFIG.endpoints.getUsersAPI,{},{});
    }
    addUser = (data)=>{
        Axios.defaults.responseType = "json";
        return this.apiPost(API_CONFIG.endpoints.addUserAPI, {}, data);
    }
    deleteUser = userId =>{
        Axios.defaults.responseType = "json";
        return this.apiDelete(API_CONFIG.endpoints.deleteUserAPI, {}, {userId})
    }
    updateUser = userId =>{
        Axios.defaults.responseType = "json";
        return this.apiPut(API_CONFIG.endpoints.updateUserAPI, {}, {userId})
    }
    apiGet = (uriTemplate, uriParameters, params)=>{
        const url = this.parameterizedUri(uriTemplate, uriParameters);
        return this.apiAny({method:"get", url, params})
    }
    apiPost = (uriTemplate, uriParameters, data)=>{
        const url = this.parameterizedUri(uriTemplate, uriParameters);
        return this.apiAny({method:"get", url, data})
    }
    apiPut = (uriTemplate, uriParameters, data)=>{
        const url = this.parameterizedUri(uriTemplate, uriParameters);
        return this.apiAny({method:"get", url, data})
    }
    apiDelete = (uriTemplate, uriParameters, params)=>{
        const url = this.parameterizedUri(uriTemplate, uriParameters);
        return this.apiAny({method:"get", url, params})
    }

    apiAny = ({method, url, params, data})=>{
        let result = Promise.resolve(url);
        result.cancel = _.noop;
        if(_.isString(url)){
            const cancelSource = Axios.CancelToken.source();
            const cancelToken = cancelSource.token;
            result = Axios.request({method, url, params, data, cancelToken}).then(
                _.property("data")
            );
            result.cancel = cancelSource.cancel;
        }
        result.then(response=>{
            //do nothing
        }).catch(error=>{
            if(error.response !== undefined){
                if(error.response.data !== undefined){
                    if(error.response.data !== null){
                        if(error.response.data.httpCodeMessage === "Forbidden" && error.response.data.message === "Unautorized" ){
                            window.location.replace("/")
                        }
                    }
                }
            }
        });
        return result;
    }

    parameterizedUri = (uriTemplate, parameters)=>{
        return _.reduce(
            parameters,
            (uri, value, key)=>{
                return _.replace(uri, new RegExp(`${key}`), value)
            },
            uriTemplate
        )
    }
}