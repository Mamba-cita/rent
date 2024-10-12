import React, { useContext, useEffect } from 'react';
import { AuthContext } from "../context/authContext";
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]); 

    return (
        <>
            <div>Home Page</div>
            {user ? (
                <>  
                    <h1>Welcome {user.username}</h1>
                </>
            ) : (
                <p>Redirecting to login...</p> 
            )}
        </>
    );
}
