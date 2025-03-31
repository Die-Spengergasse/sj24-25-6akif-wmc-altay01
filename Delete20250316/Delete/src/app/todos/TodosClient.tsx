'use client';

import React, { useEffect, useReducer, useState } from "react";
import { TodoItem } from "../types/TodoItem";
import styles from "./style.module.css";
import TodosDelete from "./TodosDelete";

type Action =
    | { type: "delete"; payload: TodoItem }
    | { type: "cancel" };

type State =
    | { actionType: "delete"; selectedTodo: TodoItem }
    | { actionType: null };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "delete":
            return { actionType: "delete", selectedTodo: action.payload };
        case "cancel":
            return { actionType: null };
        default:
            return state;
    }
};

export default function TodosClient() {
    const [state, dispatch] = useReducer(reducer, { actionType: null });
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await fetch("https://localhost:5443/api/TodoItems");
                const result = await res.json();
                setTodos(result);
            } catch (err) {
                console.error("Fehler beim Abrufen der Todos:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTodos();
    }, []);

    if (isLoading) {
        return <p>Todos werden geladen...</p>;
    }

    return (
        <div className={styles.categories}>
            <h1>Todo Liste</h1>
            <ul>
                {todos.map((item) => (
                    <li key={item.guid}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <p>Status: {item.isCompleted ? "Abgeschlossen" : "Ausstehend"}</p>
                        <button
                            className={styles.deleteButton}
                            onClick={() => dispatch({ type: "delete", payload: item })}
                        >
                            🗑️ Löschen
                        </button>
                    </li>
                ))}
            </ul>
            {state.actionType === "delete" && (
                <TodosDelete
                    todo={state.selectedTodo}
                    onCancel={() => dispatch({ type: "cancel" })}
                    onDeleted={() => dispatch({ type: "cancel" })}
                />
            )}
        </div>
    );
}