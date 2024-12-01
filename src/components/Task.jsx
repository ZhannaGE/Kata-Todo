import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

function Task({
  id,
  description,
  createdAt,
  completed,
  isEditing,
  onToggleTask,
  onRemoveTask,
  onEditTask,
  onSaveTask,
  onCancelEdit,
}) {
  const [timeLabel, setTimeLabel] = useState('');
  const [editedDescription, setEditedDescription] = useState(description);

  // Обновление времени
  useEffect(() => {
    const updateTimeLabel = () => {
      const timeDifference = Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000);

      if (timeDifference < 60) {
        setTimeLabel(`created less than ${timeDifference} seconds ago`);
      } else {
        setTimeLabel(`created ${formatDistanceToNow(new Date(createdAt), { addSuffix: true })}`);
      }
    };

    updateTimeLabel(); // Первоначальное обновление метки времени
    const intervalId = setInterval(updateTimeLabel, 5000); // Обновляем каждые 5 секунд

    return () => clearInterval(intervalId); // Очистка интервала при удалении компонента
  }, [createdAt]);

  // Сохранение задачи после редактирования
  const handleSave = () => {
    if (editedDescription.trim()) {
      onSaveTask(id, editedDescription.trim());
    }
  };

  // Обработчик редактирования описания
  const handleInputChange = (e) => {
    setEditedDescription(e.target.value);
  };

  // Обработчик нажатия клавиш
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave(); // Save on Enter
    if (e.key === 'Escape') onCancelEdit(id); // Cancel on Escape
  };

  return (
    <li className={`${completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={() => onToggleTask(id)} />
        {!isEditing ? (
          <>
            <label>
              <span className="description">{description}</span>
              <span className="created">{timeLabel}</span>
            </label>
            <button className="icon icon-edit" onClick={() => onEditTask(id)}></button>
            <button className="icon icon-destroy" onClick={() => onRemoveTask(id)}></button>
          </>
        ) : (
          <input
            type="text"
            className="edit"
            value={editedDescription}
            onChange={handleInputChange}
            onBlur={handleSave} // Save when focus lost
            onKeyDown={handleKeyDown} // Handle key events for saving and canceling
          />
        )}
      </div>
    </li>
  );
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  completed: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onRemoveTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onSaveTask: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
};

export default Task;
