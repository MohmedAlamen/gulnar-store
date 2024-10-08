<template>
  <MDBContainer class="mt-3">
    <!-- Start Card -->
    <MDBRow :cols="['1', 'md-3', 'lg-4']" class="g-3" v-if="watches.length">
      <MDBCol v-for="watch in watches" :key="watch.id">
        <MDBCard
          border="secondary"
          shadow="0"
          bg="dark"
          class="mb-3"
          style="max-width: 18rem"
        >
          <a v-mdb-ripple="{ color: 'light' }" class="bg-image hover-zoom">
            <MDBCardImg top :src="watch.image" alt="watch image" />
          </a>
          <MDBCardBody text="white">
            <MDBCardTitle class="text-center">{{ watch.name }}</MDBCardTitle>
            <MDBCardText class="text-center">{{
              watch.description
            }}</MDBCardText>
            <MDBCardText class="d-flex justify-content-between fw-bolder">
              <MDBBtn
                class="mt-1 ms-3"
                size="sm"
                style="color: wheat !important; border-color: wheat !important"
                outline="dark"
                @click="addToCart(watch)"
              >
                <MDBIcon iconstye="fas" icon="cart-plus" size="lg"></MDBIcon>
              </MDBBtn>
              <MDBBadge
                class="m-auto fs-6 fw-bold"
                pill
                style="
                  margin-right: 5px !important;
                  background-color: wheat !important;
                  color: black !important;
                "
                >{{ watch.price }} $</MDBBadge
              >
            </MDBCardText>
            <!-- Add Star Rate --><!-- <MDBRating
              v-model="watch.rating"
              :max="5"
              :readonly="false"
              icon="fas fa-star"
              icon-empty="far fa-star"
              class="my-2"
            /> -->
            <div class="ms-5" style="color: wheat !important">
              <i
                v-for="star in 5"
                :key="star"
                class="fa-star"
                :class="{
                  fas: star <= watch.rating,
                  far: star > watch.rating,
                }"
              ></i>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
    <div v-else>
      <p>لا توجد ساعات متاحة .</p>
    </div>
    <!-- <add-to-cart /> -->
  </MDBContainer>
</template>

<script>
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImg,
  mdbRipple,
  MDBBtn,
  MDBIcon,
  MDBBadge,
  // MDBRating,
} from "mdb-vue-ui-kit";

// import addToCart from "./addToCart.vue";
import { mapActions } from "vuex"; // تأكد من استيراد mapActions

export default {
  name: "productCard",
  components: {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImg,
    MDBBtn,
    MDBIcon,
    MDBBadge,
    // MDBRating,
    // addToCart,
  },
  directives: {
    mdbRipple,
  },
  computed: {
    watches() {
      return this.$store.getters.allWatches;
    },
  },
  methods: {
    ...mapActions({ addToCart: "addToCart" }),
  },
};
</script>

<style scoped></style>
