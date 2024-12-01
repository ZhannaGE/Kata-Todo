import { useState, useMemo } from 'react';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Добавить задачу
  const addTask = (description) => {
    const newTask = {
      id: Date.now(),
      description,
      createdAt: new Date(),
      completed: false,
      isEditing: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Переключить состояние задачи (активно/завершено)
  const toggleTask = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  // Очистить все задачи
  const clearTasks = () => {
    setTasks([]);
  };

  // Удалить задачу
  const removeTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Перейти в режим редактирования
  const editTask = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, isEditing: true } : task)));
  };

  // Сохранить отредактированную задачу
  const saveTask = (id, newDescription) => {
    if (!newDescription.trim()) return; // Не сохраняем пустые описания
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, description: newDescription.trim(), isEditing: false } : task
      )
    );
  };

  // Отменить редактирование
  const cancelEdit = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, isEditing: false } : task)));
  };

  // Мемоизированная фильтрация задач
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true; // 'all'
    });
  }, [tasks, filter]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasks} // Используем отфильтрованные задачи
          onToggleTask={toggleTask}
          onRemoveTask={removeTask}
          onEditTask={editTask} // Режим редактирования
          onSaveTask={saveTask} // Сохранить изменения
          onCancelEdit={cancelEdit} // Отмена редактирования
        />
        <Footer
          tasksLeft={tasks.filter((task) => !task.completed).length}
          onClearCompleted={clearTasks}
          currentFilter={filter}
          onFilterChange={setFilter}
        />
      </section>
    </section>
  );
}

export default App;
