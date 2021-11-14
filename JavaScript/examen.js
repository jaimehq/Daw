class Persona{
    constructor(nom,dir,tel){
        this.nombre=nom;
        this.direccion=dir;
        this.telefonos=tel;
    }
}
class Agenda{
    constructor(){
        this.personas=[];
    }
    agregarPersona(per){
        this.personas.push(per);
    }
    buscar(){
        let nombre=document.getElementById("nombre").value;
        let visor=document.getElementById("visor");
        let cadena="<table><th>NOMBRE</th><th>CALLE</th><th>POBLACION</th><th>PROVINCIA</th><th>TEL:movil</th><th>TEL:casa</th><th>TEL:trabajo</th>";
        for (let i=0;i<this.personas.length;i++){
            if(nombre==this.personas[i].nombre){
                cadena+=`<tr><td>${this.personas[i].nombre}</td><td>${this.personas[i].direccion.calle}</td><td>${this.personas[i].direccion.poblacion}</td><td>${this.personas[i].direccion.provincia}</td><td>${this.personas[i].telefonos.movil}</td><td>${this.personas[i].telefonos.casa}</td><td>${this.personas[i].telefonos.trabajo}</td></tr>`

            }
            debugger
        }
        cadena+="</table>";
        visor.innerHTML=cadena;
    }
}
function Direccion(calle,poblacion,provincia) {
    this.calle=calle;
    this.poblacion=poblacion;
    this.provincia=provincia;
}
let telefono ={
    movil: "",
    casa: "",
    trabajo:""
}
let agregar= document.getElementById("btnAgregar");
let buscar=document.getElementById("btnBuscar");
let dir;
let persona;
let agenda=new Agenda();
buscar.onclick=function(){
    agenda.buscar();
}
agregar.onclick=function(){
    let name=document.getElementById("nombre").value;
    let street=document.getElementById("calle").value;
    let poblacion=document.getElementById("pobl").value;
    let provincia=document.getElementById("prov").value;
    telefono.movil=validarTel(document.getElementById("movil").value);
    telefono.casa=validarTel(document.getElementById("casa").value);
    telefono.trabajo=validarTel(document.getElementById("trabajo").value);
    if(telefono.movil!="El telefono no es valido" && telefono.casa!="El telefono no es valido" && telefono.trabajo!="El telefono no es valido"){
        persona= new Persona(name,new Direccion(street,poblacion,provincia),telefono);
        //debugger
        agenda.agregarPersona(persona);
    }else{
        document.getElementById("movil").value=telefono.movil
        document.getElementById("casa").value=telefono.casa
        document.getElementById("trabajo").value=telefono.trabajo
    }
    debugger
}
function validarTel(tel){
    rEMovil=/\b[679]\d{8}\b/;
    switch(true){
        case tel=="":
            break
        case !rEMovil.test(tel):
            tel="El telefono no es valido";
            break;  
    }
    return tel;
    
}

