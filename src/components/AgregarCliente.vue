<template>
    <div  id="app" class="container mt-5">
        <div class="alert alert-primary" role="alert">
        <h2 class="d-flex text-center align-items-center text-dark">Agregar cliente</h2>
    </div>
    <!-- Seleccione la entidad y el nombre -->
        <b-card>
            <h3>Seleccione la Entidad</h3>
            <b-form-select v-model="selected" :options="entidad"></b-form-select>
            <h3 class="mt-2">Ingrese el nombre</h3>
            <input type="text" class="form-control my-3" v-model="nuevaPersona" v-on:keyup.enter="aggPersona" placeholder="Nombre">
            <button class="btn btn-primary" @click="aggPersona">Agregar</button>
        </b-card>
    <!-- Lista de personas -->
        <b-card class="mt-3">
            <div class="mt-3" v-for="(item, index) of personas">

            <div class="alert alert-primary" role="alert">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        Nombre de {{item.tipo}}:  {{item.nombre}} 
                         <!-- {{item.estado}} - {{item.tipo}} -->
                    </div>
                    <div>
                        <button class="btn btn-danger btn-sm" @click="Edit(x)">Edit</button>
                        <button class="btn btn-danger btn-sm" @click="Eliminar(index)">x</button>
                    </div>
                </div>
            </div>
        </div>
        </b-card>
        <!-- <div>
            <b-button v-b-modal.modal-1>Launch demo modal</b-button>

        <b-modal id="modal-1" title="BootstrapVue">
                <p class="my-4">Hello from modal!</p>
                <button>Boton que no hace nada</button>
                {{personaSeleccionadaIndex}}
        </b-modal>
        </div> -->
    </div>
</template>

<script>
export default {
    name:'agregar-cliente',
    data(){
        return{
            personas: [],
            nuevaPersona: '',
            selected: null,
            entidad: [
                {value: null, text: 'Seleccione una entidad'},
                {value: 'persona', text: 'Persona'},
                {value: 'empresa', text: 'Empresa'},
            ],
        }
    },
    methods: {
        aggPersona: function(){
            this.personas.push({
                nombre: this.nuevaPersona,
                estado: false,
                tipo: this.selected,
            });
            this.nuevaPersona= '';
            localStorage.setItem('clientes-vue', JSON.stringify(this.personas));
        },
        Eliminar: function(index){
            this.personas.splice(index, 1)
            localStorage.setItem('clientes-vue', JSON.stringify(this.personas));
        },
    },
    created: function(){
        let datosLocal = JSON.parse(localStorage.getItem('clientes-vue'));
        if(datosLocal === null){
            this.personas = [];
        }else{
            this.personas = datosLocal;
        }
    }
}
</script>