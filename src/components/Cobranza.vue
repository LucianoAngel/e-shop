<template>
   <div id="app" class="container mt-5">
       <!-- titulo -->
       <div class="alert alert-primary" role="alert">
            <h2 class="d-flex mx-auto text-dark">{{ message }}</h2>
        </div>
       <!-- realizar una venta -->
       <b-card>
            <h4 class="mx-auto">{{ messageDos }}</h4>
                <b-form-select v-model="selected" :options="productosEnInventario"></b-form-select>
                <div class="d-flex align-items-center border">
                    <input type="number" class="form-control my-3" placeholder="Ingrese la Cantidad" v-model="cantidad">
                    <button class="btn btn-primary ml-auto" @click="aggProducto">✔️</button>
                </div>
       </b-card>
        <b-card class="mt-3">
            <h4>Lista de productos</h4>
            <div class="mt-3" v-for="(item, index) of productosEnCaja">
                    <div class="alert alert-primary" role="alert">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                Producto: {{item.nombre}} Cantidad: {{item.cantidad}} Precio: {{item.precio}} Bs.
                            </div>
                            <div>
                                <button class="btn btn-danger btn-sm" @click="Eliminar(index)">x</button>
                            </div>
                        </div>
                    </div>
                </div>
        </b-card>
       <!-- metodo de pago -->
       <b-card class="mt-3">
                <h4 class="mx-auto">{{ messageTres }}</h4>
                <b-form-select v-model="selectedDos" :options="metodoDePago"></b-form-select>
       </b-card>
         <!-- Total -->
         <b-card class="mt-3">
                <h3>Factura: </h3>
                <b-container class="bv-example-row">
                    <b-row>
                        <b-col><b>Nombre del producto</b></b-col>
                        <b-col><b>Cantidad # : </b></b-col>
                        <b-col><b>Precio Bs:</b> </b-col>
                    </b-row>
                </b-container>
                <div class="mt-3" v-for="(item, index) of productosEnCaja">
                    <b-container class="bv-example-row">
                    <b-row>
                        <b-col>{{item.nombre}}</b-col>
                        <b-col>{{item.cantidad}}</b-col>
                        <b-col>{{item.precio}}</b-col>
                    </b-row>
                    </b-container>
                </div>
                <button class="btn btn-primary btn-lg btn-block mt-3 mb-3" @click="aggPersona">Agregar</button>
         </b-card>
         <!-- prueba lista de precios -->
         <div class="mt-3" v-for="(item, index) of productosPrecios" :key="item.id">
                    <b-container class="bv-example-row">
                    <b-row>
                        <b-col>{{item.nombre}}</b-col>
                        <b-col>{{item.cantidad}}</b-col>
                        <b-col>{{item.precio}}</b-col>
                    </b-row>
                    </b-container>
                </div>
    </div>
</template>

<script>
export default {
    name: 'Inventario',
    data(){
        return{
            selected: null,
            selectedDos: null,
            message: 'Cobranza',
            messageDos: 'Realizar una Venta',
            messageTres: 'Metodo de pago',
            productosEnCaja: [],
            productosEnInventario:[],
            productosPrecios: [],
            cantidad: '',
            metodoDePago: [ 
                {value: null, text: 'Seleccione un metodo de pago'},
                {value: 'Efectivo', text: 'Efectivo'},
                {value: 'Transferencia', text: 'Transferencia'},
                {value: 'Pago Movil', text: 'Pago Movil'},
                {value: 'Pendiente', text: 'Pendiente'},
            ],
        }
    },
    methods: {
        aggProducto: async function(){
            this.productosEnCaja.push({
                nombre: this.selected,
                cantidad: this.cantidad,
                precio: this.precios.nombre,
            });
            this.cantidad= '';
            this.precio= '';
            this.selected= null;
            await localStorage.setItem('productos-caja-vue', JSON.stringify(this.productosEnCaja));
        },
        Eliminar: function(index){
            this.productosEnCaja.splice(index, 1)
            localStorage.setItem('productos-caja-vue', JSON.stringify(this.productosEnCaja));
        }
        },
        created: function(){
            let datosLocalProdInv = JSON.parse(localStorage.getItem('productos-vue'));
            if(datosLocalProdInv === null){
                this.productosEnInventario = [];
            }else{
                this.productosEnInventario = datosLocalProdInv;
            }
            let datosLocalProdCaja = JSON.parse(localStorage.getItem('productos-caja-vue'));
            if(datosLocalProdCaja === null){
                this.productosEnCaja = [];
            }else{
                this.productosEnCaja = datosLocalProdInv;
            }
            let datosLocalProdPrecios = JSON.parse(localStorage.getItem('productos-precios-vue'));
            if(datosLocalProdPrecios === null){
                this.productosPrecios = [];
            }else{
                this.productosPrecios = datosLocalProdInv;
            }
        },
}
</script>