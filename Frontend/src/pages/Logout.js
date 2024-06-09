import React from 'react';

const Logout = () => {
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                alert('Logout successful');
            } else {
                alert('Error logging out');
            }
        } catch (error) {
            alert('Error logging out');
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
