const readline = require("readline-sync");

let tasaInteres = 1.97; // mensual
let plazo;
let monto;
let cuotaMensual;
let totalPagar;
let nombre;
let interesTotal;

const formatearMoneda = (valor) => {
  return valor.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });
};

const solicitarDatos = () => {
  nombre = readline.question("Ingrese su nombre: ");
  monto = parseFloat(readline.question("Ingrese el monto del prestamo: "));
  plazo = parseInt(readline.question("Ingrese el plazo en meses: "));

  if (isNaN(monto) || monto <= 0) {
    console.log("Error: el monto debe ser un numero mayor a 0.");
    process.exit();
  }

  if (isNaN(plazo) || plazo <= 0) {
    console.log("Error: el plazo debe ser un numero entero mayor a 0.");
    process.exit();
  }
};

const calcularCuotaMensual = () => {
  let tasaMensual = tasaInteres / 100;

  cuotaMensual =
    (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
  totalPagar = cuotaMensual * plazo;
  interesTotal = totalPagar - monto;
};

const mostrarResultados = () => {
  console.log("\n========================================");
  console.log("        SIMULADOR DE PRESTAMO");
  console.log("========================================");
  console.log(`Hola ${nombre}`);
  console.log(`Monto: ${formatearMoneda(monto)}`);
  console.log(`Interes mensual: ${tasaInteres}%`);
  console.log(`Plazo: ${plazo} meses`);
  console.log(`Cuota mensual: ${formatearMoneda(cuotaMensual)}`);
  console.log(`Total a pagar: ${formatearMoneda(totalPagar)}`);
  console.log(`Interes total pagado: ${formatearMoneda(interesTotal)}`);
};

const mostrarTablaAmortizacion = () => {
  let saldo = monto;
  let tasaMensual = tasaInteres / 100;

  console.log("\n========================================");
  console.log("         TABLA DE AMORTIZACION");
  console.log("========================================");
  console.log(
    "Mes | Saldo Inicial | Interes | Abono Capital | Cuota | Saldo Final",
  );

  for (let mes = 1; mes <= plazo; mes++) {
    let interesMes = saldo * tasaMensual;
    let abonoCapital = cuotaMensual - interesMes;
    let saldoFinal = saldo - abonoCapital;

    if (saldoFinal < 0) saldoFinal = 0;

    console.log(
      `${mes} | ${formatearMoneda(saldo)} | ${formatearMoneda(interesMes)} | ${formatearMoneda(abonoCapital)} | ${formatearMoneda(cuotaMensual)} | ${formatearMoneda(saldoFinal)}`,
    );

    saldo = saldoFinal;
  }
};

solicitarDatos();
calcularCuotaMensual();
mostrarResultados();
mostrarTablaAmortizacion();
