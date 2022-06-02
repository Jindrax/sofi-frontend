<template>
  <q-card>
    <q-card-section class="column justify-evenly items-center">
      <p style="color: #1D1D1D" class="col-auto login-input">¡Inicia sesión para tener acceso a tu contabilidad!</p>
      <div class="col-auto column q-gutter-y-md login-input">
        <q-input label="Usuario" v-model="username" class="col-auto"></q-input>
        <q-input label="Contraseña" v-model="pass" class="col-auto" type="password"></q-input>
        <q-btn label="Iniciar Sesión" class="col-auto advance-btn" @click="login"/>
      </div>
      <br>
      <p style="color: #1D1D1D" class="col-auto login-input">Recuerda escribir las credenciales propocionadas
        por el consultorio contable javeriano.</p>
      <a class="col-auto" href="#/soporte"><b>Soporte</b></a>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {userStore} from "src/store/userStore";
import {useQuasar} from "quasar";
import {ApiController} from "src/api/ApiController";
import {syncBack, syncBackAdmin} from "src/api/Sincronizador";
import {stat} from "fs";

const router = useRouter();
const store = userStore();
const $q = useQuasar();

const users: { [key: string]: string } = {
  "jairo": "admin",
  "luisa": "manager",
  "sebas": "cashier"
}

const username = ref("");
const pass = ref("");

async function login() {
  if (users[username.value] || true) {
    try {
      const response = await ApiController.post("/auth/login", {
        email: username.value,
        password: pass.value
      });
      console.log(response);
      ApiController.setToken(response.token);
      store.login(response.nombre, response.rol, response.token);
      switch (response.rol) {
        case "ADMIN":
          await syncBackAdmin();
          break;
        default:
          await syncBack();
          break;
      }
      await router.push(`/usr=${store.name.replace(/\s/g, '')}/${store.getPermissions[0].key}`);
    } catch (e) {
      console.log(e);
      $q.notify("Credenciales invalidas");
    }
  } else {
    $q.notify("Usuario no encontrado");
  }
}
</script>

<style scoped>
.login-input {
  width: 80%;
  text-align: center;
  font-size: 2.5vh;
  font-weight: bold;
}
</style>
