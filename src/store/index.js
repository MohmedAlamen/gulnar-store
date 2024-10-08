import { createStore } from "vuex";

// import axios from "axios";

export default createStore({
  state: {
    watches: [
      {
        id: 2,
        name: "Reamle Smart",
        description: "Watch Description",
        price: 50,
        image: require("../assets/2.jpg"),
        rating: 3.5,
      },
      {
        id: 3,
        name: "Reamle Smart",
        description: "Watch Description",
        price: 25,
        image: require("../assets/2.jpg"),
        rating: 4.5,
      },
      {
        id: 4,
        name: "Reamle Smart",
        description: "Watch Description",
        price: 150,
        image: require("../assets/rendering-smart-home-device.jpg"),
        rating: 3,
      },
      {
        id: 5,
        name: "MF mini Focus",
        description: "Watch Description",
        price: 48,
        image: require("../assets/watch6.png"),
        rating: 4,
      },
      {
        id: 6,
        name: "Mini Focus",
        description: "Watch Description",
        price: 30,
        image: require("../assets/watch2.png"),
        rating: 3.5,
      },
      {
        id: 7,
        name: "Malu Luf",
        description: "Watch Description",
        price: 75,
        image: require("../assets/watch3.png"),
        rating: 5,
      },
      {
        id: 8,
        name: "Detailed Features",
        description: "Watch Description",
        price: 200,
        image: require("../assets/watch4.png"),
        rating: 3,
      },
      {
        id: 9,
        name: "Diesel Watch",
        description: "Watch Description",
        price: 120,
        image: require("../assets/watch5.png"),
        rating: 4,
      },
      {
        id: 10,
        name: "MF Focus",
        description: "Watch Description",
        price: 100,
        image: require("../assets/watch6.png"),
        rating: 5,
      },
    ],
    cart: [], // سلة المشتريات
  },
  getters: {
    allWatches: (state) => state.watches,
    cartItems: (state) => state.cart,
    cartTotal: (state) =>
      state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
  },
  mutations: {
    ADD_TO_CART(state, watch) {
      const existingItem = state.cart.find((item) => item.id === watch.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push({ ...watch, quantity: 1 });
      }
    },
    REMOVE_FROM_CART(state, watchId) {
      state.cart = state.cart.filter((item) => item.id !== watchId);
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    INCREASE_QUANTITY(state, item) {
      const cartItem = state.cart.find((i) => i.id === item.id);
      if (cartItem) {
        cartItem.quantity++;
      }
    },
    DECREASE_QUANTITY(state, item) {
      const cartItem = state.cart.find((i) => i.id === item.id);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
      }
    },
  },
  actions: {
    addToCart({ commit }, watch) {
      commit("ADD_TO_CART", watch);
    },
    removeFromCart({ commit }, watchId) {
      commit("REMOVE_FROM_CART", watchId);
    },
    clearCart({ commit }) {
      commit("CLEAR_CART");
    },
    increaseQuantity({ commit }, item) {
      commit("INCREASE_QUANTITY", item);
    },
    decreaseQuantity({ commit }, item) {
      commit("DECREASE_QUANTITY", item);
    },
  },
  // async fetchWatches({ commit }) {
  //   const response = await axios.get("/api/watches"); // استخدم ال API الخاص بك
  //   commit("setWatches", response.data);
  // },
  // async fetchCategories({ commit }) {
  //   const response = await axios.get("/api/categories");
  //   commit("setCategories", response.data);
  // },
});
