<template>
  <div class="bg-gray-900 py-10 my-16 max-w-7xl mx-auto">
    <h2 class="px-4 text-3xl font-normal leading-7 text-white sm:px-6 lg:px-8">
      Leadersboard
      <!-- <pre>{{ barObj }}</pre> -->
    </h2>
    <table class="mt-6 w-full whitespace-nowrap text-left">
      <colgroup>
        <col class="w-full sm:w-4/12" />
        <col class="lg:w-4/12" />
        <col class="lg:w-2/12" />
        <col class="lg:w-1/12" />
        <col class="lg:w-1/12" />
      </colgroup>
      <thead class="border-b border-white/10 text-sm leading-6 text-white">
        <tr>
          <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
            ID
          </th>
          <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
            User ID
          </th>
          <th scope="col" class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
            Score
          </th>
          <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
            Rank
          </th>
          <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
            Verified
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5">
        <tr v-for="(item, i) in barObj" :key="item.id">
          <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
            <div class="flex items-center gap-x-4">
              <img
                :src="item.avatar ? `https://gamescore-api-prod-37cu4rqvoa-as.a.run.app/uploads/avatars/${item.id}/${item.avatar}` : `https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`"
                alt="" class="h-8 w-8 rounded-lg bg-gray-800" />
              <div class="truncate text-sm font-medium leading-6 text-white">
                {{ item.name }}
              </div>
            </div>
          </td>
          <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div class="flex gap-x-3">
              <div class="font-mono text-sm leading-6 text-gray-400">
                {{ item.email }}
              </div>
            </div>
          </td>
          <td class="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
            <div v-if="item.isVerified" class="flex items-center justify-end gap-x-2 sm:justify-start">
              <div class="w-full h-1 rounded-full bg-transparent">
                <div :class="['bg-primary', ' ', 'rounded-full ', 'h-full']"></div>
              </div>
              <span class="text-gray-400 font-xs">{{ item.score }}</span>

              <div class="hidden text-white sm:block"></div>
            </div>
          </td>
          <td class="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
            {{ i + 1 + (rank[i] ?? "th") }}
          </td>

          <td class="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
            {{ item.isVerified ? "Yes" : "No" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import client from "../axios.config";

const statuses = {
  Completed: "text-green-400 bg-green-400/10",
  Error: "text-rose-400 bg-rose-400/10",
};
const activityItems = [
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "2d89f0c8",
    branch: "main",
    status: "Completed",
    duration: "1",
    date: "45 minutes ago",
    dateTime: "2023-01-23T11:00",
    power: 40,
  },
  {
    user: {
      name: "Lindsay Walton",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "249df660",
    branch: "main",
    status: "Completed",
    duration: "2",
    date: "3 hours ago",
    dateTime: "2023-01-23T09:00",
    power: 70,
  },
  {
    user: {
      name: "Courtney Henry",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "11464223",
    branch: "main",
    status: "Completed",
    duration: "3",
    date: "12 hours ago",
    dateTime: "2023-01-23T00:00",
    power: 40,
  },
];
const barObj = ref([]);
const rank = ref(["st", "nd", "rd"]);

// Define a filterUsers function to encapsulate the filtering logic
const filterUsers = (query) => {
  return barObj.value.filter((user) => {
    return user.name.toLowerCase().includes(query.toLowerCase());
  });
};

onMounted(async () => {
  try {
    const response = await client.get("/users");
    barObj.value = response;

    if (router.currentRoute.value.query.q) {
      barObj.value = filterUsers(router.currentRoute.value.query.q);
      console.log(response);
      console.log(barObj.value);
    }

    barObj.value.sort((a, b) => b?.user?.power - a?.user?.power); // Assuming power is the property to be used for sorting
  } catch (error) {
    console.error(error);
  }
});
</script>
