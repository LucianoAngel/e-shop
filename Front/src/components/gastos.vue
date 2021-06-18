<template>
   <div id="app" class="container mt-5">
       <div class="alert alert-primary" role="alert">
            <h2 class="d-flex mx-auto text-dark">Gastos</h2>
            </div>
            <!-- Agregar productos -->
            <b-card>
                <h4 class="mx-auto">Agregar productos</h4>
                <input type="text" class="form-control my-3" placeholder="Ingrese el nombre del producto" v-model="producto.nombre">
                <input type="text" class="form-control my-3" placeholder="Marca del producto" v-model="producto.marca">
                <input type="number" class="form-control my-3" placeholder="Precio de compra por unidad" :min="0" v-model.number="producto.precioCompra">
                <input type="number" class="form-control my-3" placeholder="Precio de venta al público por unidad" :min="0"  v-model.number="producto.precioVenta">
                <input type="number" class="form-control my-3" placeholder="Cantidad de productos" :min="0" v-model.number="producto.cantidad">
                <b-card class="mt-3">
                  <h4 class="mx-auto">Metodo de pago</h4>
                  <b-form-select v-model="selectedMethod" :options="metodoDePago"></b-form-select>
                </b-card>
                <div class="d-flex">
                    <button class="btn btn-secondary ml-auto" @click="aggProduct">Agregar</button>
                </div>
            </b-card>
              <!-- Gastos -->
              <div class="container mt-3">
                <b-card>
                  <h3>Gastos</h3>
                    <b-card-group>
                        <div v-for="(gasto, I) in gastosTimeFormated" :key="gasto+I">
                        <b-card
                          :header="gasto.monto+' Bs.'"
                          :sub-title="gasto.metodoPago"
                          class="mb-2 ml-3 mr-3 mt-3"
                          tag="article"
                          img-top
                          style="max-width: 20rem;"
                          bg-variant="warning"
                          text-variant="white"
                        >
                            <b-card-text>
                              <ul>
                                <div v-for="(producto, i) in gasto.productos" :key="producto.nombre+i">
                                  <li>{{producto.nombre}} - {{producto.marca}} - {{producto.cantidad}}</li>
                                </div>
                              </ul>
                            </b-card-text>
                            <b-card-footer>
                              {{gasto.createdAt}}
                            </b-card-footer>
                        </b-card>
                    </div>
                    </b-card-group>
                      <b-card-footer>
                        <b-table responsive="sm" striped hover :items="totalGastos.gastosTable"></b-table>
                    </b-card-footer>
                </b-card>
              </div>
              <!-- inventario -->
              <div v-if="productos.length">
              <b-card class="mt-3">
                  <h4>Inventario</h4>
                  <div class="mt-3" v-for="(item, index) of productosTimeFormated">
                      <div class="alert alert-primary" role="alert">
                          <div class="d-flex justify-content-between align-items-center">
                              <div>
                              <b> Producto: </b>  {{item.nombre}} - <b>Precio de Venta:</b> {{item.precioVenta}} - Bs. <b>fecha: </b>  {{item.createdAt}} -
                              <b> Marca: </b> {{item.marca}} - <b> Unidades: </b> {{item.cantidad}}
                              </div>
                              <div>
                                  <button class="btn btn-danger btn-sm" @click="abrirModal(item._id, index)">Edit</button>
                                  <button class="btn btn-danger btn-sm" @click="deleteProduct(item._id)">x</button>
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
                        <b-col><b>Marca</b></b-col>
                        <b-col><b>Precio Bs:</b> </b-col>
                        <b-col><b>Unidades</b> </b-col>
                    </b-row>
                </b-container>
                <div class="mt-3" v-for="(item, index) of productos">
                    <b-container class="bv-example-row">
                    <b-row>
                        <b-col>{{item.nombre}}</b-col>
                        <b-col>{{item.marca}}</b-col>
                        <b-col>{{item.precioVenta}}</b-col>
                        <b-col>{{item.cantidad}}</b-col>
                    </b-row>
                </b-container>
                </div>
            </b-card>
            <b-modal
                id="modal-prevent-closing"
                v-model="openModal"
                @ok="handleOk"
                title="Ingresa nuevos datos del producto"  
                header-bg-variant="Black"
              >
                <form @submit.prevent="handleSubmit">
                  <b-form-group
                    label="Nombre:"  
                  >
                    <b-form-input v-model="newProducto.nombre" :placeholder="productos[indexProduct].nombre"></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Marca:"  
                  >
                    <b-form-input v-model="newProducto.marca" :placeholder="productos[indexProduct].marca"></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Precio de compra:"  
                  >
                    <b-form-input v-model="newProducto.precioCompra" :placeholder="productos[indexProduct].precioCompra"></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Precio de venta:"  
                  >
                    <b-form-input v-model="newProducto.precioVenta" :placeholder="productos[indexProduct].precioVenta"></b-form-input>
                  </b-form-group>
                </form>
              </b-modal>
            </div>
        </div>
</template>

<script>
import axios from "axios"

export default {
    name: 'Gastos',
    data(){
        return{
            moreProducts: false,
            countProducts: '',
            selectedMethod: null,
            productos: [],
            gastos: [],
            producto: {
                nombre: '',
                marca: '',
            },
            newProducto: {
                nombre: '',
                marca: '',
            },
            idProduct: '',
            openModal: false,
            indexProduct: 0,
            metodoDePago: [
                {value: null, text: 'Seleccione un metodo de pago'},
                {value: 'Efectivo', text: 'Efectivo'},
                {value: 'Transferencia', text: 'Transferencia'},
                {value: 'Pago Movil', text: 'Pago Movil'},
            ],
        }
    },
    computed: {
      gastosTimeFormated: function(val){
        if(!this.gastos){
          return
        }else{
          let gastos = this.gastos
          gastos.forEach(gasto => {
            const isoSplit = gasto.createdAt.split('T');
            const dateSplit = isoSplit[0].split('-')
            gasto.createdAt = `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}`
        })
        return gastos
        }
      },
      productosTimeFormated: function(val){
        if(!this.productos){
          return
        }else{
          let productos = this.productos
          productos.forEach(producto => {
          const isoSplit = producto.createdAt.split('T');
          const dateSplit = isoSplit[0].split('-')
          producto.createdAt = `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}`
        })
        return productos
        }
      },
      totalGastos: function(val){
        if(!this.gastos){
          return
        }else{
          let totalGastos = 0;
          let efectivo= 0;
          let transferencia= 0;
          let movil= 0;
          this.gastos.forEach(gasto => {
            const gastoInt = parseInt(gasto.monto)
            if(gasto.metodoPago == "Efectivo"){
              efectivo+= gastoInt
            }else if(gasto.metodoPago == "Transferencia"){
              transferencia+= gastoInt
            }else if(gasto.metodoPago == "Pago Movil"){
              movil+= gastoInt
            }
            totalGastos += gastoInt
          })
          const gastos= {
            msj:`Gastos totales: ${totalGastos}
              Compras realizadas: ${this.gastos.length}`,
            gastosTable: [{gastos_totales: totalGastos+" Bs.", compras_realizadas: this.gastos.length, gastos_en_efectivo:efectivo+" Bs.",  gastos_en_transferencia:transferencia+" Bs.",  gastos_en_pago_movil:movil+" Bs.", _rowVariant: "warning"}]
          };
          return gastos
        }
      }
    },
    methods: {
      abrirModal(id, index) {
          this.indexProduct= index;
          this.idProduct = id;
          this.openModal= true;
      },
      handleSubmit() {
        if(!this.newProducto.nombre || !this.newProducto.marca || !this.newProducto.precioCompra || !this.newProducto.precioVenta){
          return this.$vToastify.info('Llena todos los datos para continuar')
        }
          this.$nextTick(()=> {
            this.$bvModal.hide('modal-prevent-closing')
          })
          this.updateProduct();
      },
      handleOk(bvModalEvt) {
          bvModalEvt.preventDefault()
          this.handleSubmit();
      },
      aggProduct() {
        const This = this;
        const arrayDeProductos = [];
        let productoAEnviar = '';
        let productoToExpense= [];
        let rutaCreate = 'http://localhost:4012/api/createproduct';
        if((!this.producto.nombre || !this.producto.marca || !this.producto.precioCompra || !this.producto.precioVenta || !this.selectedMethod)
          || (this.moreProducts && this.countProducts == 0)){
          return This.$vToastify.info('Llena todos los datos para continuar')
        }
        if(this.moreProducts && this.countProducts){
             for (let index = 0; index < this.countProducts; index++) {
              arrayDeProductos.push(this.producto)
            }
            productoAEnviar = arrayDeProductos;
            productoToExpense = arrayDeProductos;
            rutaCreate = 'http://localhost:4012/api/createmanyproducts'
          }else {
            productoAEnviar = this.producto
            productoToExpense.push(this.producto)
        }
          axios
            .post(rutaCreate, productoAEnviar)
            .then((res) => {
                if(res.status==200){
                  This.aggExpense(productoToExpense, this.selectedMethod)
                  This.$vToastify.success('Producto agregado satisfactoriamente')
                  This.producto = {
                    nombre: '',
                    marca: '',
                  };
                  This.countProducts= '';
                }else{
                  This.$vToastify.error("Ha ocurrido un error")
                }})
            .catch((error) => {
                This.$vToastify.error(error)
            })
      },
      aggExpense(productos, metodoPago) {
        const This = this;
        const Producto = {
          productos,
          metodoPago,
        }
          axios
            .post('http://localhost:4012/api/createexpense', Producto)
            .then((res) => {
                if(res.status==200){
                  This.findExpenses()
                  This.$vToastify.success('Gasto agregado satisfactoriamente')
                  This.findProducts();
                }else{
                  This.$vToastify.error("Ha ocurrido un error agregado gastos")
                }})
            .catch((error) => {
                console.log(error)
                This.$vToastify.error(error)
            })
      },
      findProducts() {
        const This= this;
        axios
          .get('http://localhost:4012/api/findproducts')
          .then((res) => {
              if(res.status==200){
                This.productos = res.data;
              }else{
              This.$vToastify.error("Ha ocurrido un error obteniendo los productos")
              }})
          .catch((error) => {
              console.log(error)
              This.$vToastify.error(error)
          })
      },
      findExpenses() {
        const This= this;
        axios
          .get('http://localhost:4012/api/findexpenses')
          .then((res) => {
              if(res.status==200){
                This.gastos = res.data;
              }else{
                This.$vToastify.error("Ha ocurrido un error obteniendo los gastos")
              }})
          .catch((error) => {
              console.log(error)
              This.$vToastify.error(error)
          })
      },
      deleteProduct(id) {
        const This= this;
        axios
          .delete(`http://localhost:4012/api/deleteproduct/${id}`)
          .then((res) => {
              if(res.status==200){
                This.$vToastify.success('Producto eliminado satisfactoriamente')
                This.findProducts()
              }else{
                This.$vToastify.error("Ha ocurrido un error eliminado producto")
              }})
          .catch((error) => {
              console.log(error)
              This.$vToastify.error(error)
          })
      },
      updateProduct() {
        const This= this;
        const id = this.idProduct;
        if(!this.newProducto.nombre || !this.newProducto.marca || !this.newProducto.precioCompra || !this.newProducto.precioVenta){
          return This.$vToastify.info('Llena todos los datos para continuar')
        }
        axios
          .put(`http://localhost:4012/api/updateproduct/${id}`, This.newProducto)
          .then((res) => {
              if(res.status==200){
              This.$vToastify.success('Producto actualizado satisfactoriamente')
              This.findProducts()
              This.newProducto = {
                nombre: '',
                marca: '',
              };
              This.idProduct = '';
              }else{
              This.$vToastify.error("Ha ocurrido un error actualizado producto")
              }})
          .catch((error) => {
              console.log(error)
              This.$vToastify.error(error)
          })
      }
    },
    mounted: function(){
      this.findProducts();
      this.findExpenses();
    },
}
</script>