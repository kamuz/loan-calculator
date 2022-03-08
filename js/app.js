// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
	e.preventDefault();

	// Hide results by click
	document.getElementById('results').style.display = 'none';

	// Show loader
	document.getElementById('loading').style.display = 'block';

	setTimeout(calculateResult, 1000);
});

// Calculate result
function calculateResult(){
	// UI Vars
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');
	const monthlyPayment = document.getElementById('monthly-payment');
	const totalPayment = document.getElementById('total-payment');
	const totalInterest = document.getElementById('total-interest');

	const principal = parseFloat(amount.value);
	const calculateInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	// Compute monthly payment
	const x = Math.pow(1 + calculateInterest, calculatedPayments);
	const monthly = (principal * x * calculateInterest) / (x-1);

	if(isFinite(monthly)){
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

		// Show results block
		document.getElementById('results').style.display = 'block';
		// Hide loader
		document.getElementById('loading').style.display = 'none';
	} else {
		// Show error message
		showErrorMessage('Please check your numbers');
		// Hide loader
		document.getElementById('loading').style.display = 'none';
	}

}

// Show error message
function showErrorMessage(message){
	// Get elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	// Create div
	const errorDiv = document.createElement('div');

	// Add class to div
	errorDiv.className = 'alert alert-danger';

	// Create text node and append to div
	errorDiv.appendChild(document.createTextNode(message));

	// Insert error above heading
	card.insertBefore(errorDiv, heading);

	// Clear error message after 3 seconds
	setTimeout(clearErrorMessage, 3000);
}

// Clear error message
function clearErrorMessage(){
	document.querySelector('.alert').remove();
}