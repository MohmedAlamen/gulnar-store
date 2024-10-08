<template>
  <MDBContainer class="mt-3">
    <h1 class="text-center">حسابي</h1>
    <h2>معلومات المستخدم</h2>
    <p>الاسم: {{ user.name }}</p>
    <p>البريد الإلكتروني: {{ user.email }}</p>
    <h2>الطلبات السابقة</h2>
    <MDBRow>
      <MDBCol v-for="order in orders" :key="order.id">
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle>طلب رقم: {{ order.id }}</MDBCardTitle>
            <MDBCardText>التاريخ: {{ order.date }}</MDBCardText>
            <MDBCardText>إجمالي المبلغ: {{ order.total }} $</MDBCardText>
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
} from "mdb-vue-ui-kit";
import { mapGetters } from "vuex";

export default {
  name: "userAccount",
  components: {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
  },
  computed: {
    ...mapGetters(["user", "orders"]),
  },
};
</script>
