import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from'react';


function App() {
  const [greeting, setGreeting] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5002/api/hello')
            .then(response => {
                setGreeting(response.data.msg);
                console.log('Message fetched successfully:', response.data.msg);
            })
            .catch(error => {
                console.error('Error fetching the message:', error);
            });
    }, []);

    return (
        <div>
            <h1>{greeting}</h1>
        </div>
    );
}

export default App;
