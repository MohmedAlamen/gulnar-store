<template>
  <MDBContainer class="mt-3">
    <!-- Start Card -->
    <MDBRow :cols="['1', 'md-3', 'lg-4']" class="g-4" v-if="watches.length">
      <MDBCol v-for="watch in watches" :key="watch.id">
        <MDBCard
          class="product-card mb-4 shadow-3-strong"
          border="none"
          bg="dark"
          style="max-width: 18rem"
        >
          <!-- تأثير التكبير والتحويم -->
          <div class="bg-image hover-zoom ripple" v-mdb-ripple="true">
            <MDBCardImg
              top
              :src="watch.image"
              alt="watch image"
              class="img-fluid"
            />
          </div>

          <!-- تفاصيل المنتج -->
          <MDBCardBody class="text-center" text="white">
            <MDBCardTitle class="fw-bold mb-2">{{ watch.name }}</MDBCardTitle>
            <MDBCardText class="text-muted small">
              {{ watch.description }}
            </MDBCardText>

            <!-- السعر وزر السلة -->
            <div class="d-flex justify-content-between align-items-center">
              <MDBBadge
                pill
                class="price-badge"
                style="background-color: wheat; color: black"
              >
                {{ watch.price }} $
              </MDBBadge>
              <MDBBtn
                class="cart-btn"
                size="sm"
                border="none"
                @click="addToCart(watch)"
              >
                <MDBIcon icon="cart-plus" size="lg"></MDBIcon>
              </MDBBtn>
            </div>

            <!-- النجوم لتقييم المنتج -->
            <div class="mt-2" style="color: wheat">
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

    <!-- إذا لم تكن هناك منتجات -->
    <div v-else>
      <p class="text-center text-muted">لا توجد ساعات متاحة.</p>
    </div>
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
} from "mdb-vue-ui-kit";
import { mapActions } from "vuex";

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

<style scoped>
/* تحسين تصميم البطاقات */
.product-card {
  border-radius: 10px;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
}

/* تحسين تصميم الصورة */
.hover-zoom img {
  transition: transform 0.5s ease;
}

.hover-zoom:hover img {
  transform: scale(1.1);
}

/* تحسين تصميم الزر والشارة */
.cart-btn {
  font-weight: 600;
}

.price-badge {
  font-size: 1rem;
  padding: 0.5rem 1rem;
}

/* تحسين تصميم النجوم */
.fas {
  color: gold;
}

.far {
  color: grey;
}
</style>
