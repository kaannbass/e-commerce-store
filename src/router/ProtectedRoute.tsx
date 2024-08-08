import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

const ProtectedRoute: React.FC<{ role: 'admin' | 'customer'; element: JSX.Element }> = ({
    role,
    element,
}) => {
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (user?.role === role) {
        return element;
    }

    return <Navigate to="/" />;
};

export default ProtectedRoute;