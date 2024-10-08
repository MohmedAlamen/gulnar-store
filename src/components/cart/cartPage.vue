<template>
  <MDBContainer class="mt-3">
    <h1 class="text-center">العربة</h1>
    <MDBRow>
      <MDBCol v-for="item in cartItems" :key="item.id" class="mb-3">
        <MDBCard>
          <MDBCardImg :src="item.image" alt="product image" />
          <MDBCardBody>
            <MDBCardTitle>{{ item.name }}</MDBCardTitle>
            <MDBCardText>{{ item.price }} $</MDBCardText>
            <MDBBtn @click="removeFromCart(item)">إزالة</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
    <MDBBtn @click="checkout">الذهاب إلى الدفع</MDBBtn>
  </MDBContainer>
</template>

<script>
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImg,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-vue-ui-kit";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "cartPage",
  components: {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardImg,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
  },
  computed: {
    ...mapGetters(["cartItems"]),
  },
  methods: {
    ...mapActions(["removeFromCart", "checkout"]),
  },
};
</script>
