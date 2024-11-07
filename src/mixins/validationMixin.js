export default {
    methods: {
        validateField(field, value) {
            let error = '';

            switch (field) {
                case 'username':
                    if (!value) {
                        error = 'Username is required';
                    }
                    break;
                case 'password':
                    if (!value) {
                        error = 'Password is required';
                    }
                    break;
                case 'confirmPassword':
                    if (value !== this.form.password) {
                        error = 'Passwords do not match';
                    }
                    break;
                case 'email':
                    if (!this.isValidEmail(value)) {
                        error = 'Enter a valid email address';
                    }
                    break;
                case 'phone':
                    if (!this.isValidPhone(value)) {
                        error = 'Enter a valid phone number';
                    }
                    break;
                default:
                    break;
            }

            return error;
        },
        isValidEmail(email) {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(email);
        },
        isValidPhone(phone) {
            const phonePattern = /^\+380\(\d{2}\)-\d{3}-\d{2}-\d{2}$/;
            return phonePattern.test(phone);
        },
    },
};
