// Clock hand directions
const H = { h: 0, m: 180 };
const V = { h: 270, m: 90 };
const TL = { h: 180, m: 270 };
const TR = { h: 0, m: 270 };
const BL = { h: 180, m: 90 };
const BR = { h: 0, m: 90 };
const X = { h: 135, m: 135 }; // diagonal for inactive
const configs = { H, V, TL, TR, BL, BR, X, '': X };

// Double-thick 6x4 digit map
const digitMap = {
  0: [
    ['BR','H','H','BL'],
    ['V','BR','BL','V'],
    ['V','V','V','V'],
    ['V','V','V','V'],
    ['V','TR','TL','V'],
    ['TR','H','H','TL']
  ],
  1: [
    ['BR','H','BL','X'],
    ['TR','BL','V','X'],
    ['X','V','V','X'],
    ['X','V','V','X'],
    ['BR','TL','TR','BL'],
    ['TR','H','H','TL']
  ],
  2: [
    ['BR','H','H','BL'],
    ['TR','H','BL','V'],
    ['BR','H','TL','V'],
    ['V','BR','H','TL'],
    ['V','TR','H','BL'],
    ['TR','H','H','TL']
  ],
  3: [
    ['BR','H','H','BL'],
    ['TR','H','BL','V'],
    ['X','BR','TL','V'],
    ['X','TR','BL','V'],
    ['BR','H','TL','V'],
    ['TR','H','H','TL']
  ],
  4: [
    ['BR','BL','BR','BL'],
    ['V','V','V','V'],
    ['V','TR','TL','V'],
    ['TR','H','BL','V'],
    ['X','X','V','V'],
    ['X','X','TR','TL']
  ],
  5: [
    ['BR','H','H','BL'],
    ['V','BR','H','TL'],
    ['V','TR','H','BL'],
    ['TR','H','BL','V'],
    ['BR','H','TL','V'],
    ['TR','H','H','TL']
  ],
  6: [
    ['BR','H','H','BL'],
    ['V','BR','H','TL'],
    ['V','TR','H','BL'],
    ['V','BR','BL','V'],
    ['V','TR','TL','V'],
    ['TR','H','H','TL']
  ],
  7: [
    ['BR','H','H','BL'],
    ['TR','H','BL','V'],
    ['X','X','V','V'],
    ['X','X','V','V'],
    ['X','X','V','V'],
    ['X','X','TR','TL']
  ],
  8: [
    ['BR','H','H','BL'],
    ['V','BR','BL','V'],
    ['V','TR','TL','V'],
    ['V','BR','BL','V'],
    ['V','TR','TL','V'],
    ['TR','H','H','TL']
  ],
  9: [
    ['BR','H','H','BL'],
    ['V','BR','BL','V'],
    ['V','TR','TL','V'],
    ['TR','H','BL','V'],
    ['BR','H','TL','V'],
    ['TR','H','H','TL']
  ]
};

function createClockCell(type) {
  const clock = document.createElement('div');
  clock.className = 'clock';
  if (!type) clock.classList.add('inactive');
  const hour = document.createElement('div');
  hour.className = 'hour';
  const minute = document.createElement('div');
  minute.className = 'minute';
  clock.appendChild(hour);
  clock.appendChild(minute);
  setRotation(clock, type);
  return clock;
}

function setRotation(clock, type) {
  const conf = configs[type] || configs[''];
  clock.querySelector('.hour').style.transform = `rotate(${conf.h}deg)`;
  clock.querySelector('.minute').style.transform = `rotate(${conf.m}deg)`;
}

function createDigit(char) {
  const map = digitMap[char];
  const digitDiv = document.createElement('div');
  digitDiv.className = 'digit';
  map.forEach(row => {
    row.forEach(cell => {
      digitDiv.appendChild(createClockCell(cell));
    });
  });
  return digitDiv;
}

const container = document.getElementById('digit');

function renderTime() {
  const timeStr = new Date().toLocaleTimeString('en-GB', { hour12: false });
  const parts = timeStr.split(':');
  container.innerHTML = '';

  parts.forEach((part, i) => {
    part.split('').forEach(num => container.appendChild(createDigit(num)));
    if (i < parts.length - 1) {
      const colon = document.createElement('div');
      colon.className = 'colon-text';
      colon.textContent = ':';
      container.appendChild(colon);
    }
  });
}

setInterval(renderTime, 1000);
renderTime();

  function updateDate() {
  const now = new Date();
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  document.getElementById('date').textContent = now.toLocaleDateString(undefined, options);
}

// Update immediately when the page loads
updateDate();

// Refresh every minute (60000 milliseconds)
setInterval(updateDate, 60000);

// Clear the search input after submitting the form
document.getElementById('myForm').addEventListener('submit', function (event) {
  // Allow the form to submit normally first
  setTimeout(() => {
    this.reset(); // Clears the input field after submission
  }, 100); // small delay so it doesn’t cancel the submission
});

