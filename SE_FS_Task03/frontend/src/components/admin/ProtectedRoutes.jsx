import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ProtectedRoutes = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth)

    useEffect(() => {
        if (!user || user.role !== 'recruiter')
            navigate('/');
    }, []);

    return <>{children}</>
}

export default ProtectedRoutes