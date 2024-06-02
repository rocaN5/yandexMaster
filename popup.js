// Добавляем слушатель события для кнопки внутри файла popup.js
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('mergePdfButton').addEventListener('click', function() {
        handleButtonClick(); // Вызываем функцию при нажатии на кнопку
    });
});
