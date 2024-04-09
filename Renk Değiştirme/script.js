// Dosya adı: renkDegistir.js

var dizi = [
    "#D24D57", // Koyu kırmızı
    "#e74c3c", // Açık kırmızı
    "#f1c40f", // Sarı
    "#2c3e50", // Lacivert
    "#8e44ad", // Mor
    "#bdc3c7", // Gri
    "#1abc9c", // Turkuaz
    "#3498db", // Mavi
    "#95a5a6"  // Gri mavi
];

var renk = document.getElementById("renk");

renk.onclick = function() {
    var rasgele = Math.floor(Math.random() * dizi.length);
    document.body.style.backgroundColor = dizi[rasgele];
}
