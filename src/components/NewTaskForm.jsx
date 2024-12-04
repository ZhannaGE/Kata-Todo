import { useState } from 'react';
import PropTypes from 'prop-types';

// Компонент NewTaskForm отвечает за создание новой задачи
function NewTaskForm({ onAddTask }) {
  // Состояние для хранения текущего значения ввода в поле
  const [inputValue, setInputValue] = useState('');

  // Функция для обработки отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
    if (inputValue.trim()) {
      // Проверяем, что строка не пустая (без пробелов)
      onAddTask(inputValue.trim()); // Передаем значение поля ввода в родительский компонент
      setInputValue(''); // Очищаем поле ввода после добавления задачи
    }
  };

  // Функция для обработки изменения текста в поле ввода
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Обновляем состояние с новым значением поля
  };

  return (
    // Форма, которая вызывает handleSubmit при отправке
    <form onSubmit={handleSubmit}>
      {/* Поле ввода для новой задачи */}
      <input
        className="new-todo" // Класс для стилизации поля
        placeholder="What needs to be done?" // Текст подсказки
        value={inputValue} // Привязываем значение поля к состоянию
        onChange={handleInputChange} // Обработчик изменения текста в поле
        autoFocus // Автоматически фокусирует поле ввода при загрузке компонента
      />
    </form>
  );
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired, // Функция для добавления новой задачи, обязательный пропс
};

export default NewTaskForm;
