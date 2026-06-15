/**
 * localStorage 工具函数
 * 负责作业数据的持久化存储和读取
 */

const STORAGE_KEY = 'assignment_manager_data';

/**
 * 从localStorage读取所有作业
 * @returns {Array} 作业数组
 */
export const loadAssignments = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('读取localStorage失败:', error);
    return [];
  }
};

/**
 * 保存作业数组到localStorage
 * @param {Array} assignments - 作业数组
 */
export const saveAssignments = (assignments) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
  } catch (error) {
    console.error('保存到localStorage失败:', error);
  }
};

/**
 * 生成唯一ID
 * @returns {string} UUID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
