import React from 'react';

import './app-header.css';

const AppHeader = ({toDo, done}) => {
  return (
    <div className="app-header d-flex">
      <h1>Задачи</h1>
      <h2>в работе: {toDo}, выполнено: {done}</h2>
    </div>
  );
};

export default AppHeader;
