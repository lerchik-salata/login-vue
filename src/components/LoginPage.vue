<template>
  <div class="login-page">
    <h1>Welcome Back!</h1>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
  text-align: center;
}

.logo {
  width: 150px;
  margin-bottom: 2rem;
}

h1 {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
}
</style>
