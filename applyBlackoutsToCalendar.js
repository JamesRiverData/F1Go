// blackout-calendar.js
// ES module version: polls for a specific calendar, applies blackout days, accepts optional additional dates array, and configurable past/future blackout

const DEBUG = true;
const L = (...args)=> { if(DEBUG) console.log('[Blackout]', ...args); };

// No default blackout dates
let defaultBlackoutDates = [];

// Fetch optional external blackout dates
fetch('/blackout-dates.json')
  .then(r => r.ok ? r.json() : Promise.reject('no-json'))
  .then(data => {
    if (data && Array.isArray(data.blackoutDates)) {
      defaultBlackoutDates = data.blackoutDates;
      L('Loaded blackoutDates from JSON:', defaultBlackoutDates);
    }
  })
  .catch(err => L('No JSON loaded (this may be fine):', err));

function formatYMD(d){
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

const today = new Date();
today.setHours(0,0,0,0);

function waitForCalendar(inputName, extraDates, blockPast = false, blockFuture = false){
  const targetCalendar = document.querySelector(
    `input[name="${inputName}"]`
  )?.closest('.formbuilder-field')?.querySelector('.input-calendar');

  if (!targetCalendar) {
    setTimeout(() => waitForCalendar(inputName, extraDates, blockPast, blockFuture), 500);
    return;
  }

  L(`✅ Found calendar for input name: ${inputName}`);

  applyToCalendar(targetCalendar, extraDates, blockPast, blockFuture);

  const mo = new MutationObserver(() => {
    setTimeout(() => applyToCalendar(targetCalendar, extraDates, blockPast, blockFuture), 100);
  });
  mo.observe(targetCalendar, { childList: true, subtree: true, attributes: true });

  targetCalendar.addEventListener('click', function(e){
    if (e.target.closest('.calendar-icon') || 
        e.target.closest('.input-calendar-field') || 
        e.target.closest('.navigation-wrapper .icon')) {
      setTimeout(() => applyToCalendar(targetCalendar, extraDates, blockPast, blockFuture), 150);
    }
  }, true);

  const dateInput = targetCalendar.querySelector('.input-calendar-field');
  if (dateInput) dateInput.setAttribute('readonly','readonly');
}

function applyToCalendar(calEl, extraDates, blockPast, blockFuture){
  const navTitleEl = calEl.querySelector('.navigation-title');
  if (!navTitleEl) {
    L('✖ navigation-title not found');
    return;
  }

  const navText = navTitleEl.textContent.trim();
  const parts = navText.split(' ');
  const year = parseInt(parts[parts.length - 1], 10);
  const monthName = parts.slice(0, -1).join(' ');
  const monthIndex = new Date(monthName + ' 1, ' + year).getMonth();

  const combinedBlackout = [...defaultBlackoutDates];
  if (Array.isArray(extraDates)) combinedBlackout.push(...extraDates);

  L('Checking calendar:', navText, 'with blackout dates:', combinedBlackout);

  calEl.querySelectorAll('.days .day.cell').forEach(cell => {
    const txt = cell.textContent.trim();
    const dayNum = parseInt(txt, 10);
    if (isNaN(dayNum)) return;

    let offset = 0;
    if (cell.classList.contains('prev')) offset = -1;
    if (cell.classList.contains('next')) offset = +1;

    const dateObj = new Date(year, monthIndex + offset, dayNum);
    dateObj.setHours(0,0,0,0);
    const dateStr = formatYMD(dateObj);

    cell.classList.remove('blackout');
    cell.style.pointerEvents = '';
    cell.style.backgroundColor = '';
    cell.style.color = '';
    cell.title = '';

    if (combinedBlackout.includes(dateStr)) blackoutCell(cell, 'This date is unavailable');
    if (blockPast && dateObj < today) blackoutCell(cell, 'Past dates not allowed');
    if (blockFuture && dateObj > today) blackoutCell(cell, 'Future dates not allowed');
  });
}

function blackoutCell(cell, msg){
  cell.classList.add('blackout');
  cell.style.pointerEvents = 'none';
  cell.style.backgroundColor = '#eee';
  cell.style.color = '#888';
  cell.title = msg;
}

const style = document.createElement('style');
style.innerHTML = `
  .input-calendar .day.blackout {
    background-color:#eee !important;
    color:#888 !important;
  }
`;
document.head.appendChild(style);

// Export as module
export function applyBlackoutsToCalendar(inputName, extraDates = [], blockPast = false, blockFuture = false){
  waitForCalendar(inputName, extraDates, blockPast, blockFuture);
}