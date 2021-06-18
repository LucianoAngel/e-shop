<template>
  <div class="absoluto">
    <section>
      <div class="landing">
        <!-- <img src="@/assets/svgs/landing/back.svg" class="imagen"> -->
        <b-row>
          <b-col>
            <div class="pt-5 pb-5 mb-5 mt-5 font-weigth-bold">
              <h1 class="display-3 font-weight-bold">Maneja tu negocio</h1> <span>AEShop</span>
              <h3 class="lead">¡Somos tu mejor aliado!</h3>

              <h4 class="m-5 h3 pt-5">Obtén un control completo sobre tus compras y ventas de tu negocio</h4>

              <b-button class="p-2" pill variant="primary" @click="$router.push('/login')">Iniciar sesión</b-button>
              <span>o <router-link to="/registro">Registrate</router-link></span>
            </div>
          </b-col>
          <b-col class="mt-4" col sm="12" lg="6">
            <div>
              <img src="@/assets/svgs/landing/shop.svg" alt="Tienda web" class="tienda">
            </div>
          </b-col>
        </b-row>
      </div>
    </section>

    <section>
      <b-container>
        <header
          class="h2-responsive text-center pt-4 pb-5 px-3"
        >
          ¿Por qué deberías registrarte?
        </header>
        <b-row>
          <b-col>
            <header
              class="h4-responsive font-weight-bold
                  text-center text-md-left m-5"
            >
              Te ofrecemos servicio de facturación, historial de ventas, manejo de gastos e ingresos
            </header>
            <p class="h5 m-3">
              Administra tus clientes, proveedores, fechas y horas en que realizas movimientos en tu negocio.
            </p>
          </b-col>
          <b-col>
            <header
              class="h4-responsive font-weight-bold
                  text-center text-md-left m-5"
            >
              Tendrás acceso a una interfaz muy intuitiva, rápida y facil de utilizar
            </header>

            <p class="h5 m-3">
              En donde quiera que estés puedes hacer uso de esta aplicación, con ello evitas el tan temido papeleo.
            </p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="footer">
      <div class="h4-responsive mt-5 mb-2">
        AE-shop 2021. Derechos reservados
      </div>
    </section>

    </div>
</template>

<style>
  body{
    background: aliceblue;
  }
  .landing{
    /* background: rgb(245, 245, 245); */
      background-image: url('../assets/svgs/landing/back.svg');
      background-repeat: no-repeat;
      background-attachment: absolute;
      background-position: 10% 10%;
      background-size: 90rem;
  }
  .tienda {
    height: 35rem;
    width: 20rem;
  }
</style>