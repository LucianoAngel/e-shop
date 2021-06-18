<template>
    <div>
        <b-navbar toggleable="lg" type="success" variant="light">
        <b-navbar-brand href="/">AE-Shop</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"> <b-icon icon="three-dots" variant="info"></b-icon></b-navbar-toggle>
         <b-collapse id="nav-collapse" is-nav>
             <b-navbar-nav v-if="$route.name !== 'Principal' && $route.name !== 'InicioSesion' && $route.name !== 'Registro'">
                <b-nav-item to="/agregar-cliente" exact><b-icon icon="person-badge"></b-icon> Agregar Cliente</b-nav-item>
                <b-nav-item to="/cobranza"><b-icon icon="receipt"></b-icon> Cobranza</b-nav-item>
                <b-nav-item to="/inventario">Inventario</b-nav-item>
                <b-nav-item to="/historial-de-venta"><b-icon icon="list-task"></b-icon> Historial de Venta</b-nav-item>
                <b-nav-item to="/ingresos">Ingresos</b-nav-item>
                <b-nav-item to="/gastos">Gastos</b-nav-item>
                <b-nav-item @click="logout">Salir</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav v-else class="ml-auto fixed">
                <b-nav-item to="/registro">Registrarme</b-nav-item>
                <b-nav-item to="/login">Iniciar</b-nav-item>
            </b-navbar-nav>
         </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name:'Navbar',
    methods: {
        logout() {
        const This = this;
        axios
            .get("http://localhost:4012/api/logout")
            .then((res) => {
            if (res.status == 200) {
                This.$vToastify.success("Sesión finalizada con exito");
                this.$router.push("/");
            } else {
                This.$vToastify.error(
                  "Ha ocurrido un error finalizando la sesión. Intenta de nuevo"
                );
            }
            })
            .catch((error) => {
            This.$vToastify.error(error);
            });
        },
    },
}
</script>