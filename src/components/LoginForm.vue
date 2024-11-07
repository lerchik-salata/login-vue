<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <InputField
        id="username"
        label="Username"
        placeholder="Enter your username"
        v-model="form.username"
        :error-message="errors.username"
        @input="handleInput('username')"
        required
    />
    <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        v-model="form.password"
        :error-message="errors.password"
        @input="handleInput('password')"
        required
    />
    <InputField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        v-model="form.confirmPassword"
        :error-message="confirmPasswordError"
        @input="handleInput('confirmPassword')"
        required
    />
    <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        v-model="form.email"
        :error-message="errors.email"
        @input="handleInput('email')"
        required
    />
    <InputField
        id="phone"
        label="Phone"
        type="tel"
        placeholder="Enter your phone number"
        v-model="form.phone"
        :error-message="errors.phone"
        @input="handleInput('phone')"
        required
    />
    <div class="gender-field">
      <label>Gender</label>
      <div>
        <input
            type="radio"
            id="male"
            value="male"
            v-model="form.gender"
        />
        <label for="male">Male</label>
      </div>
      <div>
        <input
            type="radio"
            id="female"
            value="female"
            v-model="form.gender"
        />
        <label for="female">Female</label>
      </div>
    </div>
    <button type="submit" class="login-btn">Log In</button>
  </form>
</template>

<script>
import InputField from './InputField.vue';
import validationMixin from '../mixins/validationMixin.js';

export default {
  name: 'LoginForm',
  components: {
    InputField,
  },
  mixins: [validationMixin],
  data() {
    return {
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        gender: '',
      },
      errors: {
        username: '',
        password: '',
        email: '',
        phone: '',
      },
      confirmPasswordError: '',
    };
  },
  methods: {
    handleSubmit() {
      this.validateForm();

      if (Object.values(this.errors).some(error => error) || this.confirmPasswordError) {
        return;
      }

      alert('Form submitted!');
      console.log(this.form);
    },
    handleInput(field) {
      const value = this.form[field];
      this.clearError(field);
      const error = this.validateField(field, value);

      if (field === 'confirmPassword') {
        this.confirmPasswordError = error;
      } else {
        if (error) {
          this.errors[field] = error;
        } else {
          this.clearError(field);
        }
      }
    },
    clearError(field) {
      if (this.isValidField(field)) {
        this.errors[field] = '';
      }
    },
    isValidField(field) {
      if (field === 'email') {
        return this.isValidEmail(this.form[field]);
      }
      return this.form[field] !== '';
    },
    validateForm() {
      Object.keys(this.form).forEach(field => {
        if (this.form[field]) {
          this.errors[field] = '';
        }
      });
    }
  },
};
</script>

<style scoped>
.login-form {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.login-btn:hover {
  background-color: #367c56;
}

.gender-field {
  margin-top: 1rem;
}

.gender-field label {
  font-weight: bold;
}

.gender-field div {
  margin-bottom: 0.5rem;
}
</style>
