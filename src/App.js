import React, { useState } from 'react';

function App() {
    const [experiments, setExperiments] = useState([]);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('План');
    const [filter, setFilter] = useState('Все');

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

    const deleteExperiment = (id) => {
        const newList = experiments.filter(exp => exp.id !== id);
        setExperiments(newList);
    };

    const statuses = ['План', 'В процессе', 'Завершён'];

    const filteredExperiments = filter === 'Все'
        ? experiments
        : experiments.filter(exp => exp.status === filter);

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

            <div>
                <button onClick={() => setFilter('Все')}>Все</button>
                <button onClick={() => setFilter('План')}>План</button>
                <button onClick={() => setFilter('В процессе')}>В процессе</button>
                <button onClick={() => setFilter('Завершён')}>Завершён</button>
            </div>

            <ul>
                {filteredExperiments.map(exp => (
                    <li key={exp.id}>
                        {exp.name} - {exp.status}
                        <button onClick={() => deleteExperiment(exp.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;