import React, { useState, useEffect } from "react";
import ModalDialog from "../components/ModalDialog";
import { TodoItem } from "../types/TodoItem";
import { createEmptyErrorResponse, ErrorResponse, isErrorResponse } from "../utils/apiClient";
import { deleteTodo } from "./todoApiClient";

type Props = {
    todo: TodoItem;
    onCancel: () => void;
    onDeleted: () => void;
};

export default function TodosDelete({ todo, onCancel, onDeleted }: Props) {
    const [shouldDeleteTasks, setShouldDeleteTasks] = useState(false);
    const [errorMsg, setErrorMsg] = useState<ErrorResponse>(createEmptyErrorResponse());

    useEffect(() => {
        if (errorMsg.message) {
            window.alert(errorMsg.message);
        }
    }, [errorMsg]);

    const handleDelete = async () => {
        const result = await deleteTodo(todo.guid, shouldDeleteTasks);
        if (isErrorResponse(result)) {
            setErrorMsg(result);
        } else {
            onDeleted();
        }
    };

    return (
        <ModalDialog
            title={`Todo löschen: ${todo.title}`}
            onCancel={onCancel}
            onOk={handleDelete}
        >
            <p>Möchtest du das Todo "{todo.title}" wirklich löschen?</p>
            <label>
                <input
                    type="checkbox"
                    checked={shouldDeleteTasks}
                    onChange={(event) => setShouldDeleteTasks(event.target.checked)}
                />
                Verbundene Tasks ebenfalls löschen
            </label>
        </ModalDialog>
    );
}