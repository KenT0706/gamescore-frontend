import { defineStore } from "pinia";

export const useAuthenticate = defineStore("auth", {
  state: () => ({
    isLoggedIn: localStorage.getItem("token") !== null,
    userId: null,
    isAdmin: localStorage.getItem("isAdmin") === "true",
    deleteModal: false,
    avatar: localStorage.getItem("avatar"),
  }),
  actions: {
    setLogin(auth) {
      this.isLoggedIn = auth;
      console.log(auth);
    },
    setId(id) {
      this.userId = id;
      console.log(id);
    },
    setIsAdmin(isAdmin) {
      this.isAdmin = isAdmin;
      localStorage.setItem("isAdmin", this.isAdmin);
    },
    initUserIdFromLocalStorage() {
      const userIdFromLocalStorage = localStorage.getItem("userId");
      if (userIdFromLocalStorage) {
        this.setId(userIdFromLocalStorage);
      }
    },
    setModal() {
      this.deleteModal = !this.deleteModal;
    },
    setAvatar(img) {
      if (img) {
        this.avatar = `https://gamescore-api-prod-37cu4rqvoa-as.a.run.app/uploads/avatars/${this.userId}/${img}`;
        localStorage.setItem("avatar", this.avatar);
      }
    },
  },
});
