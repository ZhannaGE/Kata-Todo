import PropTypes from 'prop-types';
import Task from './Task';

function TaskList({ tasks, onToggleTask, onRemoveTask, onEditTask, onSaveTask, onCancelEdit }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        const { id, description, createdAt, completed, isEditing } = task; // Деструктуризация задачи
        return (
          <Task
            key={id}
            id={id}
            description={description}
            createdAt={createdAt}
            completed={completed}
            isEditing={isEditing}
            onToggleTask={onToggleTask}
            onRemoveTask={onRemoveTask}
            onEditTask={onEditTask}
            onSaveTask={onSaveTask}
            onCancelEdit={onCancelEdit}
          />
        );
      })}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
      completed: PropTypes.bool.isRequired,
      isEditing: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onRemoveTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onSaveTask: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
};

export default TaskList;
