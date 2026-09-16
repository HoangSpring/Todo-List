import React from 'react';
import PropTypes from 'prop-types';

function FilterBar({ currentFilter, onFilterChange }) {
  const filters = [
    { value: 'all', label: 'Tất Cả' },
    { value: 'active', label: 'Chưa Hoàn Thành' },
    { value: 'completed', label: 'Đã Hoàn Thành' }
  ];

  return (
    <div className="filter-bar" role="group" aria-label="Lọc công việc">
      {filters.map(f => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`btn btn--filter ${currentFilter === f.value ? 'btn--filter--active' : ''}`}
          aria-pressed={currentFilter === f.value}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

FilterBar.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default FilterBar;
