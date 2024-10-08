<template>
  <MDBContainer class="mt-3">
    <MDBRow>
      <MDBCol md="6">
        <MDBCardImg :src="product.image" alt="product image" />
      </MDBCol>
      <MDBCol md="6">
        <h1>{{ product.name }}</h1>
        <MDBCardText>{{ product.description }}</MDBCardText>
        <MDBBadge>{{ product.price }} $</MDBBadge>
        <MDBBtn @click="addToCart(product)">أضف إلى السلة</MDBBtn>
      </MDBCol>
    </MDBRow>
    <h2>مراجعات المستخدمين</h2>
    <div v-for="review in product.reviews" :key="review.id">
      <p>{{ review.text }}</p>
      <p>
        <strong>التقييم: {{ review.rating }}</strong>
      </p>
    </div>
  </MDBContainer>
</template>

<script>
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardImg,
  MDBBadge,
  MDBBtn,
  MDBCardText,
} from "mdb-vue-ui-kit";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "productsDetails",
  components: {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCardImg,
    MDBBadge,
    MDBBtn,
    MDBCardText,
  },
  computed: {
    ...mapGetters(["getProductById"]),
  },
  methods: {
    ...mapActions(["addToCart"]),
  },
  created() {
    this.product = this.getProductById(this.$route.params.id);
  },
};
</script>
