import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function App() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [edit, setEdit] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const API_URL = 'http://localhost:5000/todos';
// Fetch Todos (GET)
    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setTodos(data));
    }, []);
// Add Todo (POST)
    const addTodo = () => {
        fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({task, completed: false})
        })
            .then(res => res.json())
            .then(newTodo => setTodos([...todos, newTodo]));
    };

// Update Todo (PUT)
    const updateTodo = (id) => {
        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, task: edit, completed: isCompleted})
        })
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setTodos(data))
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setTodos(data))
    }

// Delete Todo (DELETE)
    const deleteTodo = (id) => {
        fetch(`${API_URL}/${id}`, {method: 'DELETE'})
            .then(() => setTodos(todos.filter(t => t.id !== id)));
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <Form>
                <Form.Group controlId="add">
                    <Form.Label column="sm"></Form.Label>
                    <Form.Control type="text" value={task} onChange={(e) => setTask(e.target.value)}/>
                </Form.Group>
            </Form>
            <Button variant="success" onClick={addTodo}>Add</Button>
            <ul>
                {todos.map(t => (
                    <>
                        <li key={t.id}>
                            <p className = "task">{t.task}</p>
                            <p className = "completed">Completed:
                                {t.completed.toString()}</p>
                            <Button variant = "danger" className="delete" onClick={() => deleteTodo(t.id)}>Delete</Button>
                            <br></br>
                            <br></br>
                            <Form>
                                <Form.Group controlId="update">
                                    <Form.Label className="edit-label" column="sm">Edit Task: </Form.Label>
                                        <Form.Control type="text" value={edit} onChange={(e) => setEdit(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="checkbox">
                                    <Form.Label className="completed-label" column="sm">Completed? </Form.Label>
                                    <Form.Check type="checkbox" checked={isCompleted} onChange={(e) => setIsCompleted(e.target.checked)}/>
                                </Form.Group>
                            </Form>
                            <Button variant = "secondary" onClick={() => updateTodo(t.id)}>Update</Button>
                            <br></br>
                            <br></br>
                        </li>
                    </>
                ))}
            </ul>
        </div>
    );
}
export default App