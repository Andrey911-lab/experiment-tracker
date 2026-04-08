import React, { useState, useEffect } from 'react';

function App() {
    const [experiments, setExperiments] = useState([]);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('План');
    const [filter, setFilter] = useState('Все');

    useEffect(() => {
        const saved = localStorage.getItem('experiments');
        if (saved) {
            setExperiments(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('experiments', JSON.stringify(experiments));
    }, [experiments]);

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

    const completedCount = experiments.filter(exp => exp.status === 'Завершён').length;

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Учёт экспериментов</h1>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Название эксперимента"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}>
                    {statuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                <button onClick={addExperiment} style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Добавить</button>
            </div>

            <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <label>Фильтр по статусу: </label>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    {['Все', ...statuses].map(s => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            style={{
                                padding: '6px 12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                backgroundColor: filter === s ? '#4CAF50' : 'white',
                                color: filter === s ? 'white' : 'black'
                            }}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {filteredExperiments.length === 0 ? (
                <p>Нет экспериментов</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {filteredExperiments.map(exp => (
                        <li key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginBottom: '8px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px' }}>
                            <span>{exp.name} - {exp.status}</span>
                            <button onClick={() => deleteExperiment(exp.id)} style={{ padding: '4px 8px', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Удалить</button>
                        </li>
                    ))}
                </ul>
            )}

            <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e8f5e9', borderRadius: '8px', textAlign: 'center' }}>
                <strong>Завершённых экспериментов: {completedCount}</strong>
            </div>
        </div>
    );
}

export default App;