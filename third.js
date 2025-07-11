document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('memberApplicationForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const dobInput = document.getElementById('dob');
    const whyJoinInput = document.getElementById('whyJoin');
    const agreeTermsInput = document.getElementById('agreeTerms');
    const formMessage = document.getElementById('formMessage');

    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const phoneNumberError = document.getElementById('phoneNumberError');
    const dobError = document.getElementById('dobError');
    const whyJoinError = document.getElementById('whyJoinError');
    const agreeTermsError = document.getElementById('agreeTermsError');

    // Function to show error message
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
        element.closest('.form-group').classList.add('invalid');
    }

    // Function to hide error message
    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
        element.closest('.form-group').classList.remove('invalid');
    }

    // Validation functions
    function validateFullName() {
        if (fullNameInput.value.trim() === '') {
            showError(fullNameError, 'Full Name is required.');
            return false;
        } else {
            hideError(fullNameError);
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError(emailError, 'Email Address is required.');
            return false;
        } else if (!emailPattern.test(email)) {
            showError(emailError, 'Please enter a valid email address.');
            return false;
        } else {
            hideError(emailError);
            return true;
        }
    }

    function validatePhoneNumber() {
        const phoneNumber = phoneNumberInput.value.trim();
        // Simple regex for phone number (can be made more robust)
        const phonePattern = /^\d{10}$/; // Assumes 10 digits for Indian numbers
        if (phoneNumber !== '' && !phonePattern.test(phoneNumber)) {
            showError(phoneNumberError, 'Please enter a valid 10-digit phone number.');
            return false;
        } else {
            hideError(phoneNumberError);
            return true;
        }
    }

    function validateDob() {
        if (dobInput.value.trim() === '') {
            showError(dobError, 'Date of Birth is required.');
            return false;
        } else {
            hideError(dobError);
            return true;
        }
    }

    function validateWhyJoin() {
        if (whyJoinInput.value.trim() === '') {
            showError(whyJoinError, 'This field is required.');
            return false;
        } else {
            hideError(whyJoinError);
            return true;
        }
    }

    function validateAgreeTerms() {
        if (!agreeTermsInput.checked) {
            showError(agreeTermsError, 'You must agree to the Terms and Conditions.');
            return false;
        } else {
            hideError(agreeTermsError);
            return true;
        }
    }

    // Add event listeners for real-time validation
    fullNameInput.addEventListener('blur', validateFullName);
    emailInput.addEventListener('blur', validateEmail);
    phoneNumberInput.addEventListener('blur', validatePhoneNumber);
    dobInput.addEventListener('blur', validateDob);
    whyJoinInput.addEventListener('blur', validateWhyJoin);
    agreeTermsInput.addEventListener('change', validateAgreeTerms);


    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Run all validations
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPhoneNumberValid = validatePhoneNumber();
        const isDobValid = validateDob();
        const isWhyJoinValid = validateWhyJoin();
        const isAgreeTermsValid = validateAgreeTerms();

        // Check if all fields are valid
        if (isFullNameValid && isEmailValid && isPhoneNumberValid && isDobValid && isWhyJoinValid && isAgreeTermsValid) {
            // Form is valid, you can now process the data
            // In a real application, you would send this data to a server using fetch() or XMLHttpRequest

            const formData = {
                fullName: fullNameInput.value.trim(),
                email: emailInput.value.trim(),
                phoneNumber: phoneNumberInput.value.trim(),
                dob: dobInput.value.trim(),
                occupation: document.getElementById('occupation').value.trim(),
                whyJoin: whyJoinInput.value.trim(),
                hearAbout: document.getElementById('hearAbout').value
            };

            console.log('Form Data:', formData); // Log data to console for now

            // Simulate a successful submission
            formMessage.classList.remove('error');
            formMessage.classList.add('success');
            formMessage.textContent = 'Application submitted successfully! We will get back to you shortly.';
            formMessage.style.display = 'block';

            form.reset(); // Clear the form
            // Hide all error messages after successful submission
            [fullNameError, emailError, phoneNumberError, dobError, whyJoinError, agreeTermsError].forEach(hideError);

            // In a real scenario, you'd send this data to a backend:
            /*
            fetch('/api/apply-member', { // Replace with your actual API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formMessage.classList.remove('error');
                    formMessage.classList.add('success');
                    formMessage.textContent = 'Application submitted successfully! We will get back to you shortly.';
                    formMessage.style.display = 'block';
                    form.reset(); // Clear the form
                    // Hide all error messages after successful submission
                    [fullNameError, emailError, phoneNumberError, dobError, whyJoinError, agreeTermsError].forEach(hideError);
                } else {
                    formMessage.classList.remove('success');
                    formMessage.classList.add('error');
                    formMessage.textContent = 'Submission failed: ' + (data.message || 'Please try again.');
                    formMessage.style.display = 'block';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
                formMessage.textContent = 'An error occurred during submission. Please try again later.';
                formMessage.style.display = 'block';
            });
            */

        } else {
            // Form has errors
            formMessage.classList.remove('success');
            formMessage.classList.add('error');
            formMessage.textContent = 'Please correct the errors in the form.';
            formMessage.style.display = 'block';
        }
    });
});