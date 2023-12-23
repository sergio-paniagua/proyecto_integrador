function interpretarGasometria2(phU, o2U, co2U, hco2U, eb, satU) {
    let co2esperadoAc = 1.5 * hco2U + 8
    let co2esperadoAl = 0.7 * hco2U  + 21 
    let EBesperado = (co2U-40)*(0.4)
   
    // Evaluar el pH
    let interpretacion = "";
    
    if (phU < 7.35) {
      interpretacion += "Acidemia. ";
  
    } else if (phU > 7.45) {
      interpretacion += "Alcalemia. ";
    }
     
    // Evaluar el HCO3 ante un trastorno metabolico
    switch (hco2U > 26){
        case co2esperadoAc > co2U:
        interpretacion += "Alcalosis metabólica con acidosis respiratoria agregada, evaluar contexto";
        case co2esperadoAc < co2U:
        interpretacion += "Alcalosis metabólica con una alcalosis respiratoria agregada, evaluar contexto";
    }switch (hco2U < 22){
        case co2esperadoAl > co2U:
        interpretacion += "Acidosis metabólica con acidosis respiratoria agregada, evaluar contexto";
        case co2esperadoAl < co2U:
        interpretacion += "Acidosis metabólica con una alcalosis respiratoria agregada, evaluar contexto";
    }
  
      // Evaluar la PaCO2 para determinar trastornosrespiratorios
      switch (co2U > 45){
        case eb === 2:
        interpretacion += "Acidosis respiratoria aguda. ";
        
        case eb === EBesperado:
        interpretacion += "Acidosis respiratoria cronica";
    
        case eb > EBesperado:
        interpretacion += "Acidosis respiratoria cronica, el exceso de base sugiere un trastorno metabolico agregado";
    
    
    }switch (co2U < 35){
        case eb === 2:
        interpretacion += "Alcalosis respiratoria aguda. ";
        
        case eb === EBesperado:
        interpretacion += "Alcalosis respiratoria cronica";
    
        case eb > EBesperado:
        interpretacion += "Alcalosis respiratoria cronica, el exceso de base sugiere un trastorno metabolico agregado";
    }
     
    // Devolver la interpretación
    return interpretacion;
  }


  function interpretarGasometria3(phU, co2U, hco2U, ebU) {
    let co2esperadoAc = 1.5 * hco2U + 8;
    let co2esperadoAl = 0.7 * hco2U + 21;
    let EBesperado = (co2U - 40) * 0.4;
  
    // 1) Evaluar el pH
    let interpretacion = "";
  
    if (phU < 7.35) {
      interpretacion += "Acidemia. ";
    } else if (phU > 7.45) {
      interpretacion += "Alcalemia. ";
    }
  
    // 2) Evaluar la PaCO2 para determinar trastornosrespiratorios
    switch (co2U > 45) {
      case ebU === 2:
        interpretacion += "Acidosis respiratoria aguda. ";
        break;
      case ebU === EBesperado:
        interpretacion += "Acidosis respiratoria cronica. ";
        break;
      case ebU > EBesperado:
        interpretacion +=
          "Acidosis respiratoria cronica, el exceso de base sugiere un trastorno metabolico agregado";
        break;
      default:
        switch (co2U < 35) {
          case ebU === 2:
            interpretacion += "Alcalosis respiratoria aguda. ";
            break;
          case ebU === EBesperado:
            interpretacion += "Alcalosis respiratoria cronica";
            break;
          case ebU > EBesperado:
            interpretacion +=
              "Alcalosis respiratoria cronica, el exceso de base sugiere un trastorno metabolico agregado";
              break
        }
    }
    
  
    // 3) Evaluar el HCO3 para determinar trastorno metabolico
    switch (hco2U > 26) {
      case co2esperadoAc > co2U:
        interpretacion +=
          "Alcalosis metabólica con acidosis respiratoria agregada, evaluar contexto .";
          break
      case co2esperadoAc < co2U:
        interpretacion +=
          "Alcalosis metabólica con una alcalosis respiratoria agregada, evaluar contexto .";
        break;
      default:
        switch (hco2U < 22) {
          case co2esperadoAl > co2U:
            interpretacion +=
              "Acidosis metabólica con acidosis respiratoria agregada, evaluar contexto .";
              break
          case co2esperadoAl < co2U:
            interpretacion +=
              "Acidosis metabólica con una alcalosis respiratoria agregada, evaluar contexto .";
              break
        }
        break;
    }
  
    // Devolver la interpretación
    return interpretacion;
  }


function interpretacionPh (phU){
     // 1) Evaluar el pH
     let interpretacion = "";
  
     if (phU < 7.35) {
       interpretacion += "Segun el pH Acidemia. ";
     } else if (phU > 7.45) {
       interpretacion += "Segun el pH Alcalemia. ";
     }

     return interpretacion;
}

function interpretacionPco2(co2U, ebU){
 // 2) Evaluar la PaCO2 para determinar trastornosrespiratorios
 let interpretacion = "";
 switch (co2U > 45) {
    case ebU === 2:
      interpretacion += "Acidosis respiratoria aguda. ";
      break;
    case ebU === EBesperado:
      interpretacion += "Acidosis respiratoria cronica. ";
      break;
    case ebU > EBesperado:
      interpretacion +=
        "Acidosis respiratoria cronica, el exceso de base sugiere un trastorno metabolico agregado";
      break;
    default:
      switch (co2U < 35) {
        case ebU === 2:
          interpretacion += "Alcalosis respiratoria aguda. ";
          break;
        case ebU === EBesperado:
          interpretacion += "Alcalosis respiratoria cronica";
          break;
        case ebU > EBesperado:
          interpretacion +=
            "Alcalosis respiratoria cronica, el exceso de base sugiere un trastorno metabolico agregado";
            break
      }
      break
  }
  return interpretacion;

}

function interpretacionMetabolico(hco2U, co2U){
    let interpretacion = "";
    // 3) Evaluar el HCO3 para determinar trastorno metabolico
    switch (hco2U > 26) {
        case co2esperadoAc > co2U:
          interpretacion +=
            "Alcalosis metabólica con acidosis respiratoria agregada, evaluar contexto .";
            break
        case co2esperadoAc < co2U:
          interpretacion +=
            "Alcalosis metabólica con una alcalosis respiratoria agregada, evaluar contexto .";
          break;
        default:
          switch (hco2U < 22) {
            case co2esperadoAl > co2U:
              interpretacion +=
                "Acidosis metabólica con acidosis respiratoria agregada, evaluar contexto .";
                break
            case co2esperadoAl < co2U:
              interpretacion +=
                "Acidosis metabólica con una alcalosis respiratoria agregada, evaluar contexto .";
                break
          }
          break;
      }
      return interpretacion;
}

function interpretacionGsa (phU, co2U, ebU, hco2U){
if (phU){
    interpretacionPh (phU)
} else alert ("pH dentro del intervalo de referencia")

if (co2U, ebU){
    interpretacionPco2(co2U, ebU)
} else alert ("dentro del intervalo de referenica");

if (hco2U, co2U){
    interpretacionMetabolico(hco2U, co2U)
} else alert ("dentro del intervalo de referenica");

};