import React from 'react';
import PropTypes from 'prop-types';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.done ? 'todo-item--completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="todo-item__checkbox"
        aria-label={`Đánh dấu hoàn thành: ${todo.text}`}
      />
      <span className="todo-item__text">{todo.text}</span>
      <button
        onClick={() => onDelete(todo.id)}
        className="btn btn--small btn--danger"
        aria-label={`Xóa công việc: ${todo.text}`}
      >
        ✕
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TodoItem;
