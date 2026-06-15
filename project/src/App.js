import React, { useState, useMemo } from 'react';
import './App.css';
import AssignmentCard from './components/AssignmentCard';
import FilterBar from './components/FilterBar';
import AssignmentForm from './components/AssignmentForm';
import ConfirmDialog from './components/ConfirmDialog';
import { useAssignments } from './hooks/useAssignments';
import { compareDates } from './utils/dateUtils';

function App() {
  // 作业数据和操作
  const {
    assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    toggleComplete
  } = useAssignments();

  // 筛选状态
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  // 模态框状态
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // 提取所有课程名称
  const courses = useMemo(() => {
    const courseSet = new Set(assignments.map(a => a.courseName));
    return Array.from(courseSet).sort();
  }, [assignments]);

  // 筛选和排序后的作业列表
  const filteredAssignments = useMemo(() => {
    let result = [...assignments];

    // 课程筛选
    if (selectedCourse !== 'all') {
      result = result.filter(a => a.courseName === selectedCourse);
    }

    // 状态筛选
    if (selectedStatus === 'completed') {
      result = result.filter(a => a.completed);
    } else if (selectedStatus === 'pending') {
      result = result.filter(a => !a.completed);
    }

    // 排序
    result.sort((a, b) => {
      const compare = compareDates(a.deadline, b.deadline);
      return sortOrder === 'asc' ? compare : -compare;
    });

    return result;
  }, [assignments, selectedCourse, selectedStatus, sortOrder]);

  // 添加新作业
  const handleAdd = () => {
    setEditingAssignment(null);
    setIsFormOpen(true);
  };

  // 编辑作业
  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    setIsFormOpen(true);
  };

  // 保存作业（添加或编辑）
  const handleSave = (data) => {
    if (editingAssignment) {
      updateAssignment(editingAssignment.id, data);
    } else {
      addAssignment(data);
    }
  };

  // 删除作业
  const handleDelete = (id) => {
    setDeleteTarget(id);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteAssignment(deleteTarget);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>课程作业管理</h1>
      </header>

      <main className="app-main">
        {/* 筛选栏 */}
        <FilterBar
          courses={courses}
          selectedCourse={selectedCourse}
          selectedStatus={selectedStatus}
          sortOrder={sortOrder}
          onCourseChange={setSelectedCourse}
          onStatusChange={setSelectedStatus}
          onSortChange={setSortOrder}
        />

        {/* 添加按钮 */}
        <button className="add-button" onClick={handleAdd}>
          + 添加新作业
        </button>

        {/* 作业列表 */}
        <div className="assignment-list">
          {filteredAssignments.length === 0 ? (
            <div className="empty-state">
              <p>暂无作业</p>
              <p className="hint">点击上方按钮添加新作业</p>
            </div>
          ) : (
            filteredAssignments.map(assignment => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleComplete={toggleComplete}
              />
            ))
          )}
        </div>
      </main>

      {/* 添加/编辑表单 */}
      <AssignmentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        assignment={editingAssignment}
      />

      {/* 删除确认对话框 */}
      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="确认删除"
        message="确定要删除这个作业吗？删除后将无法恢复。"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default App;