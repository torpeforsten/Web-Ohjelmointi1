$(document).ready(function () {
    // Päivämäärä
    var today = new Date();
    var currentDay = today.getDate();
  
    // Kuvien polut
    var imagePaths = [
      'https://i.pinimg.com/736x/70/4b/bd/704bbdf2f8328b62160eb1244ac9ece5.jpg',
      'https://i.pinimg.com/736x/f2/95/76/f295769d9bd3c34ffc552e837f5304ae.jpg',
      'https://i.pinimg.com/736x/3d/76/31/3d763132c30ac83eb777293699bf60a7.jpg',
      'https://i.pinimg.com/736x/eb/28/ad/eb28aded36084d5442a04f13b2a44734.jpg',
      'https://i.pinimg.com/736x/50/4a/a8/504aa880cd019050f6eb311bdc5a6689.jpg',
      'https://i.pinimg.com/736x/f1/a8/6a/f1a86a14b892480eeaf2a4d1f98af5c2.jpg',
      'https://i.pinimg.com/736x/b0/ec/f5/b0ecf56ded7c32a735ccf8f6ea3aa5ea.jpg',
      'https://i.pinimg.com/736x/2b/7a/0c/2b7a0c9c8ecabc508363d196c84a16a7.jpg',
      'https://i.pinimg.com/736x/d0/5f/cc/d05fccb359c0aa00f5d854d6d8eb0a6f.jpg',
    ];
  
    // Lisää tapahtumakuuntelija jokaiselle luukulle
    $(".door").on("click", function () {
      var doorNumber = parseInt($(this).text());
  
      // Tarkista, voiko luukun avata
      if (doorNumber <= currentDay || doorNumber >= 9) {
        // Simuloi sisällön näyttäminen kahden sekunnin ajan
        setTimeout(function () {
          // Hae kuvaan liittyvä polku
          var imageUrl = imagePaths[doorNumber - 1];
  
          // Näytä kuva luukun sisällä
          $("#popupImage").attr("src", imageUrl);
          $(".image-popup").fadeIn();
        }, 2000);
      }
    });
  
    // Sulje kuvanäyttö klikkaamalla sitä
    $(".image-popup").on("click", function () {
      $(this).fadeOut();
    });
  });
  