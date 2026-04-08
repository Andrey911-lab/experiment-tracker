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

    const statuses = ['План', 'В процессе', 'Завершён'];

    return (
        <div>
            <h1>Учёт экспериментов</h1>

            <div>
                <input
                    type="text"
                    placeholder="Название эксперимента"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    {statuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                <button onClick={addExperiment}>Добавить</button>
            </div>
        </div>
    );
}

export default App;