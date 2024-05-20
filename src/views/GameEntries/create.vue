<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="mt-6 text-center text-2xl font-normal text-white leading-9 tracking-tight"
      >
        Create <span class="text-primary">Game Entry</span>
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white/10 px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <div class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-normal leading-6 text-white"
              >Game Title</label
            >
            <div class="mt-2">
              <input
                id="title"
                v-model="formData.title"
                name="title"
                type="text"
                autocomplete="title"
                placeholder="e.g. GTA V"
                required
                class="block w-full rounded-md py-1.5 text-white px-3 shadow-sm bg-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                :class="{
                  'border-red-500 border': !validateTitle,
                  'border-0': validateTitle,
                }"
              />
            </div>
            <div v-if="errors.title" class="mt-1 text-red-500 text-sm">
              {{ errors.title }}
            </div>
          </div>
          <div>
            <label for="platform" class="block text-sm font-normal leading-6 text-white"
              >Platform</label
            >
            <div class="mt-2">
              <input
                id="platform"
                placeholder="e.g. Playstation 5, PC, etc"
                v-model="formData.platform"
                name="platform"
                type="text"
                autocomplete="platform"
                required
                class="block w-full rounded-md py-1.5 text-white px-3 shadow-sm bg-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                :class="{
                  'border-red-500 border': !validatePlatform,
                  'border-0': validatePlatform,
                }"
              />
            </div>
            <div v-if="errors.platform" class="mt-1 text-red-500 text-sm">
              {{ errors.platform }}
            </div>
          </div>
          <div>
            <label for="genre" class="block text-sm font-normal leading-6 text-white"
              >Genre</label
            >
            <div class="mt-2">
              <input
                id="genre"
                placeholder="e.g. Action-Adventure"
                v-model="formData.genre"
                name="genre"
                type="text"
                autocomplete="genre"
                required
                class="block w-full rounded-md py-1.5 text-white px-3 shadow-sm bg-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                :class="{
                  'border-red-500 border': !validateGenre,
                  'border-0': validateGenre,
                }"
              />
            </div>
            <div v-if="errors.genre" class="mt-1 text-red-500 text-sm">
              {{ errors.genre }}
            </div>
          </div>
          <div>
            <label
              for="release_date"
              class="block text-sm font-normal leading-6 text-white"
              >Release Date</label
            >
            <div class="mt-2">
              <input
                id="release_date"
                v-model="formData.release_date"
                name="release_date"
                type="date"
                autocomplete="release_date"
                required
                class="block w-full rounded-md py-1.5 text-white px-3 shadow-sm bg-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                :class="{
                  'border-red-500 border': !validateRelease_Date,
                  'border-0': validateRelease_Date,
                }"
              />
            </div>
            <div v-if="errors.release_date" class="mt-1 text-red-500 text-sm">
              {{ errors.release_date }}
            </div>
          </div>
          <div>
            <label
              for="additional_note"
              class="block text-sm font-normal leading-6 text-white"
              >Additional Note</label
            >
            <div class="mt-2">
              <textarea
                id="additional_note"
                v-model="formData.additional_note"
                name="additional_note"
                autocomplete="additional_note"
                placeholder="Anything you want to share about the game."
                required
                class="block w-full rounded-md py-1.5 text-white px-3 shadow-sm bg-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                :class="{
                  'border-red-500 border': !validateAdditional_Note,
                  'border-0': validateAdditional_Note,
                }"
              ></textarea>
            </div>
            <div v-if="errors.additional_note" class="mt-1 text-red-500 text-sm">
              {{ errors.additional_note }}
            </div>
          </div>
          <div>
            <label for="tags" class="block text-sm font-normal leading-6 text-white"
              >Tags</label
            >
            <div class="mt-2">
              <input
                id="tags"
                v-model="formData.tags"
                name="tags"
                type="tags"
                autocomplete="tags"
                placeholder="e.g. GTA, Driving, etc (Comma seperated)"
                required
                class="block w-full rounded-md py-1.5 text-white px-3 shadow-sm bg-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                :class="{
                  'border-red-500 border': !validateTags,
                  'border-0': validateTags,
                }"
              />
            </div>
            <div v-if="errors.tags" class="mt-1 text-red-500 text-sm">
              {{ errors.tags }}
            </div>
          </div>
          <div>
            <div class="flex justify-between">
              <label for="progress" class="block text-sm font-normal leading-6 text-white"
                >Progress</label
              >
              <span class="text-white mt-2">{{ formData.progress }}%</span>
            </div>
            <div class="mt-2">
              <input
                id="progress"
                v-model="formData.progress"
                name="progress"
                type="range"
                step="1"
                min="0"
                max="100"
                required
                class="block w-full rounded-md py-1.5 text-white shadow-sm bg-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div v-if="errors.progress" class="mt-1 text-red-500 text-sm">
              {{ errors.progress }}
            </div>
      
          </div>
          <div class="flex items-center gap-4">
            <button
              type="submit"
              @click="submitForm"
              :disabled="loading.value"
              class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import client from "../../axios.config";
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";

import { useAuthenticate } from "../../store/Authenticate";
const formData = ref({
  title: null,
  platform: null,
  genre: null,
  release_date: null,
  progress: 0,
  additional_note: null,
  tags: null,
});

const errors = ref({
  title: null,
  platform: null,
  genre: null,
  release_date: null,
  progress: null,
  additional_note: null,
  tags: null,
});

// const myError = ref(false);

const auth = useAuthenticate();
const loading = ref(false);

const router = useRouter(); // Assign the router instance

const submitForm = async () => {
  loading.value = true;
  if (validateForm()) {
    // Perform form submission logic here

    try {
      const response = await client.post("/games", formData.value);
      console.log(response);

      router.push("/game-entries");
    } catch (error) {
      // myError.value = true;
      console.log(error.value);
      console.log(error);
      // Handle login error
    }
  }
  loading.value = false;
};

const validateForm = () => {
  return (
    validateTitle &&
    validatePlatform &&
    validateGenre &&
    validateRelease_Date &&
    validateAdditional_Note &&
    validateTags
  );
};

const validateTitle = computed(() => {
  if (formData.value.title == "") {
    errors.value.title = "Title is required.";
    return false;
  }
  errors.value.title = "";
  return true;
});
const validatePlatform = computed(() => {
  if (formData.value.platform == "") {
    errors.value.platform = "Platform is required.";
    return false;
  }
  errors.value.platform = "";
  return true;
});
const validateGenre = computed(() => {
  if (formData.value.genre == "") {
    errors.value.genre = "Genre is required.";
    return false;
  }
  errors.value.genre = "";
  return true;
});
const validateRelease_Date = computed(() => {
  if (formData.value.release_date == "") {
    errors.value.release_date = "Release Date is required.";
    return false;
  }
  errors.value.release_date = "";
  return true;
});

const validateAdditional_Note = computed(() => {
  return true;
});
const validateTags = computed(() => {
  if (formData.value.tags == "") {
    errors.value.tags = "Tag(s) is required.";
    return false;
  }
  errors.value.tags = "";
  return true;
});
</script>
