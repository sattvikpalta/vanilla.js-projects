// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Show loader as Calculate is clicked
  document.getElementById('loading').style.display = 'block';

  // Show for 1 sec or 1000ms
  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

// Calculate Results
function calculateResults(e) {
  // UI vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');


  const principal = parseFloat(amount.value);
  const calculateInterest = parseFloat(interest.value) / 100 / 12;
  const calculatePayments = parseFloat(years.value) * 12;

  // Compute monthly payments
  const x = Math.pow(1 + calculateInterest, calculatePayments);
  const monthly = (principal * x * calculateInterest) / (x - 1);

  // Check if monthly value is a finite number
  if (isFinite(monthly)) {
    // Numbers have a method toFixed to specify the number of decimal values
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatePayments).toFixed(2);
    totalInterest.value = ((monthly * calculatePayments) - principal).toFixed(2);

    // Show results
    document.getElementById('results').style.display = 'block';

    // Hide loader
    document.getElementById('loading').style.display = 'none';

  } else {
    showError('Please check your numbers');
  }
}

// Show Error
function showError(error) {
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Hide loader
  document.getElementById('loading').style.display = 'none';

  // Create a div
  const errorDiv = document.createElement('div');

  // Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 2 sec or 2000 ms
  setTimeout(clearError, 2000);
}

// Clear Error
function clearError() {
  document.querySelector('.alert').remove();
}