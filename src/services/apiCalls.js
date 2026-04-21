import { apiConnector } from "./apiConnector";
import { authAPIs, createAdminAPIs, createOfficerAPIs, getAllAdminAPIs, getAllRatingAPIs, submitRatingAPIs, getAllOfficerAPIs } from "./apis";
import { subscribeAPIs } from "./apis";
import { issueAPIs } from "./apis";
import { resetPasswordAPIs } from "./apis";


export const signupAPI = (FormData) => {
    return apiConnector("POST",authAPIs.SIGNUP_API,FormData);
}


export const loginAPI = (FormData) => {
    return apiConnector("POST",authAPIs.LOGIN_API,FormData);
}


export const sendOtpAPI = (data) => {
    return apiConnector("POST", authAPIs.SEND_OTP,data);
};


export const updateAPI = (FormData) => {
    const token = localStorage.getItem("token");
    return apiConnector("PUT", authAPIs.UPDATE_PROFILE,FormData,{
        Authorization: `Bearer ${token}`,
    })
}



export const subscribeAPI = (email) => {
    return apiConnector("POST", subscribeAPIs.SUBSCRIBE_API,{
        email
    });
};
export const ratingAPI = (formData) => {
    const token = localStorage.getItem("token");
    return apiConnector("POST", submitRatingAPIs.SUBMITRATING_API,formData,{
        Authorization: `Bearer ${token}`
    });
};
export const issueAPI = (formData,token) => {
    return apiConnector("POST",issueAPIs.ISSUE_API,formData,{
        Authorization: `Bearer ${token}`,
    });
}



export const resetPasswordAPI = (formData) => {
    const token = localStorage.getItem("token");
    return apiConnector("POST",resetPasswordAPIs.RESETPASSWORD_API,formData,{
        Authorization: `Bearer ${token}`,
    });
};




export const getAllIssuesAPI = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token missing");
    }
    return apiConnector("GET",issueAPIs.ALL_ISSUES_API,null,{
        Authorization: `Bearer ${token}`,
    })
}




export const getMyIssuesAPI = () => {
    const token = localStorage.getItem("token");
    return apiConnector("GET",issueAPIs.MY_ISSUES_API,null,{
        Authorization: `Bearer ${token}`,
    })
}




export const getPendingIssuesAPI = () => {
    const token = localStorage.getItem("token");
    return apiConnector("GET",issueAPIs.PENDING_ISSUES_API,null,{
        Authorization: `Bearer ${token}`,
    })
}




export const getResolvedIssuesAPI = () => {
    const token = localStorage.getItem("token");
    return apiConnector("GET",issueAPIs.RESOLVED_ISSUES_API,null,{
        Authorization: `Bearer ${token}`,
    })
}




export const createAdminAPI = (formData) => {
    const token = localStorage.getItem("token");
    return apiConnector("POST",createAdminAPIs.CREATEADMIN_API,formData,{
        Authorization: `Bearer ${token}`,
    })
}



export const createOfficerAPI = (formData) => {
    const token = localStorage.getItem("token");
    return apiConnector("POST",createOfficerAPIs.CREATEOFFICER_API,formData,{
        Authorization: `Bearer ${token}`,
    })
}
export const getAllAdminAPI = () => {
    const token = localStorage.getItem("token");
    return apiConnector("GET",getAllAdminAPIs.GETALLADMIN_API,null,{
        Authorization: `Bearer ${token}`,
    })
}




export const getAllRatingAPI = () => {
    const token = localStorage.getItem("token");
    return apiConnector("GET",getAllRatingAPIs.GETALLRATING_API,null,{
        Authorization: `Bearer ${token}`,
    })
}




export const getTopThreeAPI = () => {
    const token = localStorage.getItem("token");
    return apiConnector("GET",getAllRatingAPIs.GETTOPTHREERATING_API,null, {
        Authorization: `Bearer ${token}`,
    })
}



export const getAllOfficerAPI = () => {
    const token = localStorage.getItem("token");
    return apiConnector("GET",getAllOfficerAPIs.GETALLOFFICER_API,null,{
        Authorization: `Bearer ${token}`,
    })
}




export const updateStatusAPI = (data) => {
    const token = localStorage.getItem("token");
    return apiConnector("POST",issueAPIs.UPDATESTATUS_API,data,{
        Authorization: `Bearer ${token}`,
    })
}