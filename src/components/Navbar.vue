<template>
  <Disclosure as="nav" class="bg-gray-800/0" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex flex-shrink-0 items-center">
            <router-link
              class="bg-primary px-4 py-1.5 text-white text-lg font-semibold rounded-sm tracking-wider"
              to="/"
            >
              BUFF
            </router-link>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                :class="[
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</router-link
              >
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div class="w-16">
            <router-link class="text-sm" v-if="isAdmin" to="/admin">Admin </router-link>
          </div>
          <button
            type="button"
            class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                v-if="auth.isLoggedIn"
                class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  :src="auth.avatar === null ? defualtImage : auth.avatar"
                  alt=""
                />
              </MenuButton>
              <MenuButton
                v-else-if="auth.isLoggedIn === false"
                class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" :src="defualtImage" alt="no" />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-if="auth.isLoggedIn" v-slot="{ active }">
                  <router-link
                    to="/profile"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Your Profile</router-link
                  >
                </MenuItem>
                <MenuItem v-if="auth.isLoggedIn" v-slot="{ active }">
                  <router-link
                    to="/settings"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Settings</router-link
                  >
                </MenuItem>
                <MenuItem v-if="auth.isLoggedIn" v-slot="{ active }">
                  <button
                    @click="signOut"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 w-full text-left text-sm text-gray-700',
                    ]"
                  >
                    Sign out
                  </button>
                </MenuItem>

                <!--  -->
                <MenuItem v-if="!auth.isLoggedIn" v-slot="{ active }">
                  <button
                    @click="signOut"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 w-full text-left text-sm text-gray-700',
                    ]"
                  >
                    Login
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :to="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</router-link
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useAuthenticate } from "../store/Authenticate";
import { useRouter } from "vue-router";
import { ref, computed, watch, onMounted } from "vue";

const defualtImage =
  "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";

const router = useRouter();

const currentRoute = ref(router.currentRoute.value);

const auth = useAuthenticate();

// Updated navigation array excluding the "Login" link if the user is logged in
const navigation = ref([
  { name: "Home", href: "/", current: true },
  { name: "Leadersboard", href: "/leadersboard", current: false },
  { name: "Profile", href: "/profile", current: false },
  // Exclude the "Login" link if the user is logged in
  ...(auth.isLoggedIn ? [] : [{ name: "Login", href: "/login", current: false }]),
]);

watch(
  () => router.currentRoute.value,
  (to, from) => {
    currentRoute.value = to;
    navigation.value = [
      { name: "Home", href: "/", current: currentRoute.value.fullPath === "/" },
      {
        name: "Leadersboard",
        href: "/leadersboard",
        current: currentRoute.value.fullPath === "/leadersboard",
      },
      {
        name: "Profile",
        href: "/profile",
        current: currentRoute.value.fullPath === "/profile",
      },
      {
        name: "Game Entries",
        href: "/game-entries",
        current: (currentRoute.value.fullPath === "/game-entries")||(currentRoute.value.fullPath === "/game-entries/create"),
      },
      // Exclude the "Login" link if the user is logged in
      ...(auth.isLoggedIn
        ? []
        : [
            {
              name: "Login",
              href: "/login",
              current: currentRoute.value.fullPath === "/login",
            },
          ]),
    ];
    console.log(currentRoute.value.fullPath, "in navbae");
  }
);

console.log(currentRoute.value.fullPath, "navbar");

const signOut = (e) => {
  e.preventDefault();
  router;

  // Set isLoggedIn to false and userId to null in the store
  auth.setLogin(false);
  auth.setId(null);
  auth.setIsAdmin(null);
  auth.setAvatar(null);

  // Remove the token and userId from local storage
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("isAdmin");
  isAdmin.value = false;
  localStorage.clear();
  router.push({ name: "login" });
};
const isAdmin = ref(localStorage.getItem("isAdmin") === "true");

onMounted(() => {
  isAdmin.value = localStorage.getItem("isAdmin") === "true";
});

//when login if user is admin then set isAdmin to true in localstorage
watch(
  () => auth.isLoggedIn,
  (to, from) => {
    if (to) {
      isAdmin.value = localStorage.getItem("isAdmin") === "true";
    }
  }
);
</script>
