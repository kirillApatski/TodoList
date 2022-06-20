import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

function App() {
    const title_1: string = "What to learn";
    const title_2: string = "What to learn";
    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 1, title: "CSS", isDone: true},
        {id: 1, title: "JS", isDone: false}
    ];
    const tasks_2: Array<TaskType> = [
        {id: 1, title: "Banana", isDone: false},
        {id: 1, title: "Orange", isDone: true},
        {id: 1, title: "Lemon", isDone: false}
    ]
    return (
        <div className="App">
            <TodoList title={title_1} tasks={tasks_1} />
            <TodoList title={title_2} tasks={tasks_2} />
        </div>
    );
}

export default App;
