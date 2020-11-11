<template>
   <div id="app" class="container mt-5">
       <div class="alert alert-primary" role="alert">
            <h2 class="d-flex mx-auto text-dark">{{ message }}</h2>
            </div>
            <!-- Agregar productos -->
            <b-card>
                <h4 class="mx-auto">{{ messageDos }}</h4>
                <input type="text" class="form-control my-3" placeholder="Ingrese el producto" v-model="nuevoProducto">
                <input type="number" class="form-control my-3" placeholder="Ingrese la cantidad" v-model="cantidad">
                <div class="d-flex">
                    <button class="btn btn-secondary ml-auto" @click="aggProductoTemp">Agregar</button>
                </div>
            </b-card>
            <!-- agregar precios -->
            <b-card class="mt-3">
                <h4 class="mx-auto">{{ messageTres }}</h4>
                <b-form-select v-model="selected" :options="productosTemp"></b-form-select>
                <div class="d-flex align-items-center">
                    <input type="number" class="form-control my-3" placeholder="Ingrese Precio" v-model="precio">
                    <button class="btn btn-primary ml-auto" @click="aggProducto">✔️</button>
                </div>
            </b-card>
            <!-- inventario -->
            <b-card class="mt-3">
                <h4>Inventario</h4>
                <div class="mt-3" v-for="(item, index) of productos">
                    <div class="alert alert-primary" role="alert">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                            <b> Producto: </b>  {{item.nombre}} <b>Cantidad:</b> {{item.cantidad}} <b>Precio: </b>  {{item.precio}} Bs.
                            </div>
                            <div>
                                <button class="btn btn-danger btn-sm" @click="Eliminar(index)">x</button>
                            </div>
                        </div>
                    </div>
                </div>
            </b-card>
            <!-- Lista de precios -->
            <b-card class="mt-3 mb-3">
                <h3>Lista de Precios </h3>
                <b-container class="bv-example-row">
                    <b-row>
                        <b-col><b>Nombre del producto</b></b-col>
                        <b-col><b>Precio Bs:</b> </b-col>
                    </b-row>
                </b-container>
                <div class="mt-3" v-for="(item, index) of precios">
                    <b-container class="bv-example-row">
                    <b-row>
                        <b-col>{{item.nombre}}</b-col>
                        <b-col>{{item.precio}}</b-col>
                    </b-row>
                </b-container>
                </div>
            </b-card>
        </div>
</template>

<script>
export default {
    name: 'Inventario',
    data(){
        return{
            selected: null,
            message: 'Inventario',
            messageDos: 'Agregar productos',
            messageTres: 'Agregar precios',
            productosTemp: [],
            productos: [],
            precios:[
                {nombre: 'Cigarros Beltmon', precio: 800000},
                {nombre: 'Fructus', precio: 80000},
            ],
            nuevoProducto: '',
            cantidad: '',
            precio: '',
        }
    },
    methods: {
        aggProductoTemp:async function(){
            this.productosTemp.push({
                nombre: this.nuevoProducto,
                cantidad: this.cantidad,
                value: this.nuevoProducto,
                text: this.nuevoProducto,
            });
            await localStorage.setItem('productos-vue-temp', JSON.stringify(this.productosTemp));
        },
        aggProducto: function(){
            this.productos.push({
                nombre: this.nuevoProducto,
                cantidad: this.cantidad,
                value: this.nuevoProducto,
                text: this.nuevoProducto,
                precio: this.precio,
            });
            this.nuevoProducto= '';
            this.cantidad= '';
            this.precio= '';
            this.selected= null;
            localStorage.setItem('productos-vue', JSON.stringify(this.productos));
        },
        Eliminar: function(index){
            console.log('se va a eliminar');
            console.log(index);
            this.productos.splice(index, 1)
            localStorage.setItem('productos-vue', JSON.stringify(this.productos));
        }
        },
        created: function(){
            let datosLocalProdInv = JSON.parse(localStorage.getItem('productos-vue'));
            if(datosLocalProdInv === null){
                this.productos = [];
            }else{
                this.productos = datosLocalProdInv;
            };
            let datosLocalProdInvTemp = JSON.parse(localStorage.getItem('productos-vue-temp'));
            if(datosLocalProdInvTemp === null){
                this.productosTemp = [];
            }else{
                this.productosTemp = datosLocalProdInvTemp;
            }
            localStorage.setItem('productos-precios-vue', JSON.stringify(this.precios));
            let datosLocalProdPrecios = JSON.parse(localStorage.getItem('productos-precios-vue'));
            if(datosLocalProdInv === null){
                this.precios = [];
            }else{
                this.precios = datosLocalProdPrecios;
            };
        },
}
</script>