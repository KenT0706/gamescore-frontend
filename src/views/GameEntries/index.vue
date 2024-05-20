<template>
  <div class="bg-gray-900 py-10 my-16 max-w-7xl mx-auto">
    <div class="flex justify-between">
      <h2
        class="px-4 text-3xl font-normal leading-7 text-white sm:px-6 lg:px-8 self-center"
      >
        Game Entries
        <!-- <pre>{{ barObj }}</pre> -->
      </h2>
      <router-link
        to="/game-entries/create"
        class="rounded-lg px-5 py-3 bg-orange-500 hover:bg-orange-400 mx-4 text-white font-bold"
        >Add new</router-link
      >
    </div>
    <div class="overflow-scroll">
      <table class="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col class="sm:w-2/12" />
          <col class="lg:w-4/12" />
          <col class="lg:w-2/12" />
          <col class="lg:w-1/12" />
          <col class="lg:w-1/12" />
        </colgroup>
        <thead class="border-b border-white/10 text-sm leading-6 text-white">
          <tr>
            <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">ID</th>
            <th scope="col" class="py-2 pl-0 pr-8 font-semibold">Title</th>
            <th
              scope="col"
              class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
            >
              Platform
            </th>
            <th
              scope="col"
              class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
            >
              Tags
            </th>
            <th scope="col" class="py-2 pl-0 pr-8 font-semibold lg:pr-20">Genre</th>
            <th scope="col" class="py-2 pl-0 pr-8 font-semibold lg:pr-20">Progress</th>
            <th scope="col" class="py-2 pl-0 pr-8 font-semibold lg:pr-20">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr v-for="(item, i) in barObj" :key="item.id">
            <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div class="flex items-center gap-x-4">
                <div class="truncate text-sm font-medium leading-6 text-white">
                  {{ item.id }}
                </div>
              </div>
            </td>
            <td class="py-4 pl-0 pr-8">
              <div class="flex items-center gap-x-4">
                <div class="truncate text-sm font-medium leading-6 text-white">
                  {{ item.title }}
                </div>
              </div>
            </td>
            <td class="hidden py-0 pl-0 pr-4 sm:table-cell sm:pr-8">
              <div class="flex gap-x-3">
                <div class="font-mono text-sm leading-6 text-white">
                  {{ item.platform }}
                </div>
              </div>
            </td>
            <td class="hidden py-0 pl-0 pr-4 sm:table-cell sm:pr-8">
              <div class="flex gap-x-3">
                <div class="font-mono text-sm leading-6 text-white">
                  {{ item.tags }}
                </div>
              </div>
            </td>
            <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
              <div class="flex gap-x-3">
                <div class="font-mono text-sm leading-6 text-white">
                  {{ item.genre }}
                </div>
              </div>
            </td>

            <td
              class="hidden py-4 pl-0 pr-8 text-sm leading-6 text-white md:table-cell lg:pr-20"
            >
              {{ item.progress ? item.progress + "%" : "N/A" }}
            </td>
            <td
              class="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20"
            >
              <router-link
                :to="{ name: 'edit-game-entry', params: { id: item.id } }"
                className="btn text-white bg-yellow-500 px-4 py-2 rounded-s-lg inline-block"
                >edit</router-link
              >
              <button
                :onclick="() => deleteGame(item.id)"
                className="btn text-white bg-red-500 px-4 py-2 rounded-e-lg"
              >
                delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import client from "../../axios.config";

const barObj = ref([]);

// Define a filterUsers function to encapsulate the filtering logic
const filterUsers = (query) => {
  return barObj.value.filter((user) => {
    return user.name.toLowerCase().includes(query.toLowerCase());
  });
};

const deleteGame = async (id) => {
  try {
    await client.delete(`/games/${id}/`);
    barObj.value = barObj.value.filter((v) => v.id != id);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  try {
    const response = await client.get("/games");
    barObj.value = response;

    if (router.currentRoute.value.query.q) {
      barObj.value = filterUsers(router.currentRoute.value.query.q);
      console.log(response);
      console.log(barObj.value);
    }

    barObj.value.sort((a, b) => b.user.power - a.user.power); // Assuming power is the property to be used for sorting
  } catch (error) {
    console.error(error);
  }
});
</script>
