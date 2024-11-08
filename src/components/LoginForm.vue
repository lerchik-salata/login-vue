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
        :error-message="errors.confirmPassword"
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

    <button type="submit" class="login-btn">Register</button>

    <Table :entries="entries" @delete-selected="deleteSelectedEntries" />
  </form>
</template>

<script>
import InputField from './InputField.vue';
import Table from '@/table/table.vue';
import validationMixin from '../mixins/validationMixin.js';

export default {
  name: 'LoginForm',
  components: {
    InputField,
    Table,
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
        confirmPassword: '',
        email: '',
        phone: '',
      },
      entries: [],
    };
  },
  methods: {
    handleSubmit() {
      this.validateForm();

      if (Object.values(this.errors).some(error => error)) {
        return;
      }

      this.entries.push({
        ...this.form,
        selected: false,
      });

      this.resetForm();
    },
    handleInput(field) {
      const value = this.form[field];
      this.clearError(field);
      const error = this.validateField(field, value);

      if (field === 'confirmPassword') {
        this.errors.confirmPassword = error;
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
        if (!this.form[field] && field !== 'confirmPassword') {
          this.errors[field] = `${field} is required`;
        }
      });
    },
    resetForm() {
      this.form = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        gender: '',
      };
    },
    deleteSelectedEntries() {
      this.entries = this.entries.filter(entry => !entry.selected);
    },
  },
};
</script>
