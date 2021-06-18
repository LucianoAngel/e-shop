<template>
  <div class="app-background">
    <div id="app" class="container">
      <div class="abs-center">
        <b-card
          title="Registrarse"
          style="max-width: 20rem;"
        >
          <b-card-body>
            <form>
              <b-form-input type="text" v-model="nombre" placeholder= "Nombre..." class="mb-2"></b-form-input>
              <b-form-input type="password" v-model="password" placeholder="Contraseña..."></b-form-input>
              <b-button
                variant="outline-primary"
                :disabled="nombre && password ? false : true"
                @click="enviarDatos"
              >
                Registrarse
              </b-button>
            </form>
            <b-row>
              <b-col>
                <router-link to="/login">
                  <a>Ir al inicio de sesión</a>
                </router-link>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
    name:'Register',
    data(){
        return{
            nombre: '',
            password: '',
        }
    },
    methods: {
        enviarDatos(){
        const This = this;
        if(!this.nombre.length || !this.password.length){
          return This.$vToastify.info('Llena todos los datos para continuar')
        }
        axios
          .post('http://localhost:4012/api/createuser', {
            username: This.nombre,
            password: This.password,
          })
          .then((res) => {
            console.log(res)
            if(res.status==200){
              This.$vToastify.success('Registrado con exito, prueba iniciando sesión')
              This.$router.push('/login')
            }else{
              This.$vToastify.error("valida tus datos")
            }})
          .catch((error) => {
            This.$vToastify.error(error)
          })
      }
    },
    created: function(){
    }
}
</script>

<style>
  body {
    background: #36D1DC;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #5B86E5, #36D1DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  /* Centrado absoluto, vertical y horizontalmente
    con display: flex; se vuelve un elemento flex
    y con align-items: center se centra horizontalmente*/
  .abs-center {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  .app-background {
    background-image: url('../assets/svgs/pass.svg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: -50% 20%;
    background-size: 45rem;
  }
</style>