// Luhn algorithm for card number validation
export const luhnCheck = (cardNumber: string): boolean => {
	const digits = cardNumber.replace(/\D/g, '');
	if (digits.length < 13 || digits.length > 19) return false;

	let sum = 0;
	let isEven = false;

	for (let i = digits.length - 1; i >= 0; i--) {
		let digit = parseInt(digits[i], 10);

		if (isEven) {
			digit *= 2;
			if (digit > 9) {
				digit -= 9;
			}
		}

		sum += digit;
		isEven = !isEven;
	}

	return sum % 10 === 0;
};

// Validate expiration date format and not expired
export const validateExpirationDate = (date: string): boolean => {
	const dateRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
	if (!dateRegex.test(date)) return false;

	const [month, year] = date.split('/');
	const expMonth = parseInt(month, 10);
	const expYear = 2000 + parseInt(year, 10);

	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth() + 1;

	if (expYear < currentYear) return false;
	if (expYear === currentYear && expMonth < currentMonth) return false;

	return true;
};

