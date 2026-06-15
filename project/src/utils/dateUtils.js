/**
 * 日期处理工具函数
 */

/**
 * 判断作业是否逾期
 * @param {string} deadline - 截止日期 (ISO格式)
 * @param {boolean} completed - 是否已完成
 * @returns {boolean} 是否逾期
 */
export const isOverdue = (deadline, completed) => {
  if (completed) return false;

  const deadlineDate = new Date(deadline);
  const now = new Date();

  // 设置为当天结束时间（23:59:59）
  deadlineDate.setHours(23, 59, 59, 999);
  now.setHours(0, 0, 0, 0);

  return now > deadlineDate;
};

/**
 * 格式化日期显示
 * @param {string} dateStr - ISO日期字符串
 * @returns {string} 格式化的日期（YYYY-MM-DD）
 */
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * 获取相对日期描述
 * @param {string} deadline - 截止日期
 * @returns {string} 相对描述（如"还剩3天"、"已逾期2天"）
 */
export const getRelativeDays = (deadline) => {
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(23, 59, 59, 999);

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return `还剩${diffDays}天`;
  } else if (diffDays === 0) {
    return '今天截止';
  } else {
    return `已逾期${Math.abs(diffDays)}天`;
  }
};

/**
 * 比较两个日期（用于排序）
 * @param {string} dateA - 日期A
 * @param {string} dateB - 日期B
 * @returns {number} 比较结果
 */
export const compareDates = (dateA, dateB) => {
  const a = new Date(dateA);
  const b = new Date(dateB);
  return a - b;
};