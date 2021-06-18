<template>
<div class="app-background">
  <div id="app" class="container mt-5">
    <div class="alert alert-primary" role="alert">
      <h2 class="d-flex mx-auto text-dark">Historial de venta</h2>
    </div>
    <div>
      <div>
        <!-- {{allClients.duplicado}} -->
          <b-card>
            <h4><b>Operaciones pendientes</b></h4>
            <b-card-group  v-if="allClients.billsFalse">
              <div v-for="(item, index) of allClients.billsFalse" :key="item+index">
                <b-card
                class="mb-2 ml-3 mr-3 mt-3"
                tag="article"
                img-top
                style="max-width: 25rem;"
                bg-variant="info"
                text-variant="white"
                :title="item.nombre"
                >
                  <b-card-text class="text-white">
                    <b-container class="bv-example-row">
                        <b-row>
                            <b-col><b>Producto</b></b-col>
                            <b-col><b>Marca</b></b-col>
                            <b-col><b>Precio Bs:</b> </b-col>
                          <b-col><b>Unidades</b> </b-col>
                        </b-row>
                    </b-container>
                    <div class="mt-3" v-for="(Item, Index) of item.productos" :key="Item+Index">
                      <b-container class="bv-example-row">
                          <b-row>
                              <b-col>{{Item.nombre}}</b-col>
                              <b-col>{{Item.marca}}</b-col>
                              <b-col>{{Item.precioVenta}}</b-col>
                            <b-col>{{Item.cantidad}}</b-col>
                          </b-row>
                      </b-container>
                    </div>
                    <b-container class="bv-example-row">
                        <b-row class="mt-5">
                            <b-col><p><b>Metodo de pago: </b></p>{{item.metodoPago}}</b-col>
                            <b-col><p><b>Fecha: </b></p>{{item.createdAt}}</b-col>
                            <b-col><p><b>Cantidad de productos: </b></p>{{item.count}}</b-col>
                            <b-col><p><b>Monto toal Bs: </b></p>{{item.monto}}</b-col>
                        </b-row>
                    </b-container>
                  </b-card-text>
                  <b-button @click="abrirModal(item._id, index, 'billsFalse')" variant="info" target="_blank"> 
                      Modificar
                  </b-button>
                </b-card>
              </div>
              </b-card-group>
              <b-card-footer v-if="allClients.billsFalse && allClients.billsFalse.length">
                  <b-table responsive="sm" striped hover :items="allClients.gastosTablePending"></b-table>
              </b-card-footer>
              <h4 v-else>Sin operaciones pendientes</h4>
            </b-card>
      </div>
      <div class="mt-3">
        <b-card>
          <h4><b>Operaciones realizadas</b></h4>
          <b-card-group v-if="allClients.billsTrue">
            <div v-for="(item, index) of allClients.billsTrue" :key="item+index">
              <b-card
              class="mb-2 ml-3 mr-3 mt-3"
              tag="article"
              img-top
              style="max-width: 25rem;"
              bg-variant="success"
              text-variant="white"
              :title="item.nombre"
              >
              <!-- {{item}} -->
                <b-card-text class="text-white">
                  <b-container class="bv-example-row">
                      <b-row>
                          <b-col><b>Producto</b></b-col>
                          <b-col><b>Marca</b></b-col>
                          <b-col><b>Precio Bs:</b> </b-col>
                          <b-col><b>Unidades</b> </b-col>
                      </b-row>
                  </b-container>
                  <div class="mt-3" v-for="(Item, Index) of item.productos" :key="Item+Index">
                    <b-container class="bv-example-row">
                        <b-row>
                            <b-col>{{Item.nombre}}</b-col>
                            <b-col>{{Item.marca}}</b-col>
                            <b-col>{{Item.precioVenta}}</b-col>
                            <b-col>{{Item.cantidad}}</b-col>
                        </b-row>
                    </b-container>
                  </div>
                  <b-container class="bv-example-row">
                      <b-row>
                          <b-col><p><b>Metodo de pago: </b></p>{{item.metodoPago}}</b-col>
                          <b-col><p><b>Fecha: </b></p>{{item.createdAt}}</b-col>
                          <b-col><p><b>Cantidad de productos: </b></p>{{item.count}}</b-col>
                          <b-col><p><b>Monto total Bs: </b></p>{{item.monto}}</b-col>
                      </b-row>
                  </b-container>
                </b-card-text>
                <b-button @click="abrirModal(item._id, index, 'billsTrue')" variant="success" target="_blank"> 
                    Modificar
                </b-button>
              </b-card>
            </div>
          </b-card-group>
          <b-card-footer v-if="allClients.billsTrue">
            <b-table responsive="sm" striped hover :items="allClients.gastosTableApproved"></b-table>
          </b-card-footer>
          <h4 v-else>Sin operaciones realizadas</h4>
        </b-card>
        <div v-if="facturasModal.length">
          <b-modal
            id="modal-prevent-closing"
            v-model="openModal"
            @ok="handleOk"
            title="Ingresa nuevos datos de la factura"
            header-bg-variant="Black"
          >
            <form @submit.prevent="handleSubmit">
              <b-form-group
                label="Monto:"
              >
                <b-form-input v-model="newFactura.monto" :placeholder="facturasModal[indexFactura].monto"></b-form-input>
              </b-form-group>
              <b-form-group
                label="Metodo de pago:"
              >
                <b-form-input v-model="newFactura.metodoPago" :placeholder="facturasModal[indexFactura].metodoPago"></b-form-input>
              </b-form-group>
            </form>
        </b-modal>
        </div>
     </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios"

export default {
    name: 'HistorialDeVenta',
    data(){
        return{
            bills: [],
            clientsNatural:[],
            clientsEmpresarial:[],
            BillsComputedTrue: [],
            BillsComputedFalse: [],
            openModal: false,
            indexFactura: 0,
            facturasModal: [],
            idFactura: '',
            newFactura: {
              monto: '',
              metodoPago: '',
            }
        }
    },
     computed: {
      allClients: function(val) {
          if(!this.clientsNatural.length && !this.clientsEmpresarial.length){
              return []
          }else {
              let historicBills = {
                pending: {
                  total: 0,
                },
                approved: {
                  total: 0,
                  methods:{
                    efectivo: 0,
                    pagoMovil: 0,
                    transferencia: 0
                  }
                }
            };
            const clients = this.clientsNatural.concat(this.clientsEmpresarial);
            const all = [];
            const billsTrue = [];
            const billsFalse = [];
            clients.forEach(e => {
              const name = e.nombre
              e.facturas.forEach(factura => {
                // Dar formato a la hora
                const isoSplit = factura.createdAt.split('T');
                const dateSplit = isoSplit[0].split('-')
                factura.createdAt = `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}`
                // Obtener estadisticas de todas las facturas
                const montoInt = parseInt(factura.monto)
                if(factura.pagado){
                    if(factura.metodoPago == "Efectivo"){
                      historicBills.approved.methods.efectivo+= montoInt
                    }else if(factura.metodoPago == "Transferencia"){
                      historicBills.approved.methods.transferencia+= montoInt
                    }else if(factura.metodoPago == "Pago Movil"){
                        historicBills.approved.methods.pagoMovil+= montoInt
                    }
                    historicBills.approved.total += montoInt
                }else{
                    historicBills.pending.total += montoInt
                }
                // Separar facturas
                const newFactura = Object.assign(factura, {nombre: name})
                all.push(newFactura)
              })
            });
            all.forEach((bill) => {
              if(bill.pagado === true){
                billsTrue.push(bill)
              }else billsFalse.push(bill)
            });
            // Stackear productos en BillsTrue
            // let duplicado = [];
            // billsTrue.forEach(e => {
            //     const stack = e.productos.reduce((acc, producto) => {
            //       // const clave = JSON.stringify(producto);
            //       acc[producto.nombre] = ++acc[producto.nombre] || 0;
            //       return acc;
            //       },{});
            //     const duplicados = e.productos.filter( producto => {
            //       return stack[producto.nombre]
            //     })
            //     duplicado = duplicados
            // })
            
            // FIN STACK
            const SplitAndEstatics = {
              billsTrue,
              billsFalse,
              // duplicado,
              gastosTablePending: [
                {
                  monto_pendiente: historicBills.pending.total+" Bs.",
                  _rowVariant: "info"
                },
              ],
              gastosTableApproved: [
                {
                  monto_aprobado: historicBills.approved.total+" Bs.",
                  facturas_aprobadas: billsTrue.length,
                  aprobado_en_efectivo: historicBills.approved.methods.efectivo+" Bs.",
                  aprobado_en_transferencia: historicBills.approved.methods.transferencia+" Bs.",
                  aprobado_en_pago_movil: historicBills.approved.methods.pagoMovil+" Bs.",
                  _rowVariant: "success"
                },
              ]
            }
            return SplitAndEstatics
          }
      },
      Stack: function(val) {
        // corregir esta computed
        if(!this.allClients.length){
            return []
        }else {
          const stack = this.allClients.reduce((acc, client) => {
            const clave = JSON.stringify(client);
            acc[clave] = ++acc[clave] || 0;
            return acc;
          },{});
          const duplicados = this.allClients.filter
        }
      }
    },
    methods: {
      abrirModal(id, index, modal) {
        if(modal === "billsTrue"){
          this.facturasModal = this.allClients.billsTrue;
        }else {
          this.facturasModal = this.allClients.billsFalse;
        }
          this.indexFactura= index;
          this.idFactura = id;
          this.openModal= true;
      },
      handleSubmit() {
        if(!this.newFactura.monto || !this.newFactura.metodoPago){
          return this.$vToastify.info('Llena todos los datos para continuar')
        }
          this.$nextTick(()=> {
            this.$bvModal.hide('modal-prevent-closing')
          })
          this.updateFactura();
      },
      handleOk(bvModalEvt) {
          bvModalEvt.preventDefault()
          this.handleSubmit();
      },
      findClients() {
        const This= this;
        axios
          .get('http://localhost:4012/api/findclients')
          .then((res) => {
              if(res.status == 200){
                This.clientsNatural = res.data.persona;
                This.clientsEmpresarial = res.data.empresa;
              }else{
                This.$vToastify.error("Ha ocurrido un error obteniendo los clientes")
              }})
          .catch((error) => {
              This.$vToastify.error(error)
          })
      },
      updateFactura() {
        const This= this;
        const id = this.idFactura;
        axios
          .put(`http://localhost:4012/api/updatefactura/${id}`, This.newFactura)
          .then((res) => {
              if(res.status==200){
              This.$vToastify.success('Factura actualizada satisfactoriamente')
              This.findBills()
              This.newProducto = {
                monto: '',
                metodoPago: '',
              };
              This.idFactura = '';
              }else{
              This.$vToastify.error("Ha ocurrido un error actualizado factura")
              }})
          .catch((error) => {
              This.$vToastify.error(error)
          })
      }
    },
    mounted: async function(){
      await this.findClients();
    },
}
</script>
<style>
body{
  background: #36D1DC;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #5B86E5, #36D1DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.app-background {
  background-image: url('../assets/svgs/technical-support.svg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: -50% 50%;
  background-size: 35rem;
}
</style>
</style>