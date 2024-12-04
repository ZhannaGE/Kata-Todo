import PropTypes from 'prop-types';

import Task from './Task';

function TaskList({
  tasks, // Массив задач, которые нужно отобразить
  onToggleTask, // Функция для переключения состояния задачи (выполнена/не выполнена)
  onRemoveTask, // Функция для удаления задачи
  onEditTask, // Функция для начала редактирования задачи
  onSaveTask, // Функция для сохранения отредактированной задачи
  onCancelEdit, // Функция для отмены редактирования задачи
}) {
  return (
    // Список задач, отображаемых в виде <ul>
    <ul className="todo-list">
      {tasks.map((task) => {
        // Деструктурируем свойства задачи для удобства
        const { id, description, createdAt, completed, isEditing } = task;

        return (
          // Для каждой задачи создаем компонент Task
          <Task
            key={id} // Уникальный ключ для каждого элемента списка
            id={id} // Идентификатор задачи
            description={description} // Описание задачи
            createdAt={createdAt} // Время создания задачи
            completed={completed} // Статус завершенности задачи
            isEditing={isEditing} // Флаг редактирования задачи
            onToggleTask={onToggleTask} // Функция для переключения состояния задачи
            onRemoveTask={onRemoveTask} // Функция для удаления задачи
            onEditTask={onEditTask} // Функция для начала редактирования задачи
            onSaveTask={onSaveTask} // Функция для сохранения отредактированной задачи
            onCancelEdit={onCancelEdit} // Функция для отмены редактирования задачи
          />
        );
      })}
    </ul>
  );
}

TaskList.propTypes = {
  // Задачи должны быть массивом объектов, каждый из которых имеет следующие свойства
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, // Уникальный идентификатор задачи
      description: PropTypes.string.isRequired, // Описание задачи
      createdAt: PropTypes.instanceOf(Date).isRequired, // Время создания задачи
      completed: PropTypes.bool.isRequired, // Статус выполнения задачи (выполнена/не выполнена)
      isEditing: PropTypes.bool.isRequired, // Флаг редактирования задачи
    })
  ).isRequired,
  onToggleTask: PropTypes.func.isRequired, // Функция для переключения состояния задачи
  onRemoveTask: PropTypes.func.isRequired, // Функция для удаления задачи
  onEditTask: PropTypes.func.isRequired, // Функция для редактирования задачи
  onSaveTask: PropTypes.func.isRequired, // Функция для сохранения изменений
  onCancelEdit: PropTypes.func.isRequired, // Функция для отмены редактирования задачи
};

export default TaskList;
