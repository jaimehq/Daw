/*
 * 'blur' inmediatamente después de cuando pierde el foco
 * 'focusout' = blur, pero 'burbujea' = delegación eventos en padre
 * 'focus' = 'focusin'
 */

/* nombre.addEventListener("blur", function () {
  if (!this.checkValidity()) {
    console.log(errores.error1);
  }
});

telefono.addEventListener("blur", function () {
   if (!this.checkValidity()) {
    console.log(errores.error3);
    if (this.validity.valueMissing) {
      console.log(errores.error4);
    } else {
      if (this.validity.patternMismatch) {
        console.log(errores.error1);
      }
    }
    }
}); */

//this.form = formulario
//this.form.elements = hace referencia a todos los elementos
ok.addEventListener('click', function(){
    let controles =[...this.form.elements]
    
    controles.forEach(control=>{ //control = evento

        switch (control.id) {
            case "nombre":
                
                break;
            case "telefono":
            
                break;
        }
    })
});

//validar desde el formulario. En vez form[0] se puede usar el name='pedido'
document.forms[0].addEventListener("focusout", function (evento) {
  
switch (evento.target.id) {
    case "nombre":
        if (!evento.target.checkValidity()) {
            console.log(errores.error1);
            if (evento.target.validity.valueMissing) {
              console.log(errores.error4);
            } else {
              if (evento.target.validity.patternMismatch) {
                console.log(errores.error5);
              }
            }
          }
      break;
    case "direccion":
        if (!evento.target.checkValidity()) {
            console.log(errores.error3);
            if (evento.target.validity.valueMissing) {
              console.log(errores.error4);
            } else {
              if (evento.target.validity.patternMismatch) {
                console.log(errores.error5);
              }
            }
          }
      break;
    case "telefono":
        if (!evento.target.checkValidity()) {
            console.log(errores.error2);
            if (evento.target.validity.valueMissing) {
              console.log(errores.error4);
            } else {
              if (evento.target.validity.patternMismatch) {
                console.log(errores.error5);
              }
            }
          }
      break;
  }

});

/*errores en array asociativo*/
let errores = {
  error1: "nombre mal validado",
  error2: "telefono erroneo",
  error3: "direccion mal validada",
  error4: "se requiere rellenar con algo",
  error5: "patron erróneo"
};


