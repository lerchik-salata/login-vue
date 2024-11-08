export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                phone: ''
            },
            usernameError: '',
            passwordError: '',
            confirmPasswordError: '',
            emailError: '',
            phoneError: ''
        };
    },
    methods: {
        isValidEmail(email) {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailPattern.test(email);
        },
        isValidPhone(phone) {
            const phonePattern = /^\+?380[-(]?\d{2}[-)]?\d{3}-\d{2}-\d{2}$/;
            return phonePattern.test(phone);
        },
        validateField(field, value) {
            let error = '';

            switch (field) {
                case 'username':
                    if (!value) {
                        error = 'Username is required';
                    }
                    this.usernameError = error;
                    break;
                case 'password':
                    if (!value) {
                        error = 'Password is required';
                    }
                    this.passwordError = error;
                    break;
                case 'confirmPassword':
                    if (value !== this.form.password) {
                        error = 'Passwords do not match';
                    }
                    this.confirmPasswordError = error;
                    break;
                case 'email':
                    if (!this.isValidEmail(value)) {
                        error = 'Enter a valid email address';
                    }
                    this.emailError = error;
                    break;
                case 'phone':
                    if (!this.isValidPhone(value)) {
                        error = 'Enter a valid phone number';
                    }
                    this.phoneError = error;
                    break;
                default:
                    error = 'Invalid field';
                    break;
            }
        },
        clearError(field) {
            this[`${field}Error`] = '';
        },
        handleSubmit() {
            this.validateField('username', this.form.username);
            this.validateField('password', this.form.password);
            this.validateField('confirmPassword', this.form.confirmPassword);
            this.validateField('email', this.form.email);
            this.validateField('phone', this.form.phone);

            if (!this.usernameError && !this.passwordError && !this.confirmPasswordError && !this.emailError && !this.phoneError) {
                console.log('Form submitted', this.form);
            } else {
                console.log('Please fix the errors.');
            }
        }
    }
};