import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const UserInfo = ({ onUserFetch }) => {
    const location = useLocation();
    const username = new URLSearchParams(location.search).get('username');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8080/auth/userinfo?username=${username}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const userData = await response.json();
                    onUserFetch(userData); 
                } else {
                    console.error('Error fetching user info');
                }
            } catch (error) {
                console.error('Error fetching user info');
            }
        };

        if (username) {
            fetchUser();
        }
    }, [username, onUserFetch]);

    return null; 
};

export default UserInfo;
