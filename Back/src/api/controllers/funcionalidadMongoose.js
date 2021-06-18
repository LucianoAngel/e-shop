const Persona = require('../models/persona');
const Empresa = require('../models/empresa');
const Factura = require('../models/factura');
// const Clientes = require('../models/clientes');
const Producto = require('../models/producto');
const ProductoCaja = require('../models//productoCaja');
// const Ingresos = require('../models/ingresos');
const Gastos = require('../models/gastos');
const Login = require('../models/login');
const { schemaPerson, schemaProduct, schemaLogin } = require('../schemas/schemas');

async function createUser(req, res) {
  try {
    // const { username, password } = req.body;
    const value = await schemaLogin.validateAsync(req.body);
    if (value) {
      const valor = await Login.findOne(req.body);
      if (!valor) {
        const nuevoLogin = new Login(req.body);
        nuevoLogin.save();
        res.status(200).send('success');
      } else {
        res.status(200).json({ message: 'Persona Existente' });
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const value = await schemaLogin.validateAsync(req.body);
    if (value) {
      const valor = await Login.findOne(req.body);
      if (valor) {
        req.session.cookie.expires = false;
        req.session.user = {
          persona: {
            username,
            password,
          }
        };
        res.status(200).json({ message: 'success' });
      }else return res.status(404).send('datos incorrectos')
    }
  } catch (error) {
    res.status(400).send(error);
  }
}


async function createPerson(req, res) {
  try {
    const value = await schemaPerson.validateAsync(req.body);
    if (value) {
      const valor = await Persona.findOne(req.body);
      if (!valor) {
        const nuevaPersona = new Persona(req.body);
        nuevaPersona.save();
        res.status(200).send('success');
      } else {
        res.status(200).json({ message: 'Persona Existente' });
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

async function createCompany(req, res) {
  try {
    const value = await schemaPerson.validateAsync(req.body);
    if (value) {
      const valor = await Empresa.findOne(req.body);
      if (!valor) {
        const nuevaEmpresa = new Empresa(req.body);
        nuevaEmpresa.save();
        res.status(200).send('success');
      } else {
        res.status(200).json({ message: 'Empresa Existente' });
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

async function findClients(req, res) {
  try {
      const persona = await Persona.find({}).populate("facturas");
      const empresa = await Empresa.find({}).populate("facturas");
      if (persona || empresa) {
        res.status(200).json({
          persona,
          empresa,
        });
      } else {
        res.status(404).send('not found');
      }
  } catch (error) {
    res.status(400).send(error);
  }
}
async function deleteClient(req, res) {
  try {
      const {id} = req.params;
      const persona = await Persona.findByIdAndDelete(id);
      const empresa = await Empresa.findByIdAndDelete(id);
      if (persona || empresa) {
        res.status(200).send('success')
      } else {
        res.status(404).send('not found');
      }
  } catch (error) {
    res.status(400).send(error);
  }
}
async function updateClient(req, res) {
  try {
      const {id} = req.params;
      const {nombre, cedula} = req.body;
      const persona = await Persona.findById(id);
      const empresa = await Empresa.findById(id);
      if (persona) {
        persona.nombre = nombre;
        cedula
          ? persona.cedula = cedula
          : ''
        persona.save();
        return res.status(200).send('success')
      }else if(empresa){
        empresa.nombre = nombre;
        cedula
          ? empresa.cedula = cedula
          : ''
        empresa.save();
        return res.status(200).send('success')
      } else {
        res.status(404).send('not found');
      }
  } catch (error) {
    res.status(400).send(error);
  }
}

async function createProduct(req, res) {
  try {
      const value = await schemaProduct.validateAsync(req.body);
      if (value) {
          const nuevoProducto = new Producto(req.body);
          nuevoProducto.save();
          res.status(200).send('success');
      }
  } catch (error) {
    res.status(400).send(error);
  }
}

async function createManyProducts(req, res) {
  try {
        const arr = req.body;
        Producto.insertMany(arr, function(error, docs){
          if(error)return res.send('ha ocurrido un error')
          else if(docs) return res.send(docs)
        })
} catch (error) {
  res.status(400).send(error);
}
}

async function aggACaja(req, res) {
  try {
      const { productoId, cantidad } = req.body;
      const cantidadInt = parseInt(cantidad)
      // Multiple busqueda
      // const productos = await Producto.find({
      //   _id: {
      //     $in: ids
      //   }
      // })
      const producto = await Producto.findById(productoId)
      if(producto){
        const productoCopia = JSON.parse(JSON.stringify(producto))
        productoCopia.cantidad = cantidadInt
        // Actualizar cantidad de productos en los productos globales
        if(producto.cantidad - cantidadInt != 0){
          producto.cantidad = producto.cantidad - cantidadInt
          producto.save()
        } else {
          // Si la cantidad llega a 0 se elimina el producto global
          await Producto.findByIdAndDelete(producto._id);
        }
        // Multiple eliminado
        // await Producto.deleteMany({
        //   _id: {
        //     $in: ids
        //   }
        // })
        const productosEnCaja = await ProductoCaja.findOne({})
        if(productosEnCaja){
          // Se verifica si no se ha agregado anteriormente el producto
          let productoAgregadoAnteriormente = false;
          productosEnCaja.productos.map(p => {
            if(p._id == productoCopia._id){
              p.cantidad += cantidadInt
              productoAgregadoAnteriormente = true;
            }
          });
          // Si no se ha agregado anteriormente se agrega el producto a caja
          if(productosEnCaja && !productoAgregadoAnteriormente){
            productosEnCaja.productos.push(productoCopia)
            productosEnCaja.save()
            return res.send(productosEnCaja)
          } else {
            // si se agregó anteriormente se modifica su cantidad
            productosEnCaja.productos.map(p => {
              let productoAModificar = p
              if(p._id === productoCopia._id){
                productoAModificar = productoCopia
              }
              return productoAModificar
            })
            productosEnCaja.save()
            return res.send(productosEnCaja)
          }
        }else {
          const newProductoCaja = new ProductoCaja()
          newProductoCaja.productos.push(productoCopia)
          newProductoCaja.save()
          return res.send(newProductoCaja)
        }
      }else return res.status(404).send('no se ha encontrado algun producto')
  } catch (error) {
    res.status(400).send(error);
  }
}

async function findCaja(req, res) {
  try {
      const producto = await ProductoCaja.findOne({});
      if (producto) {
        res.status(200).send(producto);
      } else {
        res.status(404).send('not found');
      }
  } catch (error) {
    res.status(400).send(error);
  }
}
async function deleteProduct(req, res) {
  try {
      const {id} = req.params;
      const producto = await Producto.findByIdAndDelete(id);
      if (producto) {
        res.status(200).send('success')
      } else {
        res.status(404).send('not found');
      }
  } catch (error) {
    res.status(400).send(error);
  }
}
async function updateProduct(req, res) {
  try {
      const {id} = req.params;
      const {nombre, precioCompra, precioVenta, marca} = req.body;
      const producto = await Producto.findById(id);
      if (producto) {
        producto.nombre = nombre;
        producto.precioVenta = precioVenta;
        producto.precioCompra = precioCompra;
        producto.marca = marca;
        producto.save();
        return res.status(200).send('success')
      } else {
        res.status(404).send('not found');
      }
  } catch (error) {
    res.status(400).send(error);
  }
}
async function updateFactura(req, res) {
  try {
      const {id} = req.params;
      const {monto, metodoPago} = req.body;
      let pagado = false;
      const factura = await Factura.findById(id);
      if (factura) {
        if(metodoPago != "Pendiente"){
          pagado = true
        }else {
          pagado = false
        }
        factura.monto = monto;
        factura.metodoPago = metodoPago;
        factura.pagado = pagado;
        await factura.save();
        return res.status(200).send('success')
      } else {
        res.status(404).send('not found');
      }
  } catch (error) {
    res.status(400).send(error);
  }
}

async function findProducts(req, res) {
  try {
        const valor = await Producto.find({});
        if (valor) {
          res.status(200).send(valor);
        } else {
          return res.send(403)
      }
  } catch (error) {
    res.status(400).send(error);
  }
}

async function createBill(req, res) {
  try {
    const { idPersona, metodoPago, monto} = req.body;
    console.log(req.body)
    let pagado= false;
    const productosEnCaja = await ProductoCaja.findOne({})
    if(!productosEnCaja){
      return res.send('No hay productos en caja')
    }
      const factura = new Factura();
      if(metodoPago != "Pendiente"){
        pagado= true;
      }else {
        pagado= false;
      }
      factura.productos = productosEnCaja.productos;
      factura.pagado = pagado;
      factura.metodoPago = metodoPago;
      factura.monto = monto;
      let count = 0;
      await productosEnCaja.productos.forEach(p => {
        count = count + p.cantidad
      });
      factura.count = count
      await factura.save();
      const persona = await Persona.findById(idPersona)
      const empresa = await Empresa.findById(idPersona)
      if(persona){
        await ProductoCaja.remove({})
        await persona.facturas.push(factura)
        await persona.save()
        res.json({
          factura,
          persona,
        })
      }else if(empresa){
        await ProductoCaja.remove({})
        await empresa.facturas.push(factura)
        await empresa.save()
        res.json({
          factura,
          empresa,
        })
      }else return res.status(404).send('persona no encontrada')
  } catch (error) {
    res.status(400).send(error);
  }
}

async function createExpense(req, res) {
  try {
    const { productos, metodoPago} = req.body;
    let monto = 0;
      productos.forEach(producto => {
        const montoInt = parseInt(producto.precioCompra)
        monto+= montoInt;
      });
      const gastos = new Gastos();
      gastos.productos= productos;
      gastos.metodoPago= metodoPago;
      gastos.monto= parseInt(monto);
      gastos.count= parseInt(productos.length);
      await gastos.save();
      res.send('success')
  } catch (error) {
    res.status(400).send(error);
  }
}

async function findBills(req, res) {
  try {
        const valor = await Factura.find({}).populate("productos");
        if (valor) {
          res.status(200).send(valor);
        } else {
          return res.status(404)
      }
  } catch (error) {
    res.status(400).send(error);
  }
}

async function findExpenses(req, res) {
  try {
        const valor = await Gastos.find({});
        if (valor) {
          res.status(200).send(valor);
        } else {
          return res.status(404)
      }
  } catch (error) {
    res.status(400).send(error);
  }
}

async function sendSession(req, res) {
  try {
    const { persona } = req.session.user;
    res.json({
      persona: {
        nombre: persona.username
      },
    });
  } catch (error) {
    res.status(400).send(error);
  }
}

async function logout(req, res) {
  req.session.destroy();
  res.send('sesion finalizada');
}

module.exports = {
  createUser, createPerson, loginUser, findExpenses, createExpense, updateFactura, createCompany, createManyProducts, findClients, logout, aggACaja, findCaja,
  createProduct, createBill, sendSession, deleteProduct, updateProduct, findProducts, findBills, deleteClient, updateClient
};