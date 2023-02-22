export const goToHomePage = (navigate) => {
    navigate(`/`)
};

export const goToAdminPage = (navigate, type) => {
    navigate(`/user/${type}`)
};

export const goToCollabPage = (navigate, type) => {
    navigate(`/user/${type}`)
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

export const goToInfoPage = (navigate, type, id) => {
    navigate(`/info_ap/${type}/${id}/
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









