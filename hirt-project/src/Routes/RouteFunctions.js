export const goToAdminPage = (navigate) => {
    navigate(`/admin`)
};

export const goToCollabPage = (navigate) => {
    navigate(`/collaborator`)
};

export const goToLoginPage = (navigate, type) => {
    navigate(`/login/${type}`)
};

export const goToConcludedAp = (navigate, obra_id) => {
    navigate(`/apartment/${obra_id}`)
};

export const goToNewBuild = (navigate) => {
    navigate(`/new_build`)
};

export const goToInfoApPage = (navigate, id) => {
    navigate(`/info_ap/${id}`)
};

export const goToDeletePage = (navigate, id) => {
    navigate(`/obra/delete/${id}`)
};

export const goToDeleteApPage = (navigate, id) => {
    navigate(`/apartamento/delete/${id}`)
};

export const goToInfoAdmPage = (navigate, id) => {
    navigate(`/info_ap/adm/${id}`)
};

export const goToSignUpPage = (navigate, type) => {
    navigate(`/sign_up/${type}`)
};

export const goToEditPage = (navigate, id) => {
    navigate(`/edit/${id}`)
};









