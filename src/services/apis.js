const BASE_URL = process.env.REACT_APP_BASE_URL

export const authAPIs = {
    SIGNUP_API: BASE_URL + "/api/v1/auth/signup",
    LOGIN_API: BASE_URL + "/api/v1/auth/login",
    SEND_OTP: BASE_URL + "/api/v1/auth/send-otp",
    UPDATE_PROFILE: BASE_URL + "/api/v1/profile/update",
};
export const subscribeAPIs = {
    SUBSCRIBE_API : BASE_URL + "/api/v1/subscribe",
};
export const submitRatingAPIs = {
    SUBMITRATING_API : BASE_URL + "/api/v1/rating/create",
};
export const issueAPIs = {
    ISSUE_API : BASE_URL + "/api/v1/issue/create",
    ALL_ISSUES_API : BASE_URL + '/api/v1/issue/all',
    MY_ISSUES_API : BASE_URL + '/api/v1/issue/my',
    PENDING_ISSUES_API : BASE_URL + '/api/v1/issue/pending',
    RESOLVED_ISSUES_API : BASE_URL + '/api/v1/issue/resolved',
    UPDATESTATUS_API : BASE_URL + '/api/v1/issue/update-status',
};
export const resetPasswordAPIs = {
    RESETPASSWORD_API : BASE_URL + "/api/v1/auth/change-password",
};
export const createAdminAPIs = {
    CREATEADMIN_API : BASE_URL + "/api/v1/admin/create-admin",
}
export const createOfficerAPIs = {
    CREATEOFFICER_API : BASE_URL + "/api/v1/admin/create-officer",
}
export const getAllAdminAPIs = {
    GETALLADMIN_API : BASE_URL + "/api/v1/admin/get-all-admins",
}
export const getAllRatingAPIs = {
    GETALLRATING_API : BASE_URL + '/api/v1/rating/all',
    GETTOPTHREERATING_API : BASE_URL + '/api/v1/rating/top-3'
}
export const getAllOfficerAPIs = {
    GETALLOFFICER_API : BASE_URL + '/api/v1/admin/get-all-officers',
}