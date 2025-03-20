"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type TodoAppStateActions = {
    setError: (value: string) => void;
    setActiveUser: (value: string | null) => void; // Null, wenn kein User aktiv ist
};

type TodoAppState = {
    error: string;
    activeUser: string | null; // null, wenn der Benutzer noch nicht eingegeben wurde
};

type TodoAppContextType = TodoAppState & { actions: TodoAppStateActions };

export const TodoAppContext = createContext<TodoAppContextType | undefined>(undefined);

export function TodoAppStateProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<TodoAppState>({ error: "", activeUser: null });

    const setError = (value: string) => setState(prev => ({ ...prev, error: value }));

    const setActiveUser = (value: string | null) => setState(prev => ({ ...prev, activeUser: value }));

    return (
        <TodoAppContext.Provider value={{ ...state, actions: { setError, setActiveUser } }}>
            {children}
        </TodoAppContext.Provider>
    );
}

export function useTodoAppState() {
    const context = useContext(TodoAppContext);
    if (!context) {
        throw new Error('useTodoAppState must be used within a TodoAppStateProvider.');
    }
    return context;
}
