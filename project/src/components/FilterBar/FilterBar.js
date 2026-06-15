import React from 'react';
import styles from './FilterBar.module.css';

/**
 * 筛选栏组件
 * 提供课程筛选、状态筛选和排序功能
 */
const FilterBar = ({
  courses,
  selectedCourse,
  selectedStatus,
  sortOrder,
  onCourseChange,
  onStatusChange,
  onSortChange
}) => {
  return (
    <div className={styles.filterBar}>
      {/* 课程筛选 */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>课程筛选：</label>
        <select
          className={styles.select}
          value={selectedCourse}
          onChange={(e) => onCourseChange(e.target.value)}
        >
          <option value="all">全部课程</option>
          {courses.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
      </div>

      {/* 状态筛选 */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>状态筛选：</label>
        <select
          className={styles.select}
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all">全部</option>
          <option value="pending">未完成</option>
          <option value="completed">已完成</option>
        </select>
      </div>

      {/* 排序 */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>截止日期排序：</label>
        <button
          className={`${styles.sortBtn} ${sortOrder === 'asc' ? styles.active : ''}`}
          onClick={() => onSortChange('asc')}
        >
          升序 ↑
        </button>
        <button
          className={`${styles.sortBtn} ${sortOrder === 'desc' ? styles.active : ''}`}
          onClick={() => onSortChange('desc')}
        >
          降序 ↓
        </button>
      </div>
    </div>
  );
};

export default FilterBar;