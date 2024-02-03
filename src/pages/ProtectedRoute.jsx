import { useAppContext } from '../context/appContext';
import { Navigate } from 'react-router-dom';


function ProtectedRoute({ children, flip, routeTo }) {
    const { user } = useAppContext();
    
    if (flip) {
        if (!user) {
            return children;
        }
        return <Navigate to={routeTo}/>
    }
    console.log(1);
    if (!user) {
        console.log(2);
        return <Navigate to={routeTo}/>
    }
    return children;
}

export default ProtectedRoute;