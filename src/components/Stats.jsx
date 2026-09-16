import React from 'react';
import PropTypes from 'prop-types';

function Stats({ stats }) {
  return (
    <div className="stats">
      <div className="stat">
        <span className="stat__number">{stats.total}</span>
        <span className="stat__label">Tổng Cộng</span>
      </div>
      <div className="stat">
        <span className="stat__number">{stats.active}</span>
        <span className="stat__label">Chưa Hoàn</span>
      </div>
      <div className="stat">
        <span className="stat__number">{stats.completed}</span>
        <span className="stat__label">Đã Hoàn</span>
      </div>
    </div>
  );
}

Stats.propTypes = {
  stats: PropTypes.shape({
    total: PropTypes.number.isRequired,
    completed: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired
  }).isRequired
};

export default Stats;
