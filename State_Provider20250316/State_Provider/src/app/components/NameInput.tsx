"use client";

import React, { useState } from 'react';
import { useTodoAppState } from '../context/TodoAppContext';
import ModalDialog from './ModalDialog';

const NameInput: React.FC = () => {
  const { activeUser, actions } = useTodoAppState();
  const [userName, setUserName] = useState('');

  if (activeUser !== null && activeUser !== "Guest") return null;

  const handleSave = () => {
    actions.setActiveUser(userName.trim() || 'Guest');
  };

  const handleCancel = () => {
    actions.setActiveUser('Guest');
  };

  return (
    <ModalDialog
      title="Enter your name"
      onOk={handleSave}
      onCancel={handleCancel}
    >
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter your name"
      />
    </ModalDialog>
  );
};

export default NameInput;
