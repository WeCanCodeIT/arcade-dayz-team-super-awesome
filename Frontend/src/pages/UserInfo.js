import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const UserInfo = () => {
    const [user, setUser] = useState(null);
    const [searchParams] = useSearchParams();
    const username = searchParams.get('username');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8080/auth/userinfo?username=${username}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    alert('Error fetching user info');
                }
            } catch (error) {
                alert('Error fetching user info');
            }
        };

        if (username) {
            fetchUser();
        }
    }, [username]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Info</h2>
            <p>Full Name: {user.fullName}</p>
            <p>Username: {user.username}</p>
        </div>
    );
};

export default UserInfo;
