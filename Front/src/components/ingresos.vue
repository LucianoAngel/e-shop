<template>
   <div id="app" class="container mt-5">
       <div class="alert alert-primary" role="alert">
            <h2 class="d-flex mx-auto text-dark">Ingresos</h2>
            </div>
              <!-- Ingresos -->
              <div class="container mt-3">
                <b-card>
                  <h3>Ingresos</h3>
                    <b-card-group>
                        <div v-for="(gasto, I) in facturasTimeFormated" :key="gasto+I">
                        <b-card
                          :header="gasto.monto+' Bs.'"
                          :sub-title="gasto.metodoPago"
                          class="mb-2 ml-3 mr-3 mt-3"
                          tag="article"
                          img-top
                          style="max-width: 15rem;"
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
                        <b-table responsive="sm" striped hover :items="totalFacturas.ingresosTable"></b-table>
                    </b-card-footer>
                </b-card>
              </div>
              <div class="container mt-3">
                <b-card>
                  <h3>Facturas por cobrar</h3>
                    <b-card-group>
                        <div v-for="(gasto, I) in facturasTimeFormatedPendiente" :key="gasto+I">
                        <b-card
                          :header="gasto.monto+' Bs.'"
                          :sub-title="gasto.metodoPago"
                          class="mb-2 ml-3 mr-3 mt-3"
                          tag="article"
                          img-top
                          style="max-width: 15rem;"
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
                        <b-table responsive="sm" striped hover :items="facturasPorCobrar.ingresosTable"></b-table>
                    </b-card-footer>
                </b-card>
              </div>
        </div>
</template>

<script>
import axios from "axios"

export default {
    name: 'Ingresos',
    data(){
        return{
            facturas: [],
            metodoDePago: [
                {value: null, text: 'Seleccione un metodo de pago'},
                {value: 'Efectivo', text: 'Efectivo'},
                {value: 'Transferencia', text: 'Transferencia'},
                {value: 'Pago Movil', text: 'Pago Movil'},
            ],
        }
    },
    computed: {
      facturasTimeFormated: function(val){
        if(!this.facturas){
          return
        }else{
          const propiedadAFiltrar = "Pendiente"
          let facturas = this.facturas.filter(e => !propiedadAFiltrar.includes(e.metodoPago))
          facturas.forEach(gasto => {
            const isoSplit = gasto.createdAt.split('T');
            const dateSplit = isoSplit[0].split('-')
            gasto.createdAt = `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}`
        })
        return facturas
        }
      },
      facturasTimeFormatedPendiente: function(val){
        if(!this.facturas){
          return
        }else{
          const propiedadAFiltrar = "Pendiente"
          let facturas = this.facturas.filter(e => propiedadAFiltrar.includes(e.metodoPago))
          facturas.forEach(gasto => {
            const isoSplit = gasto.createdAt.split('T');
            const dateSplit = isoSplit[0].split('-')
            gasto.createdAt = `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}`
        })
        return facturas
        }
      },
      totalFacturas: function(val){
        if(!this.facturas){
          return
        }else{
          let totalFacturas = 0;
          let efectivo= 0;
          let transferencia= 0;
          let movil= 0;
          this.facturasTimeFormated.forEach(factura => {
            const facturaInt = parseInt(factura.monto)
            if(factura.metodoPago == "Efectivo"){
              efectivo+= facturaInt
            }else if(factura.metodoPago == "Transferencia"){
              transferencia+= facturaInt
            }else if(factura.metodoPago == "Pago Movil"){
              movil+= facturaInt
            }
            totalFacturas += facturaInt
          })
          const ingresos= {
            msj:`Ingresos totales: ${totalFacturas}
              Facturas realizadas: ${this.facturasTimeFormated.length}`,
            ingresosTable: [{ingresos_totales: totalFacturas+" Bs.", facturas_realizadas: this.facturasTimeFormated.length, ingresos_en_efectivo:efectivo+" Bs.",  ingresos_en_transferencia:transferencia+" Bs.",  ingresos_en_pago_movil:movil+" Bs.", _rowVariant: "warning"}]
          };
          return ingresos
        }
      },
      facturasPorCobrar: function(val){
        if(!this.facturas){
          return
        }else{
          let totalFacturas = 0;
          this.facturasTimeFormatedPendiente.forEach(factura => {
            const facturaInt = parseInt(factura.monto)
            if(factura.metodoPago == "Efectivo"){
              efectivo+= facturaInt
            }else if(factura.metodoPago == "Transferencia"){
              transferencia+= facturaInt
            }else if(factura.metodoPago == "Pago Movil"){
              movil+= facturaInt
            }
            totalFacturas += facturaInt
          })
          const ingresos= {
            msj:`Por cobrar: ${totalFacturas}
              Facturas pendientes: ${this.facturasTimeFormated.length}`,
            ingresosTable: [{monto_total: totalFacturas+" Bs.", facturas_pendientes: this.facturasTimeFormatedPendiente.length, _rowVariant: "warning"}]
          };
          return ingresos
        }
      }
    },
    methods: {
      findBills() {
        const This= this;
        axios
          .get('http://localhost:4012/api/findbills')
          .then((res) => {
              if(res.status==200){
                This.facturas = res.data;
              }else{
                This.$vToastify.error("Ha ocurrido un error obteniendo las facturas")
              }})
          .catch((error) => {
              This.$vToastify.error(error)
          })
      },
    },
    mounted: function(){
      this.findBills();
    },
}
</script>