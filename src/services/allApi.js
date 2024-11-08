import commonapi from "./commonapi"
import SERVER_URL from "./serverurl"

// requster called by auth when user clicks on registerr button
export const registerAPI =async(reqBody)=>{
    return await commonapi("POST",`${SERVER_URL}/register`,reqBody)
}
// loginAPI called by Auth when user click on login button
export const loginAPI = async (reqBody)=>{
    return await commonapi("POST",`${SERVER_URL}/login`,reqBody)
}
// add project api
export const addProjectAPI = async (reqBody,reqHeader)=>{
    return await commonapi("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}
// get project api callded by home component when page loadded in browser
export const getHomeProjectAPI = async ()=>{
    return await commonapi("GET",`${SERVER_URL}/home-project`,{})
}
// get all project api callded by project component when page loadded in browser
export const allProjectAPI = async (searchKey,reqHeader)=>{
    return await commonapi("GET",`${SERVER_URL}/all-project?search=${searchKey}`,{},reqHeader)
}
// get user project api callded by view components to get projects of a user
export const userProjectAPI = async (reqHeader)=>{
    return await commonapi("GET",`${SERVER_URL}/user-project`,{},reqHeader)
}
// udate project api
export const updateProjectAPI = async (id,reqBody,reqHeader)=>{
    return await commonapi("PUT",`${SERVER_URL}/projects/${id}/edit`,reqBody,reqHeader)
}
// user project remove api
export const userProjectRemoveAPI = async (id,reqHeader)=>{
    return await commonapi("DELETE",`${SERVER_URL}/projects/${id}/remove`,{},reqHeader)
}
// update user profile api
export const updateUserAPI = async (reqBody,reqHeader)=>{
    return await commonapi("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}

