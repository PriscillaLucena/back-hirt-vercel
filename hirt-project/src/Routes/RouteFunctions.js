export const goToAdminPage = (navigate) => {
    navigate(`/admin`)
};

export const goToCollabPage = (navigate) => {
    navigate(`/collaborator`)
};

export const goToLoginPage = (navigate, type) => {
    navigate(`/login/${type}`)
};

export const goToConcludedAp = (navigate, build_id) => {
    navigate(`/apartment/${build_id}`)
};

export const goToNewBuild = (navigate) => {
    navigate(`/new_build`)
};

export const goToInfoApPage = (navigate, id) => {
    navigate(`/info_ap/${id}`)
};

// export const goToInfoBuildPage = (navigate, id) => {
//     navigate(`/info_build/${id}`)
// };





