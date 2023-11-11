function laskeYmpyranPintaAla(sade) {
    // Käytetään Math.PI:tä π:n arvona ja kaavaa A = π * r^2
    var pinta_ala = Math.PI * Math.pow(sade, 2);
    return pinta_ala;
  }
  
  var sade = 5; // Voit vaihtaa ympyrän säteen haluamaksesi arvoksi
  var pinta_ala = laskeYmpyranPintaAla(sade);
  
  console.log("Ympyrän pinta-ala, kun säde on " + sade + ": " + pinta_ala);
  