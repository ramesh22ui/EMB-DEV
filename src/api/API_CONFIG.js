
const API_CONFIG ={
    baseUrl:process.env.REACT_APP_BACKEND_API_URL,
    endpoints:{
        loginAPI:"auth/login",
        logoutAPI:"auth/logout",
        getUsersAPI:"auth/getUsers",
        addUserAPI:"auth/addUser",
        deleteUserAPI:"auth/deleteUser",
        updateUserAPI:"auth/updateUser"
    }
}


export default API_CONFIG;