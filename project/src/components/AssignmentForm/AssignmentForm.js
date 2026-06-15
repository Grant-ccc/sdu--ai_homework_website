import React, { useState } from 'react';
import styles from './AssignmentForm.module.css';

/**
 * 作业表单组件（模态框）
 * 用于添加和编辑作业
 */
const AssignmentForm = ({ isOpen, onClose, onSave, assignment = null }) => {
  const [formData, setFormData] = useState({
    courseName: '',
    title: '',
    deadline: '',
    completed: false
  });

  // 编辑模式下初始化数据
  React.useEffect(() => {
    if (assignment) {
      setFormData({
        courseName: assignment.courseName,
        title: assignment.title,
        deadline: assignment.deadline.split('T')[0], // 转换为date input格式
        completed: assignment.completed
      });
    } else {
      setFormData({
        courseName: '',
        title: '',
        deadline: '',
        completed: false
      });
    }
  }, [assignment, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 验证必填字段
    if (!formData.courseName.trim() || !formData.title.trim() || !formData.deadline) {
      alert('请填写所有必填字段！');
      return;
    }

    // 转换日期格式为ISO
    const submitData = {
      ...formData,
      deadline: new Date(formData.deadline).toISOString()
    };

    onSave(submitData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{assignment ? '编辑作业' : '添加新作业'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              课程名称 <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className={styles.input}
              placeholder="请输入课程名称"
              maxLength="50"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              作业标题 <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.input}
              placeholder="请输入作业标题"
              maxLength="100"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              截止日期 <span className={styles.required}>*</span>
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          {assignment && (
            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                已完成
              </label>
            </div>
          )}

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              取消
            </button>
            <button type="submit" className={styles.submitBtn}>
              {assignment ? '保存修改' : '添加作业'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentForm;