<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-2xl font-normal text-white leading-9 tracking-tight">
        BUFF <span class="text-primary">LOGIN</span>
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white/10 px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <div class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-normal leading-6 text-white">Email</label>
            <div class="mt-2">
              <input id="email" v-model="formData.email" @input="onInputChange" name="email" type="email"
                autocomplete="email" required
                class="block w-full rounded-md border-0 py-1.5 text-white px-3 shadow-sm bg-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                :class="{ 'border-red-500': isInvalidEmail }" />
            </div>
            <div v-if="isInvalidEmail" class="mt-1 text-red-500 text-sm">
              Please enter a valid email address.
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-normal leading-6 text-white">Password</label>
            <div class="mt-2">
              <input id="password" v-model="formData.password" @input="onInputChange" name="password" type="password"
                autocomplete="current-password" required
                class="block w-full rounded-md border-0 py-1.5 text-white px-3 bg-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                :class="{ 'border-red-500': isInvalidPassword }" />
            </div>
            <div v-if="isInvalidPassword" class="mt-1 text-red-500 text-sm">
              Please enter a valid password.
            </div>
          </div>
          <!-- <div>
            <label for="score" class="block text-sm font-normal leading-6 text-white">Score</label>
            <div class="mt-2">
              <input id="score" v-model="formData.score" @input="onInputChange" name="score" type="score"
                autocomplete="current-score" required
                class="block w-full rounded-md border-0 py-1.5 text-white px-3 bg-gray-900 shadow-sm ring-inset   placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div> -->
          <p class="text-red-500 text-sm">
            {{ myError ? "Email or Password is not right try again" : "" }}
          </p>

          <div class="flex items-center justify-between">
            <div class="text-sm leading-6">
              <a href="#" class="font-normal text-white hover:text-white">Forgot password?</a>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <router-link type="submit" to="/register"
              class="flex w-full justify-center rounded-md bg-transparent px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              Register
            </router-link>

            <button type="submit" @click="onLogin" :disabled="isFormInvalid"
              class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              Login
            </button>
          </div>
        </div>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        <a href="#" class="font-light leading-6 text-white hover:text-white">
          Login Issues</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import client from "../axios.config";
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";

import { useAuthenticate } from "../store/Authenticate";
const formData = ref({
  name: "kali",
  email: "",
  password: "",
  role: "user",
});

const myError = ref(false);

if (myError.value) {
  setTimeout(() => {
    myError.value = false;
  }, 2000);
}

const auth = useAuthenticate();
const token = ref(localStorage.getItem("token") || "");

const onInputChange = () => {
  myError.value = false;
  validateForm();
};
const router = useRouter(); // Assign the router instance

const onRegister = async (e) => {
  e.preventDefault();
  if (!isFormInvalid.value) {
    try {
      const response = await client.post("/auth/register", formData.value);
      const tokenValue = response.accessToken;
      localStorage.setItem("token", tokenValue);
      token.value = tokenValue;

      // Display alert upon successful registration
      window.alert("Registration successful!");
    } catch (error) {
      console.log(error);
    }
  }
};

const onLogin = async () => {
  if (!isFormInvalid.value) {
    // Perform form submission logic here
    console.log("Form submitted:", {
      name: formData.value.name,
      password: formData.value.password,
    });

    try {
      const response = await client.post("/auth/login", {
        email: formData.value.email,
        password: formData.value.password,
      });
      console.log(response);
      const data = client.get("/users");
      console.log(data);

      const tokenValue = response.accessToken;
      const userId = response.user.id;
      localStorage.setItem("token", tokenValue);
      localStorage.setItem("userId", userId);
      token.value = tokenValue;
      console.log(response.user.avatar, "here goes");
      auth.setId(response.user.id);
      auth.setIsAdmin(response.user.role == "admin");
      auth.setLogin(true);
      if (response.user.avatar != null)
        auth.setAvatar(response.user.avatar);

      // console.log(response.user)

      router.push({ name: "home" });
    } catch (error) {
      myError.value = true;
      console.log(error.value);
      console.log(error);
      // Handle login error
    }
  }
};

const validateForm = () => {
  isInvalidEmail.value = !isValidEmail(formData.value.email);
  isInvalidPassword.value = !isValidPassword(formData.value.password);
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  // Add your password validation logic here, e.g., check minimum length, special characters, etc.
  return password.length >= 8;
};

const isInvalidEmail = ref(false);
const isInvalidPassword = ref(false);

const isFormInvalid = computed(
  () => isInvalidEmail.value || isInvalidPassword.value
);
</script>
