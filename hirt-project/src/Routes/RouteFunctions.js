export const goToHomePage = (navigate) => {
    navigate(`/`)
};

export const goToAdminPage = (navigate, type) => {
    navigate(`/user/${type}`)
};

export const goToCollabPage = (navigate, type, id) => {
    navigate(`/userC/${type}/${id}`)
};

export const goToClientPage = (navigate, type) => {
    navigate(`/user/${type}`)
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

export const goToInfoPage = (navigate, type, id, obra_id) => {
    navigate(`/info_ap/${type}/${id}/${obra_id}
    `)
};

export const goToInfoAdmPage = (navigate, type, obra_id) => {
    navigate(`/apADM/${type}/${obra_id}
    `)
};

export const goToDeletePage = (navigate, id) => {
    navigate(`/obra/delete/${id}`)
};

export const goToDeleteApPage = (navigate, id) => {
    navigate(`/apartamento/delete/${id}`)
};

export const goToSignUpPage = (navigate, type) => {
    navigate(`/sign_up/${type}`)
};

export const goToEditPage = (navigate, id) => {
    navigate(`/edit/${id}`)
};









