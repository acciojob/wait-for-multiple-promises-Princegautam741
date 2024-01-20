// script.js

// Function to create a Promise that resolves after a random time between min and max seconds
function createPromise(min, max) {
  const randomTime = Math.floor(Math.random() * (max - min + 1)) + min;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(randomTime);
    }, randomTime * 1000);
  });
}

// Function to add a row to the table
function addRow(name, time) {
  const tbody = document.getElementById('output');
  const row = document.createElement('tr');
  const nameColumn = document.createElement('td');
  const timeColumn = document.createElement('td');

  nameColumn.textContent = name;
  timeColumn.textContent = time.toFixed(3); // Display time with three decimal places

  row.appendChild(nameColumn);
  row.appendChild(timeColumn);
  tbody.appendChild(row);
}

// Array to store promises
const promises = [
  createPromise(1, 3),
  createPromise(1, 3),
  createPromise(1, 3),
];

// Display 'Loading...' in the table
addRow('Loading...', '');

// Wait for all promises to resolve using Promise.all
Promise.all(promises)
  .then((results) => {
    // Remove the 'Loading...' row
    document.getElementById('output').innerHTML = '';

    // Display results in the table
    results.forEach((time, index) => {
      addRow(`Promise ${index + 1}`, time);
    });

    // Calculate and display total time
    const totalTime = results.reduce((total, time) => total + time, 0);
    addRow('Total', totalTime);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
