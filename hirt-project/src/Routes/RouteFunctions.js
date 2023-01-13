export const goToAdminPage = (navigate) => {
    navigate(`/admin`)
};

export const goToCollabPage = (navigate) => {
    navigate(`/collaborator`)
};

export const goToLoginPage = (navigate, type) => {
    navigate(`/login/${type}`)
}
