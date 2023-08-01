let dateElements = document.getElementsByClassName('schedule__date-auto');

// Функция для форматирования числа с ведущим нулем (например, 01, 02, 03)
function formatNumber(number) {
  return number.toString().padStart(2, '0');
}

// Функция для получения ближайшей субботы и воскресенья к указанной дате
function getNearestWeekend(date) {
  let dayOfWeek = date.getDay();
  let daysUntilWeekend;

  if (dayOfWeek === 6) { // Суббота
    daysUntilWeekend = 0;
  } else if (dayOfWeek === 0) { // Воскресенье
    daysUntilWeekend = 1;
  } else {
    daysUntilWeekend = 6 - dayOfWeek + 1;
  }

  let nearestSaturday = new Date(date.getTime() + daysUntilWeekend * 24 * 60 * 60 * 1000);
  let nearestSunday = new Date(nearestSaturday.getTime() + 1 * 24 * 60 * 60 * 1000);

  return {
    saturday: nearestSaturday,
    sunday: nearestSunday
  };
}

// Функция для получения текущей даты в формате "ДД.ММ"
function getCurrentDate() {
  let today = new Date();
  let day = formatNumber(today.getDate());
  let month = formatNumber(today.getMonth() + 1);

  return day + '.' + month;
}

// Функция для обновления даты
function updateDate() {
  let currentDate = getCurrentDate();

  Array.from(dateElements).forEach(function (element) {
    let dayOfWeek = new Date().getDay();
    let nextSaturday = new Date();

    if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Понедельник - Пятница
      nextSaturday.setDate(nextSaturday.getDate() + (6 + 7 - nextSaturday.getDay()) % 7); // Ближайшая суббота
      let nextSunday = new Date(nextSaturday.getTime() + 1 * 24 * 60 * 60 * 1000); // Ближайшее воскресенье

      let saturday = formatNumber(nextSaturday.getDate());
      let sunday = formatNumber(nextSunday.getDate());

      element.innerHTML = saturday + '.' + formatNumber(nextSaturday.getMonth() + 1) + '/' + sunday + '.' + formatNumber(nextSunday.getMonth() + 1); // Отображаем дату субботы и воскресенья в формате "ДД.ММ/ДД.ММ"
    } else {
      element.innerHTML = currentDate; // Отображаем только текущую дату для субботы и воскресенья
    }
  });
}

// Обновляем дату при загрузке страницы
updateDate();

// Устанавливаем интервал для обновления даты каждый день
setInterval(updateDate, 24 * 60 * 60 * 1000);
