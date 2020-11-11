<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">

        <b-navbar-brand href="#">Angel E-Shop</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

         <b-collapse id="nav-collapse" is-nav>

             <b-navbar-nav>
                <b-nav-item to="/agregar-cliente" exact>Agregar Cliente</b-nav-item>
                <b-nav-item to="/cobranza">Cobranza</b-nav-item>
                <b-nav-item to="/inventario">Inventario</b-nav-item>
                <b-nav-item>Historial de Venta</b-nav-item>
                <b-nav-item>Ingresos</b-nav-item>
                <b-nav-item>Gastos</b-nav-item>
            </b-navbar-nav>

         </b-collapse>

        </b-navbar>

    </div>
</template>

<script>
export default {
    name:'Navbar'
}
</script>