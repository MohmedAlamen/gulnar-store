<template>
  <MDBContainer class="mt-3">
    <h1 class="text-center">إنشاء حساب</h1>
    <form @submit.prevent="register">
      <MDBInput label="الاسم" v-model="name" />
      <MDBInput label="البريد الإلكتروني" v-model="email" />
      <MDBInput type="password" label="كلمة المرور" v-model="password" />
      <MDBBtn type="submit">تسجيل</MDBBtn>
    </form>
  </MDBContainer>
</template>

<script>
import { MDBContainer, MDBInput, MDBBtn } from "mdb-vue-ui-kit";

export default {
  name: "registerPage",
  components: {
    MDBContainer,
    MDBInput,
    MDBBtn,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      // اضافة المنطق لإنشاء الحساب
      console.log(this.name, this.email, this.password);
    },
  },
};
</script>
