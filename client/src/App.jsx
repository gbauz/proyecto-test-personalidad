// src/App.jsx
import { useEffect, useState } from 'react';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/message')
            .then((response) => response.json())
            .then((data) => setMessage(data.message))
            .catch((error) => console.error('Error fetching message:', error));
    }, []);

    return (
        <div>
            <h1>Aplicación Monolítica en React y Express</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;
