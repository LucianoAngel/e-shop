<template>
  <div class="app-background">
   <div id="app" class="container mt-5">
       <!-- titulo -->
      <div class="alert alert-primary" role="alert">
          <h2 class="d-flex mx-auto text-dark">Cobranza</h2>
      </div>
       <!-- realizar una venta -->
      <b-card>
          <h4 class="mx-auto">Realizar una Venta</h4>
          <p><b>Seleccione el cliente</b></p>
          <b-form-select
            v-model="selectedPerson"
            class="mb-3"
          >
            <option v-if="allClients.length" :value="null">Selecciona un cliente</option>
            <option v-else :value="null">No existe ningún cliente</option>
            <option v-for="(cliente, i) in allClients" :key="cliente.nombre+i" :value="cliente">
              {{cliente.nombre}} {{cliente.cedula ? ' - C.I: '+cliente.cedula : ''}}
            </option>
          </b-form-select>
          <p><b>Seleccione un producto</b></p>
          <b-form-select
            v-model="selectedProduct"
            class="mb-3"
          >
            <option v-if="productos.length" :value="null">Selecciona un producto</option>
            <option v-else :value="null">No existe ningún producto</option>
            <option v-for="(producto, i) in productos" :key="producto.nombre+i" :value="producto">
              {{producto.nombre}} - {{producto.marca}} - precio: {{producto.precioVenta}} Bs. - cantidad disponible: {{producto.cantidad}}
            </option>
          </b-form-select>
          <div class="d-flex align-items-center border">
              <input type="number" class="form-control my-3" placeholder="Ingrese la Cantidad" v-model="count">
              <b-button variant="outline-success" @click="aggProducto(selectedProduct, selectedPerson)"><b-icon icon="check"></b-icon> Agregar a caja</b-button>
          </div>
      </b-card>
       <div v-if="productosEnCaja.length">
          <b-card class="mt-3">
            <h4>Lista de productos en caja</h4>
            <p><b>Productos en Caja</b></p>
            <b-container class="bv-example-row">
                <b-row>
                    <b-col><b>Nombre del producto</b></b-col>
                    <b-col><b>Marca</b></b-col>
                    <b-col><b>Precio Bs:</b> </b-col>
                    <b-col><b>Unidades</b> </b-col>
                </b-row>
            </b-container>
            <div class="mt-3" v-for="(item, index) of productosEnCaja">
              <b-container class="bv-example-row">
                  <b-row>
                      <b-col>{{item.nombre}}</b-col>
                      <b-col>{{item.marca}}</b-col>
                      <b-col>{{item.precioVenta}}</b-col>
                      <b-col>{{item.cantidad}}</b-col>
                  </b-row>
              </b-container>
            </div>
            <b-container class="bv-example-row">
                <b-row>
                    <b-col><p><b>Cantidad de productos: </b></p>{{cantidadProductos}}</b-col>
                    <b-col></b-col>
                    <b-col><p><b>Monto total a pagar: </b></p>{{precioProductos}}</b-col>
                </b-row>
            </b-container>
            <!-- metodo de pago -->
            <b-card class="mt-3">
                <h4 class="mx-auto">Metodo de pago</h4>
                <b-form-select v-model="selectedMethod" :options="metodoDePago"></b-form-select>
            </b-card>
            <!-- Boton de Crear factura -->
            <b-button @click="crearFactura()">Crear Factura</b-button>
          </b-card>
       </div>
       <div v-if="productos.length">
          <b-card class="mt-3 mb-3">
            <h3>Lista de Precios </h3>
                <p><b>Productos en stock</b></p>
              <b-container class="bv-example-row">
                  <b-row>
                      <b-col><b>Nombre del producto</b></b-col>
                      <b-col><b>Marca</b></b-col>
                      <b-col><b>Unidades</b></b-col>
                      <b-col><b>Precio Bs:</b> </b-col>
                  </b-row>
              </b-container>
              <div class="mt-3" v-for="(item, index) of productos">
                  <b-container class="bv-example-row">
                  <b-row>
                      <b-col>{{item.nombre}}</b-col>
                      <b-col>{{item.marca}}</b-col>
                      <b-col>{{item.cantidad}}</b-col>
                      <b-col>{{item.precioVenta}}</b-col>
                  </b-row>
              </b-container>
              </div>
        </b-card>
       </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
    name: 'Inventario',
    data(){
        return{
            selectedPerson: null,
            selectedProduct: null,
            selectedMethod: null,
            productos: [],
            personas: [],
            empresas: [],
            count: 1,
            productosEnCaja: [],
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
      aggProducto(producto, personaId) {
        if(!personaId)return this.$vToastify.info("Selecciona un cliente para continuar")
        if(producto.cantidad < this.count){
          return this.$vToastify.info("Despacio, no tenemos tantos productos")
        }
        // Actualizar cantidad de productos
        let filtrarProducto = false;
        this.productos.map(p => {
          const productoIndividual = p
          if(p._id === producto._id){
            if(productoIndividual.cantidad - this.count){
              productoIndividual.cantidad = productoIndividual.cantidad - this.count
            } else {
              filtrarProducto = true
            }
          }
          return productoIndividual
        })
        // Si la cantidad de producto es 0 se remueve de la lista de productos
        if(filtrarProducto){
          this.productos = this.productos.filter(p => p._id != producto._id)
        }
        this.agregarACaja(producto._id, this.count)
      },
      agregarACaja(productoId, cantidad) {
        // adaptar a API
        const This= this;
        axios
          .post('http://localhost:4012/api/aggacaja', {
            productoId,
            cantidad
          })
          .then((res) => {
            if(res.status==200){
              This.productosEnCaja = res.data;
              This.$vToastify.success('Productos agregados a caja satisfactoriamente')
              This.findProducts();
              This.findCaja();
            }else{
              This.$vToastify.error("Ha ocurrido un error agregando a caja")
            }})
          .catch((error) => {
              console.log(error)
              This.$vToastify.error(error)
          })
      },
      crearFactura(id) {
        const This= this;
        const metodoPago = this.selectedMethod;
        let pagado = false;
        if(!this.selectedPerson){
          return this.$vToastify.info("Despacio, selecciona un cliente antes de continuar")
        }
        if(!this.selectedMethod){
          return this.$vToastify.info("Despacio, selecciona un metodo de pago antes de continuar")
        }
        if(!metodoPago == "Pendiente"){
          pagado = true
        }
        axios
          .post('http://localhost:4012/api/createbill', {
            idPersona: this.selectedPerson._id,
            pagado,
            metodoPago,
            monto: This.precioProductos,
          })
          .then((res) => {
              if(res.status==200){
              This.productosEnCaja = res.data;
              This.$vToastify.success('Factura creada satisfactoriamente')
              }else{
              This.$vToastify.error("Ha ocurrido un error creando la factura")
              }})
          .catch((error) => {
              console.log(error)
              This.$vToastify.error(error)
          })
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
      findCaja() {
      const This= this;
      axios
        .get('http://localhost:4012/api/findCaja')
        .then((res) => {
            if(res.status==200){
              This.productosEnCaja = res.data.productos;
            }else{
            This.$vToastify.error("Ha ocurrido un error obteniendo los productos")
            }})
        .catch((error) => {
            console.log(error)
        })
      },
    },
    mounted: function(){
      this.findProducts();
      this.findClients();
      this.findCaja();
    },
    computed: {
      // Concatena personas con emrpesas
      allClients: function(){
        if(this.personas.length || this.empresas.length){
          const allclients = this.personas.concat(this.empresas)
          return allclients
        }else return []
      },
      cantidadProductos: function(){
          if(!this.productosEnCaja.length){
            return
          }
          let count = 0;
          this.productosEnCaja.forEach(p => {
            count = count + p.cantidad
          });
          return count
      },
      precioProductos: function(){
          if(!this.productosEnCaja.length){
            return
          }
          let precio = 0;
          this.productosEnCaja.forEach(e => {
            const precioVenta = parseInt(e.precioVenta)
            precio= precio + precioVenta
          });
          return precio
      },
    },
}
</script>
<style>
  body {
    background: #36D1DC;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #5B86E5, #36D1DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .app-background {
    background-image: url('../assets/svgs/list.svg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: -50% 50%;
    background-size: 40rem;
  }
</style>