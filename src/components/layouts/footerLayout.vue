<template>
  <!-- Footer -->
  <MDBFooter bg="dark" :text="['center', 'lg-start', 'light']">
    <!-- Section: Links  -->
    <section class="me-3 ms-3 p-4 border-bottom">
      <div class="text-center text-md-start mt-5">
        <!-- Grid row -->
        <MDBRow class="mt-3">
          <!-- Grid column -->
          <MDBCol md="3" lg="4" xl="3" class="mx-auto mb-4">
            <!-- Content -->
            <h6 class="text-uppercase fw-bold mb-4">
              <i class="fas fa-gem me-3"></i>Company info
            </h6>
            <p>
              <a href="#!" class="text-reset">About Gulnar Store</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Contact Us</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Careers</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Press</a>
            </p>
          </MDBCol>
          <!-- Grid column -->
          <!-- Grid column -->
          <MDBCol md="2" lg="2" xl="2" class="mx-auto mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">Customer Service</h6>
            <p>
              <a href="#!" class="text-reset">Return and refund policy</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Intellectual property policy</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Shipping info</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Report suspicious activity</a>
            </p>
          </MDBCol>
          <!-- Grid column -->
          <!-- Grid column -->
          <MDBCol md="3" lg="2" xl="2" class="mx-auto mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">Help</h6>
            <p>
              <a href="#!" class="text-reset">Support center & FAQ</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Safety center</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Temu purchase protection</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Sitemap</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Partner with Gulnar Store</a>
            </p>
          </MDBCol>
          <!-- Grid column -->
          <!-- Grid column -->
          <MDBCol md="4" lg="3" xl="3" class="mx-auto mb-md-0 mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
            <p><i class="fas fa-home me-3"></i> New York, NY 10012, US</p>
            <p>
              <i class="fas fa-envelope me-3"></i>
              info@example.com
            </p>
            <p><MDBIcon icon="phone" class="me-3" /> + 01 234 567 88</p>
            <p><MDBIcon icon="print" class="me-3" /> + 01 234 567 89</p>
          </MDBCol>
          <!-- Grid column -->
        </MDBRow>
        <!-- Grid row -->
      </div>
    </section>
    <!-- Section: Links  -->
    <!-- Section: Social media -->
    <section
      class="d-flex justify-content-center justify-content-lg-between p-4"
    >
      <!-- Left -->
      <h6 class="me-5 d-none d-lg-block">
        <span>Get connected with us on social networks:</span>
      </h6>
      <!-- Left -->
      <!-- Right -->
      <div>
        <a
          href=""
          role="button"
          class="me-4 text-reset btn btn-outline-light btn-floating"
        >
          <MDBIcon iconStyle="fab" icon="facebook-f"></MDBIcon>
        </a>
        <a
          href=""
          role="button"
          class="me-4 text-reset btn btn-outline-light btn-floating"
        >
          <MDBIcon iconStyle="fab" icon="twitter"></MDBIcon>
        </a>
        <a
          href=""
          role="button"
          class="me-4 text-reset btn btn-outline-light btn-floating"
        >
          <MDBIcon iconStyle="fab" icon="google"></MDBIcon>
        </a>
        <a
          href=""
          role="button"
          class="me-4 text-reset btn btn-outline-light btn-floating"
        >
          <MDBIcon iconStyle="fab" icon="instagram"></MDBIcon>
        </a>
        <a
          href=""
          role="button"
          class="me-4 text-reset btn btn-outline-light btn-floating"
        >
          <MDBIcon iconStyle="fab" icon="linkedin"></MDBIcon>
        </a>
        <a
          href=""
          role="button"
          class="me-4 text-reset btn btn-outline-light btn-floating"
        >
          <MDBIcon iconStyle="fab" icon="github"></MDBIcon>
        </a>
      </div>
      <!-- Right -->
    </section>
    <!-- Section: Social media -->
    <!-- Copyright -->
    <div
      class="text-center p-4 border-top ms-3 me-3"
      style="background-color: rgba(0, 0, 0, 0.05); color: wheat"
    >
      © 2021 Copyright:
      <a class="text-reset fw-bold" href="https://mdbootstrap.com/"
        >MDBootstrap.com</a
      >
    </div>
    <!-- Copyright -->
  </MDBFooter>
  <!-- Footer -->
</template>

<script>
import { MDBFooter, MDBRow, MDBCol, MDBIcon } from "mdb-vue-ui-kit";

export default {
  name: "footerLayout",
  components: {
    MDBFooter,
    MDBRow,
    MDBCol,
    MDBIcon,
  },
};
</script>

<style scoped>
h6 {
  color: wheat;
}
i {
  color: wheat;
}
.btn-outline-light {
  color: rgb(0, 0, 0) !important;
}
</style>
