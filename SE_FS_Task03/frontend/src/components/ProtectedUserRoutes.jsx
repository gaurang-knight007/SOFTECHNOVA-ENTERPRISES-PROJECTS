import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ProtectedUserRoutes = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth)

    useEffect(() => {
        if (user && user.role !== 'student')
            navigate('/admin/companies');
    }, []);

    return <>{children}</>
}

export default ProtectedUserRoutes