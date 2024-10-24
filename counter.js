// Keys to store data in localStorage
const COUNTER_KEY = 'daysWithoutComplaints';
const LAST_UPDATED_KEY = 'lastUpdatedDate';

// Get the counter element from the DOM
const counterElement = document.getElementById('counter');

// Initialize counter based on stored data
function initializeCounter() {
    const storedDays = localStorage.getItem(COUNTER_KEY);
    const lastUpdated = localStorage.getItem(LAST_UPDATED_KEY);

    // Get today's date
    const today = new Date().setHours(0, 0, 0, 0);

    if (storedDays && lastUpdated) {
        // Check if the counter needs to be incremented (if a day has passed)
        const lastUpdatedDate = new Date(lastUpdated).setHours(0, 0, 0, 0);
        const dayDifference = Math.floor((today - lastUpdatedDate) / (1000 * 60 * 60 * 24));

        // Increment the counter if the day difference is positive
        if (dayDifference > 0) {
            const updatedDays = parseInt(storedDays, 10) + dayDifference;
            updateCounter(updatedDays);
        } else {
            // Display the stored counter value
            counterElement.innerText = storedDays;
        }
    } else {
        // If no data, initialize to 0
        updateCounter(0);
    }
}

// Function to update the counter in the DOM and localStorage
function updateCounter(days) {
    counterElement.innerText = days;
    localStorage.setItem(COUNTER_KEY, days);
    localStorage.setItem(LAST_UPDATED_KEY, new Date());
}

// Function to reset the counter to 0
function resetCounter() {
    updateCounter(0);
}

// Function to open the manual set modal
function manuallySetCounter() {
    const modal = document.getElementById('setCounterModal');
    modal.style.display = 'block';
}

// Function to apply the manually set number of days
function applyManualCounter() {
    const daysInput = document.getElementById('manualDays').value;
    if (daysInput) {
        const days = parseInt(daysInput, 10);
        updateCounter(days);
        closeModal();
    }
}

// Function to close the manual set modal
function closeModal() {
    const modal = document.getElementById('setCounterModal');
    modal.style.display = 'none';
}

// Automatically initialize the counter on page load
initializeCounter();
