import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns'; // Для отображения времени, прошедшего с момента создания задачи

function Task({
                id,               // Уникальный идентификатор задачи
                description,      // Описание задачи
                createdAt,        // Время создания задачи
                completed,        // Статус выполнения задачи (выполнена или нет)
                isEditing,        // Флаг редактирования задачи
                onToggleTask,     // Функция для переключения состояния задачи (выполнена/не выполнена)
                onRemoveTask,     // Функция для удаления задачи
                onEditTask,       // Функция для начала редактирования задачи
                onSaveTask,       // Функция для сохранения редактированной задачи
                onCancelEdit,     // Функция для отмены редактирования
              }) {
  // Состояние для отображения времени, прошедшего с момента создания задачи
  const [timeLabel, setTimeLabel] = useState('');

  // Состояние для редактируемого описания задачи
  const [editedDescription, setEditedDescription] = useState(description);

  // Используем useEffect для обновления времени, прошедшего с момента создания задачи
  useEffect(() => {
    // Функция для обновления метки времени
    const updateTimeLabel = () => {
      // Вычисляем разницу во времени между текущим моментом и временем создания задачи
      const timeDifference = Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000);

      if (timeDifference < 60) {
        setTimeLabel(`created less than ${timeDifference} seconds ago`); // Менее минуты
      } else {
        // Используем библиотеку date-fns для отображения времени в формате "x ago"
        setTimeLabel(`created ${formatDistanceToNow(new Date(createdAt), { addSuffix: true })}`);
      }
    };

    updateTimeLabel(); // Выполняем обновление метки времени при первом рендере

    // Устанавливаем интервал для обновления метки времени каждые 5 секунд
    const intervalId = setInterval(updateTimeLabel, 5000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [createdAt]); // Эффект зависит от createdAt, чтобы обновлять метку времени при изменении этого значения

  // Сохранение редактируемой задачи
  const handleSave = () => {
    if (editedDescription.trim()) { // Сохраняем только если описание не пустое
      onSaveTask(id, editedDescription.trim());
    }
  };

  // Обработчик изменения текста в поле ввода
  const handleInputChange = (e) => {
    setEditedDescription(e.target.value); // Обновляем состояние с новым значением
  };

  // Обработчик нажатия клавиш в режиме редактирования
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();  // Сохранить при нажатии Enter
    if (e.key === 'Escape') onCancelEdit(id); // Отменить редактирование при нажатии Escape
  };

  return (
    // Каждый элемент списка представляет собой задачу. Если задача завершена, добавляется класс 'completed'
    <li className={`${completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        {/* Чекбокс для переключения статуса задачи (выполнена/не выполнена) */}
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => onToggleTask(id)} // Переключаем состояние задачи при изменении чекбокса
        />
        {/* Если задача не в режиме редактирования, показываем описание и время создания */}
        {!isEditing ? (
          <>
            <label>
              <span className="description">{description}</span>
              <span className="created">{timeLabel}</span> {/* Время создания задачи */}
            </label>
            {/* Кнопка для редактирования задачи */}
            <button className="icon icon-edit" onClick={() => onEditTask(id)}></button>
            {/* Кнопка для удаления задачи */}
            <button className="icon icon-destroy" onClick={() => onRemoveTask(id)}></button>
          </>
        ) : (
          // Если задача в режиме редактирования, показываем поле для ввода нового описания
          <input
            type="text"
            className="edit"
            value={editedDescription}
            onChange={handleInputChange} // Обновляем значение при изменении текста
            onBlur={handleSave}          // Сохраняем при потере фокуса
            onKeyDown={handleKeyDown}    // Обрабатываем нажатия клавиш
          />
        )}
      </div>
    </li>
  );
}


Task.propTypes = {
  id: PropTypes.number.isRequired,              // Уникальный идентификатор задачи
  description: PropTypes.string.isRequired,     // Описание задачи
  createdAt: PropTypes.instanceOf(Date).isRequired, // Время создания задачи (должно быть экземпляром Date)
  completed: PropTypes.bool.isRequired,         // Статус задачи (выполнена или нет)
  isEditing: PropTypes.bool.isRequired,         // Флаг редактирования задачи
  onToggleTask: PropTypes.func.isRequired,      // Функция для переключения состояния задачи
  onRemoveTask: PropTypes.func.isRequired,      // Функция для удаления задачи
  onEditTask: PropTypes.func.isRequired,        // Функция для начала редактирования задачи
  onSaveTask: PropTypes.func.isRequired,        // Функция для сохранения редактированной задачи
  onCancelEdit: PropTypes.func.isRequired,      // Функция для отмены редактирования
};


export default Task;
