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
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState("")

    const tasksListItems = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id)
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    });

    const onClickAddTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const onKewDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && e.ctrlKey) {
            onClickAddTask()
        }
    }
    const onChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeFilter}
                       onKeyDown={onKewDownAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter("all")}>All</button>
                <button onClick={()=>props.changeFilter("active")}>Active</button>
                <button onClick={()=>props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;