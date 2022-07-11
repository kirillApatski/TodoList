import React, {useState, KeyboardEvent, ChangeEvent,} from 'react';
import {FilterValuesType} from "./App";

export type  TaskType = {
    id: string
    isDone: boolean
    title: string
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    filter: FilterValuesType
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<boolean>(false);

    const tasksListItems = props.tasks.length
        ? props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id);
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked);
        return (
            <li key={task.id} className={task.isDone ? "isDone" : ""}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeTaskStatus}
                />
                <span>{task.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })
        : <span>Added tasks</span>

    const onClickAddTask = () => {
        if (title.trim()) {
            props.addTask(title.trim());
        } else {
            setError(true);
        }
        setTitle("");
    }
    const onKewDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.ctrlKey) {
            onClickAddTask()
        }
    }
    const onChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setTitle(e.currentTarget.value);
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeFilter}
                       onKeyDown={onKewDownAddTask}
                       className={error ? "error" : ""}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div style={{ color : "red"}}>Title is required </div>}
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active" : ""}
                        onClick={() => props.changeFilter("all")}>All
                </button>
                <button className={props.filter === "active" ? "active" : ""}
                        onClick={() => props.changeFilter("active")}>Active
                </button>
                <button className={props.filter === "completed" ? "active" : ""}
                        onClick={() => props.changeFilter("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;