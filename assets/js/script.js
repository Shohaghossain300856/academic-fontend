let date = new Date();

function renderCalendar() {
    date.setDate(1);
    const monthDays = document.getElementById("calendarDays");
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    
    const firstDayIndex = date.getDay(); 
    let startDay = (firstDayIndex + 1) % 7; 

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById("monthYear").innerHTML = months[date.getMonth()] + " " + date.getFullYear();

    let days = "";

    // আগের মাসের দিন
    for (let x = startDay; x > 0; x--) {
        days += `<div class="opacity-25 text-muted">${prevLastDay - x + 1}</div>`;
    }

    // বর্তমান মাসের দিন
    for (let i = 1; i <= lastDay; i++) {
        let checkDate = new Date(date.getFullYear(), date.getMonth(), i);
        let dayOfWeek = checkDate.getDay(); 
        
        let isToday = (i === new Date().getDate() && 
                       date.getMonth() === new Date().getMonth() && 
                       date.getFullYear() === new Date().getFullYear()) ? "current-day" : "";
        
        // ৫ = শুক্রবার, ৬ = শনিবার
        let isHoliday = (dayOfWeek === 5 || dayOfWeek === 6) ? "holiday-red" : "";

        days += `<div class="${isToday} ${isHoliday}">${i}</div>`;
    }
    monthDays.innerHTML = days;
}

function prevMonth() { date.setMonth(date.getMonth() - 1); renderCalendar(); }
function nextMonth() { date.setMonth(date.getMonth() + 1); renderCalendar(); }

document.addEventListener("DOMContentLoaded", renderCalendar);



// Mobile Dropdown Sub-menu Toggle
document.querySelectorAll('.dropdown-submenu .dropdown-toggle').forEach(function(element) {
    element.addEventListener('click', function (e) {
        if (window.innerWidth < 992) {
            e.preventDefault();
            e.stopPropagation();
            
            // অন্য কোনো সাব-মেনু খোলা থাকলে তা বন্ধ করে দেবে
            let nextEl = this.nextElementSibling;
            if (nextEl && nextEl.classList.contains('show')) {
                nextEl.classList.remove('show');
            } else {
                // সব খোলা সাব-মেনু বন্ধ করে শুধু বর্তমানটি খুলবে
                this.parentElement.parentElement.querySelectorAll('.show').forEach(el => el.classList.remove('show'));
                if(nextEl) nextEl.classList.add('show');
            }
        }
    });
});