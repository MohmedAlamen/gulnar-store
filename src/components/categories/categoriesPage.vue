<template>
  <MDBContainer class="mt-3">
    <h1 class="text-center">التصنيفات</h1>
    <MDBRow>
      <MDBCol md="3">
        <h5>الفلاتر</h5>
        <!-- فلاتر اختيارية -->
        <MDBCheckbox
          v-for="filter in filters"
          :key="filter.id"
          :label="filter.name"
        />
      </MDBCol>
      <MDBCol md="9">
        <MDBRow :cols="['1', 'md-3', 'lg-4']" class="g-3">
          <MDBCol v-for="category in categories" :key="category.id">
            <MDBCard border="secondary">
              <MDBCardImg :src="category.image" alt="category image" />
              <MDBCardBody>
                <MDBCardTitle>{{ category.name }}</MDBCardTitle>
                <MDBBtn
                  :to="{
                    name: 'CategoryProducts',
                    params: { id: category.id },
                  }"
                  >استعرض المنتجات</MDBBtn
                >
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
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
  MDBCardImg,
  MDBBtn,
  MDBCheckbox,
} from "mdb-vue-ui-kit";
import { mapGetters } from "vuex";

export default {
  name: "categoriesPage",
  components: {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardImg,
    MDBBtn,
    MDBCheckbox,
  },
  computed: {
    ...mapGetters(["categories", "filters"]),
  },
};
</script>
