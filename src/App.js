import React, { useState } from 'react';

function App() {
    const [experiments, setExperiments] = useState([]);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('План');

    const addExperiment = () => {
        if (name === '') return;
        const newExp = {
            id: Date.now(),
            name: name,
            status: status
        };
        setExperiments([...experiments, newExp]);
        setName('');
        setStatus('План');
    };

    return (
        <div>
            <h1>Учёт экспериментов</h1>
        </div>
    );
}

export default App;