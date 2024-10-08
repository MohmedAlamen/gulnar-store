<template>
  <MDBContainer class="mt-3">
    <h1 class="text-center">الدفع</h1>
    <form @submit.prevent="submitOrder">
      <MDBInput label="اسم المستلم" v-model="shippingInfo.name" />
      <MDBInput label="العنوان" v-model="shippingInfo.address" />
      <MDBInput label="البريد الإلكتروني" v-model="shippingInfo.email" />
      <MDBInput label="رقم الهاتف" v-model="shippingInfo.phone" />
      <MDBBtn type="submit">إكمال الطلب</MDBBtn>
    </form>
  </MDBContainer>
</template>

<script>
import { MDBContainer, MDBInput, MDBBtn } from "mdb-vue-ui-kit";

export default {
  name: "checkoutPage",
  components: {
    MDBContainer,
    MDBInput,
    MDBBtn,
  },
  data() {
    return {
      shippingInfo: {
        name: "",
        address: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    submitOrder() {
      // اضافة المنطق لإرسال الطلب
      console.log(this.shippingInfo);
    },
  },
};
</script>
