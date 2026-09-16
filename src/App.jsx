import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import Stats from './components/Stats';
import SearchBar from './components/SearchBar';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  // Load todos from localStorage on mount
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  // Add a new todo
  const handleAddTodo = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      setInputError('Công việc không thể trống!');
      return;
    }
    
    setInputError('');
    
    const newTodo = {
      id: Date.now(), // Simple unique ID
      text: inputValue.trim(),
      done: false
    };
    
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  // Toggle todo completion status
  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  // Delete a todo
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Delete all todos
  const handleDeleteAll = () => {
    if (window.confirm('Bạn chắc chắn muốn xóa tất cả công việc?')) {
      setTodos([]);
    }
  };

  // Filter todos based on status
  const filteredByStatus = todos.filter(todo => {
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
    return true; // 'all'
  });

  // Further filter by search term
  const filteredTodos = filteredByStatus.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.done).length,
    active: todos.filter(t => !t.done).length
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>📝 Ứng Dụng Todo</h1>
      </header>

      <main className="app__main">
        {/* Add Todo Form */}
        <form className="app__form" onSubmit={handleAddTodo} noValidate>
          <div className="form-group">
            <label htmlFor="todo-input">Thêm Công Việc Mới</label>
            <input
              id="todo-input"
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (inputError) setInputError('');
              }}
              placeholder="Nhập nội dung công việc..."
              aria-invalid={!!inputError}
              aria-describedby={inputError ? 'input-error' : undefined}
            />
            {inputError && (
              <span id="input-error" className="error" role="alert">
                {inputError}
              </span>
            )}
          </div>
          <button type="submit" className="btn btn--primary">
            Thêm
          </button>
        </form>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* Filter Bar */}
        <FilterBar currentFilter={filter} onFilterChange={setFilter} />

        {/* Statistics */}
        <Stats stats={stats} />

        {/* Todo List */}
        {filteredTodos.length > 0 ? (
          <TodoList
            todos={filteredTodos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        ) : (
          <p className="empty-state">
            {todos.length === 0
              ? 'Không có công việc nào. Thêm một công việc mới!'
              : 'Không tìm thấy công việc phù hợp.'}
          </p>
        )}

        {/* Delete All Button */}
        {todos.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="btn btn--danger"
            style={{ width: '100%', marginTop: '16px' }}
          >
            Xóa Tất Cả
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
