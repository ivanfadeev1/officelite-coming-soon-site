/* Countdown timer */

const targetDay = document.querySelector('.counter__title-date-day');
const targetMonth = document.querySelector('.counter__title-date-month');
const targetYear = document.querySelector('.counter__title-date-year');
const daysCounter = document.querySelector('.counter__sections-item-number--days');
const hoursCounter = document.querySelector('.counter__sections-item-number--hours');
const minutesCounter = document.querySelector('.counter__sections-item-number--minutes');
const secondsCounter = document.querySelector('.counter__sections-item-number--seconds');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 30);

targetDay.textContent = targetDate.getDate();
targetMonth.textContent = months[targetDate.getMonth()];
targetYear.textContent = targetDate.getFullYear();

setInterval(() => {
    const now = new Date();

    const timeRemaining = targetDate.getTime() - now.getTime();

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    daysCounter.textContent = days;
    hoursCounter.textContent = hours;
    minutesCounter.textContent = minutes;
    secondsCounter.textContent = seconds;
}, 1000);