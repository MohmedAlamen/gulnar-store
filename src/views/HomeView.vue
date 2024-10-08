<template class="mt-2">
  <products-card />
</template>

<script>
// @ is an alias to /src
import ProductsCard from "@/components/products/productsCard.vue";

export default {
  name: "HomeView",
  components: {
    ProductsCard,
  },
};
</script>

<!-- <template>
  <MDBContainer class="mt-3">
    <h1 class="text-center">أحدث المنتجات</h1>
    <MDBRow :cols="['1', 'md-3', 'lg-4']" class="g-3">
      <MDBCol v-for="product in latestProducts" :key="product.id">
        <MDBCard border="secondary" class="mb-3">
          <a v-mdb-ripple="{ color: 'light' }" class="bg-image hover-zoom">
            <MDBCardImg top :src="product.image" alt="product image" />
          </a>
          <MDBCardBody>
            <MDBCardTitle>{{ product.name }}</MDBCardTitle>
            <MDBCardText>{{ product.description }}</MDBCardText>
            <MDBBadge>{{ product.price }} $</MDBBadge>
            <MDBBtn @click="addToCart(product)">أضف إلى السلة</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</template>

<script>
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImg,
  MDBBtn,
  MDBBadge,
} from "mdb-vue-ui-kit";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HomeView",
  components: {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImg,
    MDBBtn,
    MDBBadge,
  },
  computed: {
    ...mapGetters(["latestProducts"]),
  },
  methods: {
    ...mapActions(["addToCart"]),
  },
};
</script> -->
