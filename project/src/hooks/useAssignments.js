/**
 * 作业管理自定义Hook
 * 尛装所有作业的增删改查操作
 */

import { useState, useEffect } from 'react';
import { loadAssignments, saveAssignments, generateId } from '../utils/storage';

export const useAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  // 初始化时从localStorage加载数据
  useEffect(() => {
    const data = loadAssignments();
    setAssignments(data);
  }, []);

  /**
   * 添加新作业
   * @param {Object} assignmentData - 作业数据（不含id和timestamp）
   */
  const addAssignment = (assignmentData) => {
    const newAssignment = {
      ...assignmentData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedList = [...assignments, newAssignment];
    setAssignments(updatedList);
    saveAssignments(updatedList);
  };

  /**
   * 更新作业
   * @param {string} id - 作业ID
   * @param {Object} updates - 更新的字段
   */
  const updateAssignment = (id, updates) => {
    const updatedList = assignments.map(item =>
      item.id === id
        ? { ...item, ...updates, updatedAt: new Date().toISOString() }
        : item
    );

    setAssignments(updatedList);
    saveAssignments(updatedList);
  };

  /**
   * 删除作业
   * @param {string} id - 作业ID
   */
  const deleteAssignment = (id) => {
    const updatedList = assignments.filter(item => item.id !== id);
    setAssignments(updatedList);
    saveAssignments(updatedList);
  };

  /**
   * 切换完成状态
   * @param {string} id - 作业ID
   */
  const toggleComplete = (id) => {
    const assignment = assignments.find(item => item.id === id);
    if (assignment) {
      updateAssignment(id, { completed: !assignment.completed });
    }
  };

  return {
    assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    toggleComplete
  };
};
