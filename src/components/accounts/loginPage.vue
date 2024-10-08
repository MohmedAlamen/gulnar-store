<template>
  <MDBContainer class="mt-3">
    <h1 class="text-center">تسجيل الدخول</h1>
    <form @submit.prevent="login">
      <MDBInput label="البريد الإلكتروني" v-model="email" />
      <MDBInput type="password" label="كلمة المرور" v-model="password" />
      <MDBBtn type="submit">تسجيل الدخول</MDBBtn>
    </form>
  </MDBContainer>
</template>

<script>
import { MDBContainer, MDBInput, MDBBtn } from "mdb-vue-ui-kit";

export default {
  name: "loginPage",
  components: {
    MDBContainer,
    MDBInput,
    MDBBtn,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      // اضافة المنطق لتسجيل الدخول
      console.log(this.email, this.password);
    },
  },
};
</script>
