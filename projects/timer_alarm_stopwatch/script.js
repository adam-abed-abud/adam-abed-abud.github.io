// DOM Elements
// Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

// Stopwatch Elements
const stopwatchHours = document.getElementById('stopwatch-hours');
const stopwatchMinutes = document.getElementById('stopwatch-minutes');
const stopwatchSeconds = document.getElementById('stopwatch-seconds');
const stopwatchMilliseconds = document.getElementById('stopwatch-milliseconds');
const stopwatchStartBtn = document.getElementById('stopwatch-start');
const stopwatchPauseBtn = document.getElementById('stopwatch-pause');
const stopwatchResetBtn = document.getElementById('stopwatch-reset');
const stopwatchLapBtn = document.getElementById('stopwatch-lap');
const lapsList = document.getElementById('laps-list');

// Timer Elements
const timerHoursInput = document.getElementById('timer-hours');
const timerMinutesInput = document.getElementById('timer-minutes');
const timerSecondsInput = document.getElementById('timer-seconds');
const timerDisplayHours = document.getElementById('timer-display-hours');
const timerDisplayMinutes = document.getElementById('timer-display-minutes');
const timerDisplaySeconds = document.getElementById('timer-display-seconds');
const timerStartBtn = document.getElementById('timer-start');
const timerPauseBtn = document.getElementById('timer-pause');
const timerResetBtn = document.getElementById('timer-reset');
const timerProgress = document.getElementById('timer-progress');

// Alarm Elements
const alarmHoursInput = document.getElementById('alarm-hours');
const alarmMinutesInput = document.getElementById('alarm-minutes');
const alarmNameInput = document.getElementById('alarm-name');
const alarmSetBtn = document.getElementById('alarm-set');
const alarmsList = document.getElementById('alarms-list');
const alarmModal = document.getElementById('alarm-modal');
const alarmMessage = document.getElementById('alarm-message');
const stopAlarmBtn = document.getElementById('stop-alarm');

// Current Time Elements
const currentTimeDisplay = document.getElementById('current-time');
const currentDateDisplay = document.getElementById('current-date');
const currentTimeZoneDisplay = document.getElementById('current-timezone');

// Audio for alarm
const alarmSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
alarmSound.loop = true;

// Tab Functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all tabs
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked tab
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// ==================== STOPWATCH FUNCTIONALITY ====================
let stopwatchInterval;
let stopwatchRunning = false;
let stopwatchTime = 0;
let lapCount = 0;

// Format time for stopwatch display
function formatStopwatchTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    
    stopwatchHours.textContent = hours.toString().padStart(2, '0');
    stopwatchMinutes.textContent = minutes.toString().padStart(2, '0');
    stopwatchSeconds.textContent = seconds.toString().padStart(2, '0');
    stopwatchMilliseconds.textContent = milliseconds.toString().padStart(2, '0');
}

// Start stopwatch
stopwatchStartBtn.addEventListener('click', () => {
    if (!stopwatchRunning) {
        const startTime = Date.now() - stopwatchTime;
        stopwatchInterval = setInterval(() => {
            stopwatchTime = Date.now() - startTime;
            formatStopwatchTime(stopwatchTime);
        }, 10);
        
        stopwatchRunning = true;
        stopwatchStartBtn.disabled = true;
        stopwatchPauseBtn.disabled = false;
        stopwatchResetBtn.disabled = false;
        stopwatchLapBtn.disabled = false;
    }
});

// Pause stopwatch
stopwatchPauseBtn.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchStartBtn.disabled = false;
    stopwatchPauseBtn.disabled = true;
});

// Reset stopwatch
stopwatchResetBtn.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchTime = 0;
    formatStopwatchTime(stopwatchTime);
    
    stopwatchStartBtn.disabled = false;
    stopwatchPauseBtn.disabled = true;
    stopwatchResetBtn.disabled = true;
    stopwatchLapBtn.disabled = true;
    
    // Clear laps
    lapsList.innerHTML = '';
    lapCount = 0;
});

// Record lap
stopwatchLapBtn.addEventListener('click', () => {
    if (stopwatchRunning) {
        lapCount++;
        const lapItem = document.createElement('li');
        lapItem.classList.add('lap-item');
        
        const lapNumber = document.createElement('span');
        lapNumber.textContent = `Lap ${lapCount}`;
        
        const lapTime = document.createElement('span');
        lapTime.textContent = `${stopwatchHours.textContent}:${stopwatchMinutes.textContent}:${stopwatchSeconds.textContent}.${stopwatchMilliseconds.textContent}`;
        
        lapItem.appendChild(lapNumber);
        lapItem.appendChild(lapTime);
        
        lapsList.prepend(lapItem);
    }
});

// ==================== TIMER FUNCTIONALITY ====================
let timerInterval;
let timerRunning = false;
let timerPaused = false;
let timerTotalSeconds = 0;
let timerRemainingSeconds = 0;
let timerEndTime;

// Format time for timer display
function formatTimerDisplay(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    timerDisplayHours.textContent = hours.toString().padStart(2, '0');
    timerDisplayMinutes.textContent = minutes.toString().padStart(2, '0');
    timerDisplaySeconds.textContent = secs.toString().padStart(2, '0');
}

// Update timer progress bar
function updateTimerProgress() {
    const progressPercentage = ((timerTotalSeconds - timerRemainingSeconds) / timerTotalSeconds) * 100;
    timerProgress.style.width = `${progressPercentage}%`;
}

// Start timer
timerStartBtn.addEventListener('click', () => {
    if (!timerRunning) {
        // If timer is not paused, get values from inputs
        if (!timerPaused) {
            const hours = parseInt(timerHoursInput.value) || 0;
            const minutes = parseInt(timerMinutesInput.value) || 0;
            const seconds = parseInt(timerSecondsInput.value) || 0;
            
            timerTotalSeconds = hours * 3600 + minutes * 60 + seconds;
            timerRemainingSeconds = timerTotalSeconds;
            
            if (timerTotalSeconds <= 0) {
                alert('Please set a time greater than zero.');
                return;
            }
        }
        
        timerEndTime = Date.now() + (timerRemainingSeconds * 1000);
        
        timerInterval = setInterval(() => {
            const now = Date.now();
            timerRemainingSeconds = Math.max(0, Math.ceil((timerEndTime - now) / 1000));
            
            formatTimerDisplay(timerRemainingSeconds);
            updateTimerProgress();
            
            if (timerRemainingSeconds <= 0) {
                clearInterval(timerInterval);
                timerRunning = false;
                timerPaused = false;
                
                timerStartBtn.disabled = false;
                timerPauseBtn.disabled = true;
                timerResetBtn.disabled = false;
                
                // Play alarm sound
                alarmSound.play();
                
                // Show alarm modal
                alarmModal.classList.add('show');
                alarmMessage.textContent = 'Timer Complete!';
            }
        }, 100);
        
        timerRunning = true;
        timerStartBtn.disabled = true;
        timerPauseBtn.disabled = false;
        timerResetBtn.disabled = false;
    }
});

// Pause timer
timerPauseBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerRunning = false;
    timerPaused = true;
    timerStartBtn.disabled = false;
    timerPauseBtn.disabled = true;
});

// Reset timer
timerResetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerRunning = false;
    timerPaused = false;
    timerRemainingSeconds = 0;
    
    formatTimerDisplay(0);
    timerProgress.style.width = '0%';
    
    timerStartBtn.disabled = false;
    timerPauseBtn.disabled = true;
    timerResetBtn.disabled = true;
    
    timerHoursInput.value = 0;
    timerMinutesInput.value = 0;
    timerSecondsInput.value = 0;
});

// ==================== ALARM FUNCTIONALITY ====================
let alarms = [];
let activeAlarm = null;

// Format time for display (12-hour format)
function formatTimeForDisplay(hours, minutes) {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Set alarm
alarmSetBtn.addEventListener('click', () => {
    const hours = parseInt(alarmHoursInput.value) || 0;
    const minutes = parseInt(alarmMinutesInput.value) || 0;
    const name = alarmNameInput.value.trim() || 'Alarm';
    
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        alert('Please enter valid time values.');
        return;
    }
    
    const alarm = {
        id: Date.now(),
        hours,
        minutes,
        name,
        active: true
    };
    
    alarms.push(alarm);
    renderAlarms();
    
    // Reset inputs
    alarmHoursInput.value = 0;
    alarmMinutesInput.value = 0;
    alarmNameInput.value = '';
});

// Render alarms list
function renderAlarms() {
    alarmsList.innerHTML = '';
    
    if (alarms.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'No alarms set';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.padding = '10px';
        emptyMessage.style.color = '#636e72';
        alarmsList.appendChild(emptyMessage);
        return;
    }
    
    alarms.forEach(alarm => {
        const alarmItem = document.createElement('li');
        alarmItem.classList.add('alarm-item');
        
        const alarmInfo = document.createElement('div');
        
        const alarmTime = document.createElement('div');
        alarmTime.classList.add('alarm-time');
        alarmTime.textContent = formatTimeForDisplay(alarm.hours, alarm.minutes);
        
        const alarmName = document.createElement('div');
        alarmName.classList.add('alarm-name');
        alarmName.textContent = alarm.name;
        
        alarmInfo.appendChild(alarmTime);
        alarmInfo.appendChild(alarmName);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-alarm');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.addEventListener('click', () => {
            alarms = alarms.filter(a => a.id !== alarm.id);
            renderAlarms();
        });
        
        alarmItem.appendChild(alarmInfo);
        alarmItem.appendChild(deleteBtn);
        
        alarmsList.appendChild(alarmItem);
    });
}

// Check alarms
function checkAlarms() {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();
    
    // Only trigger alarm when seconds are 0 to avoid multiple triggers
    if (currentSeconds === 0) {
        alarms.forEach(alarm => {
            if (alarm.active && alarm.hours === currentHours && alarm.minutes === currentMinutes) {
                // Trigger alarm
                alarmSound.play();
                activeAlarm = alarm;
                
                // Show alarm modal
                alarmModal.classList.add('show');
                alarmMessage.textContent = `${alarm.name}`;
                
                // Deactivate this alarm
                alarm.active = false;
            }
        });
    }
}

// Stop alarm
stopAlarmBtn.addEventListener('click', () => {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    alarmModal.classList.remove('show');
    
    // Remove triggered alarm
    if (activeAlarm) {
        alarms = alarms.filter(a => a.id !== activeAlarm.id);
        activeAlarm = null;
        renderAlarms();
    }
});

// ==================== CURRENT TIME FUNCTIONALITY ====================
function updateCurrentTime() {
    const now = new Date();
    
    // Update time
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    currentTimeDisplay.textContent = timeString;
    
    // Update date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    currentDateDisplay.textContent = dateString;
    
    // Update time zone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (currentTimeZoneDisplay) {
        currentTimeZoneDisplay.textContent = timeZone;
    }
    
    // Check alarms
    checkAlarms();
}

// ==================== INITIALIZATION ====================
// Initialize the app
function init() {
    // Initialize stopwatch display
    formatStopwatchTime(0);
    
    // Initialize timer display
    formatTimerDisplay(0);
    
    // Initialize current time
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // Initialize alarms list
    renderAlarms();
    
    // Add input validation for number inputs
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', () => {
            const min = parseInt(input.getAttribute('min'));
            const max = parseInt(input.getAttribute('max'));
            let value = parseInt(input.value) || 0;
            
            if (value < min) value = min;
            if (value > max) value = max;
            
            input.value = value;
        });
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 