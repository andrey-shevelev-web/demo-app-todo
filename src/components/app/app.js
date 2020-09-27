import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  // init
  state = {
    todoData: [
      this.createItem('Drink Coffee'),
      this.createItem('Make React App'),
      this.createItem('Have a lunch'),
      this.createItem('Make another React App'),
      this.createItem('Meditation on JavaScript')
    ],
    term: '',
    filter: 'all' // all, active, done
  };

  createItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newTodoData = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newTodoData
      };
    });
  }

  addItem = (text) => {
    const newItem = this.createItem(text);

    this.setState(({ todoData }) => {
      const newTodoData = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newTodoData
      };
    });
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  toggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  }
 
  toggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  }

  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label
        .toLowerCase()
        .indexOf(term.toLowerCase()) > -1;
    });
  }

  searchChange = (term) => {
    this.setState({ term });
  }

  filterDone = (items, filterText) => {
    switch(filterText) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.done);
      case 'done':
        return items.filter(item => item.done);
      default:
        return items;
    }
  }

  filterChange = (filter) => {
    this.setState({ filter });
  }

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filterDone(this.search(todoData, term), filter);

    const doneCounter = todoData.filter((el) => el.done).length;
    const todoCounter = todoData.length - doneCounter;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCounter} done={doneCounter}/>
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.searchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.filterChange} />
        </div>
        <TodoList
          todos={ visibleItems }
          onDeleted={ this.deleteItem }
          onToggleImportant = { this.toggleImportant }
          onToggleDone = { this.toggleDone }
        />
        <ItemAddForm
          onItemAdded={ this.addItem }
        />
      </div>
    );
  }
}
