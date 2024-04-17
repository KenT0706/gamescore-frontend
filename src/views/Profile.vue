<template>
  <div>
    <div class="">
      <!-- Sticky search header -->

      <main>
        <div class="divide-y divide-white/5">
          <div class="grid max-w-7xl grid-cols-1 mx-auto gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 class="text-base font-semibold leading-7 text-white">
                Personal Information
              </h2>
              <p class="mt-1 text-sm leading-6 text-gray-400">
                Use a permanent address where you can receive mail.
              </p>
            </div>

            <form class="md:col-span-2 pl-20">
              <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div class="col-span-full flex items-center gap-x-8">
                  <img :src="auth.avatar" alt="Preview"
                    class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover" />
                  <div>
                    <button type="button"
                      class="rounded-md relative bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
                      Change avatar
                      <input type="file" class="absolute left-0 top-0 w-full opacity-0 h-full" name=""
                        @change="handleImageUpload" id="" />
                    </button>
                    <p class="mt-2 text-xs leading-5 text-gray-400">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <label for="first-name" class="block text-sm font-medium leading-6 text-white">Name</label>
                  <div class="mt-2">
                    <input type="text" v-model="barObj.name" name="first-name" id="first-name" autocomplete="given-name"
                      class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm px-3 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div class="col-span-full">
                  <label for="email" class="block text-sm font-medium leading-6 text-white">Email address</label>
                  <div class="mt-2">
                    <input id="email" v-model="barObj.email" name="email" type="email" autocomplete="email"
                      class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset px-4 ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div class="col-span-full">
                  <label for="score" class="block text-sm font-medium leading-6 text-white">Score</label>
                  <div class="mt-2">
                    <input id="score" v-model="barObj.score" name="score" type="score" autocomplete="score"
                      class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset px-4 ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <!-- <div class="col-span-full">
                  <label for="timezone" class="block text-sm font-medium leading-6 text-white">Timezone</label>
                  <div class="mt-2">
                    <select id="timezone" name="timezone" v-model="barObj.timezone"
                      class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 [&_*]:text-black">
                      <option :selected="barObj.timezone == 'Pacific Standard Time'">
                        Pacific Standard Time
                      </option>
                      <option :selected="barObj.timezone == 'Eastern Standard Time'">
                        Eastern Standard Time
                      </option>
                      <option :selected="barObj.timezone == 'Greenwich Mean Time'">
                        Greenwich Mean Time
                      </option>
                    </select>
                  </div> -->
                <!-- </div> -->
              </div>

              <div class="mt-8 flex">
                <button type="submit" @click="updateProfile"
                  class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  Save
                </button>
              </div>
            </form>
          </div>

          <div class="grid max-w-7xl mx-auto grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 class="text-base font-semibold leading-7 text-white">
                Change password
              </h2>
              <p class="mt-1 text-sm leading-6 text-gray-400">
                Update your password associated with your account.
              </p>
            </div>

            <div class="md:col-span-2 pl-20">
              <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div class="col-span-full">
                  <label for="current-password" class="block text-sm font-medium leading-6 text-white">Current password</label>
                  <div class="mt-2">
                    <input v-model="updatedData.email" id="current-password" name="current_password" type="email"
                      autocomplete="current-password"
                      class="block w-full rounded-md border-0 px-2 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div class="col-span-full">
                  <label for="new-password" class="block text-sm font-medium leading-6 text-white">New password</label>
                  <div class="mt-2">
                    <input v-model="updatedData.password" id="new-password" name="new_password" type="password"
                      autocomplete="new-password"
                      class="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>

              <div class="mt-8 flex">
                <button @click="updateFunction"
                  class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  Save
                </button>
              </div>
            </div>
          </div>

          <div class="grid max-w-7xl grid-cols-1 gap-x-8 mx-auto gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 class="text-base font-semibold leading-7 text-white">
                Delete account
              </h2>
              <p class="mt-1 text-sm leading-6 text-gray-400">
                No longer want to use our service? You can delete your account
                here. This action is not reversible. All information related to
                this account will be deleted permanently.
              </p>
            </div>

            <div class="flex items-start md:col-span-2 pl-20">
              <button @click="openModal"
                class="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400">
                Yes, delete my account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
    <Modal :modal="modal" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import client from "../axios.config";
import { useAuthenticate } from "../store/Authenticate";
import Modal from "../components/Modal.vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const auth = useAuthenticate();
const modal = ref(false);

const openModal = () => {
  auth.setModal();
  console.log("====================================");
  console.log(auth.deleteModal);
  console.log("====================================");
};

const updatedData = ref({
  email: "", // Corrected property name to 'email'
  password: "", // Corrected property name to 'password'
});

const updateProfile = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `${token}`, // Corrected format for the Authorization header
    "Content-Type": "application/json",
  };
  console.log(barObj.value);

  const { name, email, score, password, timezone } = barObj.value; // Assuming updatedData is a ref object

  try {
    const response = await axios.put(
      `https://gamescore-api-prod-37cu4rqvoa-as.a.run.app/users/${auth.userId}`,
      {
        name: name,
        email: email,
        score: score,
        role: "user",
        timezone: timezone,
        password: password,
      },
      {
        headers: headers,
      }
    );
    toast("Profile Updated!", {
      autoClose: 1000,
    });

    // Handle the response as needed
    console.log(response.data); // If the API returns any data in the response
    try {
      const response = await client.get("/users/" + auth.userId);
      barObj.value = response;
      console.log(barObj.value);
    } catch (error) {
      console.error(error);
    }

    // Optionally, you can perform additional actions after the update is successful, like showing a success message or updating the UI.
  } catch (error) {
    console.error("Error updating user:", error.response.data);
  }
};

const updateFunction = async (e) => {
  e.preventDefault();
  toast("Password Changed!", {
    autoClose: 1000,
  });

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `${token}`, // Corrected format for the Authorization header
    "Content-Type": "application/json",
  };

  const { password } = updatedData.value; // Assuming updatedData is a ref object

  try {
    const response = await axios.put(
      `https://gamescore-api-prod-37cu4rqvoa-as.a.run.app/users/${auth.userId}`,
      {
        password: password,
      },
      {
        headers: headers,
      }
    );

    // Handle the response as needed
    console.log(response.data); // If the API returns any data in the response
    try {
      const response = await client.get("/users/" + auth.userId);
      barObj.value = response;
    } catch (error) {
      console.error(error);
    }

    // Optionally, you can perform additional actions after the update is successful, like showing a success message or updating the UI.
  } catch (error) {
    console.error("Error updating user:", error.response.data);
  }
};

// Your existing code for navigation, teams, secondaryNavigation, etc.

const barObj = ref({});

onMounted(async () => {
  try {
    const response = await client.get("/users/" + auth.userId);
    barObj.value = response;
    console.log(barObj.value);
  } catch (error) {
    console.error(error);
  }
});

const deleteHandle = () => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: token,
    "Content-Type": "application/json",
  };

  axios
    .delete(
      `https://gamescore-api-prod-37cu4rqvoa-as.a.run.app/users/${auth.userId}`,
      { headers }
    )
    .then((response) => {
      console.log("User deleted successfully:", response.data);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      // Set isLoggedIn to false and userId to null in the store
      auth.setLogin(false);
      auth.setId(null);
      auth.setAvatar(null);
      router.push({ name: "login" });
      // You can update your UI or perform any other actions after successful deletion
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      // Handle error cases here
    });
};
const uploadedImage = ref(null);

const handleImageUpload = (event) => {
  const file = event.target.files[0];

  if (file) {
    // Convert the selected file to a Data URL
    const reader = new FileReader();
    reader.onload = async () => {
      uploadedImage.value = reader.result;
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const response = await client.put(`/users/${auth.userId}/avatar`, formData);
        barObj.value = response;
        console.log(barObj.value);
      } catch (error) {
        console.error(error);
      }


      auth.setAvatar(barObj.value.avatar);
    };
    reader.readAsDataURL(file);
  }
};
</script>
