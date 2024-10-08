<template>
  <!-- Button trigger modal -->
  <MDBBtn
    color="light"
    aria-controls="exampleSideModal1"
    @click="exampleSideModal1 = true"
    class=""
    outline="light"
  >
    <MDBBadge
      v-if="cartItems.length"
      notification
      pill
      class="bg-dark"
      id="badge"
      >{{ cartItems.length }}
    </MDBBadge>
    <MDBIcon icon="shopping-cart" class="text-dark fw-bolder fs-5"></MDBIcon>
  </MDBBtn>
  <!-- Modal example - top right -->
  <MDBModal
    side
    position="top-right"
    direction="right"
    id="exampleSideModal1"
    tabindex="-1"
    labelledby="exampleSideModalLabel1"
    v-model="exampleSideModal1"
  >
    <MDBModalHeader color="info" class="text-white">
      <MDBModalTitle id="exampleSideModalLabel1">
        Product in the cart
      </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
      <MDBRow :cols="['1']" v-if="cartItems.length" class="g-1">
        <MDBCol class="text-center" v-for="item in cartItems" :key="item.id">
          <MDBCard border="secondary" shadow="0" bg="dark" class="mt-1">
            <MDBRow class="aling-items-center">
              <MDBCol size="3">
                <MDBCardImg top :src="item.image" alt="watch image" class="" />
              </MDBCol>
              <MDBCol size="9">
                <MDBCardBody text="white" class="p-2">
                  <MDBCardTitle class="text-center fs-6">{{
                    item.name
                  }}</MDBCardTitle>
                  <MDBCardText class="text-center fs-6">{{
                    item.description
                  }}</MDBCardText>
                  <MDBCardText class="text-center fs-6"
                    >{{ item.price }} $ - {{ item.quantity }}</MDBCardText
                  >
                  <MDBCardText
                    class="d-flex justify-content-center align-items-center"
                  >
                    <!-- Buttons Increase and Decrease Quantity -->
                    <MDBBtn
                      size="sm"
                      color="info"
                      @click="decreaseQuantity(item)"
                      >-</MDBBtn
                    >
                    <MDBCardText class="px-3 mb-auto">{{
                      item.quantity
                    }}</MDBCardText>
                    <MDBBtn
                      size="sm"
                      color="info"
                      @click="increaseQuantity(item)"
                      >+</MDBBtn
                    >
                  </MDBCardText>
                  <MDBBtn @click="removeFromCart(item.id)" color="danger"
                    >Remove</MDBBtn
                  >
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <!-- <MDBCardText>{{ cartTotal }} $</MDBCardText> -->
      <!-- If the cart is empty -->
      <p v-else>Your cart is empty</p>
      <!-- Display cart total if there are items in the cart -->
      <MDBCardText
        v-if="cartItems.length"
        class="text-center mt-1 fw-bold text-dark"
      >
        Total: {{ cartTotal }} $
      </MDBCardText>
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="outline-info" @click="clearCart" v-if="cartItems.length">
        Clear Cart
      </MDBBtn>
      <MDBBtn color="outline-info" @click="exampleSideModal1 = false">
        Close
      </MDBBtn>
    </MDBModalFooter>
  </MDBModal>
</template>

<script>
import {
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImg,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
  MDBBadge,
} from "mdb-vue-ui-kit";
import { ref } from "vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "addToCart",
  components: {
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardImg,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBIcon,
    MDBBadge,
  },
  setup() {
    const exampleSideModal1 = ref(false);
    return {
      exampleSideModal1,
    };
  },
  computed: {
    ...mapGetters(["cartItems", "cartTotal"]),
  },
  methods: {
    ...mapActions([
      "removeFromCart",
      "clearCart",
      "increaseQuantity",
      "decreaseQuantity",
    ]),
  },
};
</script>

<style scoped>
#badge {
  color: wheat;
}
</style>
