<template>
  <div class="app-background">
    <div  id="app" class="container mt-5" >
        <div class="alert alert-primary" role="alert">
        <h2 class="d-flex text-center align-items-center text-dark"><b-icon icon="person-fill"></b-icon>  Agregar cliente</h2>
    </div>
    <!-- Seleccione la entidad y el nombre -->
        <b-card>
            <h4>Seleccione la Entidad</h4>
            <b-form-select v-model="selected" :options="entidad"></b-form-select>
            <h4 class="mt-2">Ingrese el nombre</h4>
            <input type="text" class="form-control my-3" v-model.trim="persona.nombre" v-on:keyup.enter="aggPersona" placeholder="Nombre">
            <h5 class="mt-2">Ingrese el documento de identificación (opcional)</h5>
            <input type="text" class="form-control my-3" v-model.trim="persona.cedula" v-on:keyup.enter="aggPersona" placeholder="Cedula o Documento de identificación">
            <button class="btn btn-primary" @click="aggPersona">Agregar</button>
        </b-card>
    <!-- Lista de personas -->
        <b-card class="mt-3">
            <h4>Clientes Personales</h4>
            <div v-if="personas && personas.length">
              <div class="mt-3" v-for="(item, index) of personas" :key="item.nombre+index">
                <div class="alert alert-primary" role="alert">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <b>Nombre:</b> {{item.nombre}}
                    </div>
                    <div v-if="item.cedula">
                      <b>Cedula:</b> {{item.cedula}}
                    </div>
                    <div>
                      <button class="btn btn-outline-primary btn-sm" @click="abrirModal(item)">Editar</button>
                      <button class="btn btn-danger btn-sm ml-2" @click="deleteClient(item._id)">x</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <h5 class="m-4">Sin clientes registrados</h5>
            </div>
            <h4>Clientes Empresariales</h4>
            <div v-if="empresas && empresas.length">
              <div class="mt-3" v-for="(item, index) of empresas" :key="item.nombre+index">
                <div class="alert alert-primary" role="alert">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <b>Nombre:</b> {{item.nombre}}
                    </div>
                    <div v-if="item.cedula">
                      <b>Cedula:</b> {{item.cedula}}
                    </div>
                    <div>
                      <button class="btn btn-outline-primary btn-sm" @click="abrirModal(item)">Editar</button>
                      <button class="btn btn-danger btn-sm ml-2" @click="deleteClient(item._id)">x</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <h5 class="m-4">Sin empresas registradas</h5>
            </div>
          </b-card>
          <b-modal
            v-model="openModal"
            @ok="updateClient"
            title="Ingresa los nuevos datos del cliente"
          >
            <b-input class="mb-2" v-model.trim="nuevaPersona.nombre" placeholder="Nombre"></b-input>
            <b-input v-model.trim="nuevaPersona.cedula" placeholder="Identificación"></b-input>
          </b-modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'agregar-cliente',
    data(){
        return{
            personas: [],
            empresas: [],
            persona: {
              nombre: '',
              cedula: ''
            },
            selected: null,
            openModal: false,
            newName: '',
            nuevaPersona: {
              nombre: '',
              cedula: '',
              id: '',
            },
            entidad: [
                {value: null, text: 'Seleccione una entidad'},
                {value: 'persona', text: 'Persona'},
                {value: 'empresa', text: 'Empresa'},
            ],
        }
    },
    methods: {
        abrirModal(item) {
          this.nuevaPersona.id = item._id;
          this.nuevaPersona.nombre = item.nombre;
          this.nuevaPersona.cedula = item.cedula;
          this.openModal= true;
        },
        aggPersona() {
          const This = this;
          if(!this.persona.nombre.length || !this.selected.length){
            return This.$vToastify.info('Llena todos los datos para continuar')
          }
          const variablesParaPost = {
              nombre: This.persona.nombre,
          }
          if(This.persona.cedula.length){
            Object.assign(variablesParaPost, {
              cedula: This.persona.cedula,
            })
          }
          if(this.selected == "persona"){
            axios
              .post('http://localhost:4012/api/createperson', variablesParaPost)
              .then((res) => {
                  if(res.status==200){
                  This.$vToastify.success('Persona agregada satisfactoriamente')
                  This.findClients();
                  This.selected = null;
                  This.persona = {
                    nombre: '',
                    cedula: ''
                  };
                  }else{
                  This.$vToastify.error("Ha ocurrido un error")
                  }})
              .catch((error) => {
                  This.$vToastify.error("Ha ocurrido un error: ", error)
              })
          }else{
            axios
              .post('http://localhost:4012/api/createcompany', variablesParaPost)
              .then((res) => {
                  if(res.status==200){
                  This.$vToastify.success('Compañia agregada satisfactoriamente')
                  This.findClients();
                  This.selected = null;
                  This.persona = {
                    nombre: '',
                    cedula: ''
                  };
                  }else{
                    This.$vToastify.error("Ha ocurrido un error. Por favor verifica tus datos")
                  }})
              .catch((error) => {
                  This.$vToastify.error("Ha ocurrido un error: ", error)
              })
          }
      },
      findClients() {
        const This= this;
        axios
          .get('http://localhost:4012/api/findclients')
          .then((res) => {
              if(res.status==200){
                This.personas = res.data.persona;
                This.empresas = res.data.empresa;
              }else{
                This.$vToastify.error("Ha ocurrido un error obteniendo los clientes")
              }})
          .catch((error) => {
              This.$vToastify.error("Ha ocurrido un error: ", error)
          })
      },
      deleteClient(id) {
        const This= this;
        axios
          .delete(`http://localhost:4012/api/deleteclient/${id}`)
          .then((res) => {
              if(res.status==200){
              This.$vToastify.success('Clientes eliminado satisfactoriamente')
              This.findClients()
              }else{
              This.$vToastify.error("Ha ocurrido un error eliminado cliente")
              }})
          .catch((error) => {
              This.$vToastify.error("Ha ocurrido un error: ", error)
          })
      },
      updateClient() {
        const This= this;
        const id = this.nuevaPersona.id
        const variablesParaPut = {
          nombre: This.nuevaPersona.nombre,
        }
        if(This.nuevaPersona.cedula.length){
          Object.assign(variablesParaPut, {
            cedula: This.nuevaPersona.cedula,
          })
        }
        axios
          .put(`http://localhost:4012/api/updateclient/${id}`,variablesParaPut)
          .then((res) => {
            if(res.status==200){
              This.$vToastify.success('Clientes actualizado satisfactoriamente')
              This.findClients()
              This.nuevaPersona = {
                nombre: '',
                cedula: '',
                id: '',
              };
            }else{
                This.$vToastify.error("Ha ocurrido un error actualizado cliente")
            }})
          .catch((error) => {
            This.$vToastify.error("Ha ocurrido un error: ", error)
          })
      }
    },
    mounted: function(){
      this.findClients();
    }
}
</script>
<style>
body {
  background: #36D1DC;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #5B86E5, #36D1DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.app-background {
  background-image: url('../assets/svgs/user.svg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: -50% 50%;
  background-size: 45rem;
}
</style>