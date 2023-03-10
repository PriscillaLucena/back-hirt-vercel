import { useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { goToAdminPage, goToCollabPage } from '../Routes/RouteFunctions';


const useUnprotectedPage = (type) => {
  const navigate = useNavigate()
  useLayoutEffect(() => {
    const token = localStorage.getItem('token')
    if (token && type === 'admin'){
      goToAdminPage(navigate, type)
    }else if(token && type === 'collab'){
        const id = localStorage.getItem('id')
      goToCollabPage (navigate, type, id) 
    }
  }, [navigate])
};

export default useUnprotectedPage;