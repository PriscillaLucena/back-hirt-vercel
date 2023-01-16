export const goToAdminPage = (navigate) => {
    navigate(`/admin`)
};

export const goToCollabPage = (navigate) => {
    navigate(`/collaborator`)
};

export const goToLoginPage = (navigate, type) => {
    navigate(`/login/${type}`)
};

export const goToConcludedAp = (navigate, id) => {
    navigate(`/apartment/${id}`)
};

export const goToNewBuild = (navigate) => {
    navigate(`/new_build`)
};



