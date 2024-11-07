<template>
  <div class="input-field">
    <label :for="id">{{ label }}</label>
    <input
        :type="type"
        :id="id"
        v-model="inputValue"
        :placeholder="placeholder"
        @input="handleInput"
        required
        ref="inputField"
    />
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import Inputmask from 'inputmask';

export default {
  name: 'InputField',
  props: {
    label: String,
    id: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
    errorMessage: String,
    clearError: Function,
  },
  data() {
    return {
      inputValue: '',
    };
  },
  watch: {
    type(newValue) {
      if (newValue === 'tel') {
        this.applyPhoneMask();
      }
    }
  },
  mounted() {
    if (this.type === 'tel') {
      this.applyPhoneMask();
    }
  },
  methods: {
    applyPhoneMask() {
      const inputElement = this.$refs.inputField;
      const im = new Inputmask("+380(99)-999-99-99");
      im.mask(inputElement);
    },
    handleInput() {
      if (this.clearError) {
        this.clearError(this.id);
      }
      this.$emit('input', this.inputValue);
    },
  },
};
</script>

<style scoped>
.input-field {
  margin-bottom: 1rem;
  text-align: left;
}

.input-field label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.input-field input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
</style>
