import {defineStore} from "pinia";

export const helpStore = defineStore("Help", {
  state: () => {
    const dict: { [key: string]: string } = {
      "terceros": "Son las personas ajenas a tu negocio, pueden ser, a quienes vendes ( clientes) o a quienes compras (proveedores)",
      "nit/cc": "Este es el numero de identificacion de tu cedula en caso de querer registrar una persona o el numero de registro que la empresa tiene",
      "terceros:tipo": "Este es el tipo de persona que quieres registrar, seleccionas empresa si quieres registrar un negocio, o seleccionas persona si  quieres registrar una.",
      "factura:id": "Identificador único de la factura en el sistema SOFI+",
      "factura:cantidad": "Se refiere a la cantidad de un item que se esta vendiendo",
      "factura:item": "Se refiere al producto/servicio que desea añadir a la factura",
      "factura:descuento": "Puede aplicar un descuento porcentual (%) o nominal ($) al precio del producto/servicio que desea añadir a la factura",
      "factura:agregarItem": "Añade a la factura el producto/servicio, aplicando las cantidades y descuentos deseados",
      "factura:fecha": "Fecha en la que se realiza la factura",
      "factura:fechaVencimiento": "",
      "factura:terceroID": "Nit o cedula del cliente de la factura",
      "factura:nombre": "Nombre o Razón Social del cliente de la factura",
      "factura:tipoPago": "Tipo de pago con el que se realiza la factura",
      "factura:total": "Dinero total que se debe recibir por los productos/servicios incluidos en la factura",
      "egreso:id": "Identificador único del comprobante en el sistema SOFI+",
      "egreso:fecha": "Fecha en la que se realizó el comprobante",
      "egreso:cantidad": "Cantidad de dinero que esta entregando al tercero",
      "egreso:concepto": "Razón por la que esta entregando este dinero al tercero",
      "egreso:tipo": "El tipo de egreso tiene que ver con la razón por la que entrega el dinero" +
        "\nGastos de personal: en caso de pagos a empleados o prestadores de servicios" +
        "\nGastos de arriendo: en caso de pagos de arrendamiento de cualquier tipo, por ejemplo locales o vehiculos" +
        "\nGastos de mantenimiento: en caso de pagos por mantenimiento, como arreglos en el local o en los equipos" +
        "\nPago proveedores: en caso de pagos a proveedores de inventario, como por ejemplo insumos" +
        "\nOtros gastos: en caso de pagos que no se encuentren en los tipos anteriores",
      "egreso:pagadoA": "Identificación del tercero que recibe el dinero",
      "egreso:nombre": "Nombre del tercero que recibe el dinero",
      "item:codigo": "Identificador único del item que desea crear",
      "item:descripcion": "Nombre o descripción del item con el que quiere buscarlo",
      "item:cantidad": "Inventario inicial del item que desea crear",
      "item:unidadPreferida": "Unidad de la dimensión que usa normalmente, por ejemplo para la masa se usan generalmente kilogramos",
      "item:dimension": "La forma en que mide el item que desea crear, por ejemplo si son kilos la dimensión es la masa",
      "item:impuesto": "Porcentaje de impuestos generados por la venta del item, por ejemplo el IVA es el 19%",
      "item:costeUnitario": "Cantidad de dinero que le cuesta la compra o producción del item, de forma individual",
      "item:costeTotal": "Total de dinero que representan todos los items del inventario de este tipo",
      "item:precio": "Precio de venta del item al publico, de forma individual",
      "item:fechaIngreso": "Fecha en la que ingresa el item al inventario",
      "itemCarga:item": "Item al que quiere cargar el inventario",
      "itemCarga:cantidad": "Cantidad en la que quiere aumentar el inventario del Item",
      "itemCarga:costo": "Costo individual de los Items a cargar, puede ser diferente del costo que ya tienen los Items que tiene en el inventario",
      "itemCarga:cargar": "Aumentar el inventario del Item en la cantidad deseada, se calcula el nuevo costo de los Items con base en los costos del viejo y del nuevo inventario",
      "servicio:codigo": "Identificador único del servicio que desea crear",
      "servicio:descripcion": "Nombre o descripción del servicio con el que quiere buscarlo",
      "servicio:impuesto": "Porcentaje de impuestos generados por la venta del servicio, por ejemplo el IVA es el 19%",
      "servicio:precio": "Precio de venta del servicio al publico, de forma individual",
      "servicio:fechaCreacion": "Fecha en la que se crea el servicio",
    };
    return {
      dict: dict,
      helpFlag: false,
      helpInfo: ""
    };
  },
  actions: {
    requestHelp() {
      this.helpFlag = true;
      document.addEventListener('keypress', (e: KeyboardEvent) => {
        if (e.key == "Escape") {
          this.helpFlag = false;
        }
      });
    },
    provideHelp(key: string): string {
      this.helpFlag = false;
      this.helpInfo = this.dict[key];
      return this.dict[key];
    },
    closeHelp() {
      this.helpFlag = false;
      this.helpInfo = "";
    },
  },
  persist: true
})
