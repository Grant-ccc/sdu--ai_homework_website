import React from 'react';
import { formatDate, getRelativeDays, isOverdue } from '../../utils/dateUtils';
import styles from './AssignmentCard.module.css';

/**
 * 作业卡片组件
 * 展示单个作业的信息和操作按钮
 */
const AssignmentCard = ({ assignment, onEdit, onDelete, onToggleComplete }) => {
  const overdue = isOverdue(assignment.deadline, assignment.completed);

  return (
    <div className={`${styles.card} ${overdue ? styles.overdue : ''}`}>
      <div className={styles.header}>
        <span className={styles.courseName}>{assignment.courseName}</span>
        <span className={`${styles.status} ${assignment.completed ? styles.completed : styles.pending}`}>
          {assignment.completed ? '已完成' : '未完成'}
        </span>
      </div>

      <div className={styles.title}>{assignment.title}</div>

      <div className={styles.info}>
        <div className={styles.deadline}>
          <span className={styles.label}>截止日期：</span>
          <span className={styles.date}>{formatDate(assignment.deadline)}</span>
          <span className={styles.relative}>{getRelativeDays(assignment.deadline)}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.toggleBtn} ${assignment.completed ? styles.completedBtn : ''}`}
          onClick={() => onToggleComplete(assignment.id)}
        >
          {assignment.completed ? '取消完成' : '标记完成'}
        </button>
        <button className={styles.editBtn} onClick={() => onEdit(assignment)}>
          编辑
        </button>
        <button className={styles.deleteBtn} onClick={() => onDelete(assignment.id)}>
          删除
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;