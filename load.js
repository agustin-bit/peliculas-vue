
//PRegunta si el navegador soporta serviceWorker
// y lo registrar
// Si falla actua el catch
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.
        register("./serviceWorker.js")
        .then((reg) => console.log("Registro Exitoso"))
        .catch((err) => console.log(err));
}