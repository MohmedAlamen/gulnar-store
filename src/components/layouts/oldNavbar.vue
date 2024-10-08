<template>
  <MDBNavbar
    container="lg"
    expand="md"
    bg="light"
    class="mt-2 d-flex justify-content-between rounded me-1 ms-1"
  >
    <MDBNavbarBrand>
      <img
        src="../../assets/logo.jpeg"
        class="rounded"
        width="40px"
        loading="lazy"
        alt="Gulnar Store"
      />
      <span class="ms-2">Gulnar Store</span>
    </MDBNavbarBrand>
    <MDBNavbarToggler
      target="#navbarColor01"
      @click="collapse7 = !collapse7"
    ></MDBNavbarToggler>
    <!-- NavBar Item -->
    <MDBCollapse id="navbarColor01" v-model="collapse7">
      <MDBNavbarNav class="mt-2 mb-lg-0">
        <MDBNavbarItem href="#" linkClass="link-link-dark">
          <MDBIcon icon="thumbs-up"></MDBIcon>
          Best Sallers
        </MDBNavbarItem>
        <MDBNavbarItem href="#" linkClass="link-link-dark">
          <MDBIcon icon="star"></MDBIcon>
          5 - Star Rate
        </MDBNavbarItem>
        <MDBNavbarItem href="#" linkClass="link-link-dark">
          New Arrivals
        </MDBNavbarItem>
        <!-- Dropdown Menu -->
        <MDBNavbarItem href="#" linkClass="link-link-dark">
          Categories
        </MDBNavbarItem>
        <!-- Search form -->
        <MDBNavbarItem class="ms-5">
          <MDBInput
            v-model="search2"
            inputGroup
            :formOutline="false"
            wrapperClass="mb-3"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            class="border border-dark border-end-0"
          >
            <MDBBtn class="border border-dark border-start-0">
              <MDBIcon icon="search" class="align-self-center" size="lg" />
            </MDBBtn>
            <!-- <MDBIcon icon="search" class="align-self-center" /> -->
          </MDBInput>
        </MDBNavbarItem>
      </MDBNavbarNav>
    </MDBCollapse>

    <!-- Navbar Icon Cart -->
    <MDBNavbarNav class="mb-2 mb-lg-0 d-flex flex-row">
      <MDBNavbarItem class="me-3 me-lg-0" linkClass="link-dark">
        <add-to-cart>
          <!-- <span v-if="cartItems.length" class="badge bg-danger">{{
            cartItems.length
          }}</span> -->
        </add-to-cart>
        <!-- <MDBBtn color="light" @click="exampleSideModal1 = true">
          <MDBIcon icon="shopping-cart"></MDBIcon>
        </MDBBtn> -->
      </MDBNavbarItem>
      <!-- <MDBNavbarItem to="#" class="me-3 me-lg-0" linkClass="link-dark">
        <MDBIcon icon="bell" />
        <MDBBadge notification color="danger" pill>1</MDBBadge>
      </MDBNavbarItem> -->
      <!-- <MDBNavbarItem href="#" class="me-3 me-lg-0">
        <img
          src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
          class="rounded-circle"
          height="22"
          alt=""
          loading="lazy"
        />
      </MDBNavbarItem> -->
    </MDBNavbarNav>
    <!-- Include the cart modal component -->
  </MDBNavbar>
</template>

<script>
import {
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  // MDBBadge,
  MDBIcon,
  MDBCollapse,
  MDBInput,
  MDBBtn,
} from "mdb-vue-ui-kit";
import { ref } from "vue";
import addToCart from "../products/addToCart";
import { mapGetters } from "vuex";

export default {
  components: {
    MDBNavbar,
    MDBNavbarItem,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    // MDBBadge,
    MDBIcon,
    MDBCollapse,
    MDBInput,
    MDBBtn,
    addToCart,
  },
  setup() {
    const collapse7 = ref(false);
    const search2 = ref("");
    return {
      collapse7,
      search2,
    };
  },
  computed: {
    ...mapGetters(["cartItems"]),
  },
};
</script>

<style scoped></style>
