// frontend/script.js

// Backend API'ye GET isteği gönderiyoruz
fetch('http://localhost:3000/')  // Backend API URL
  .then(response => response.json())  // JSON formatında yanıt alıyoruz
  .then(data => {
    console.log(data);  // Backend'den gelen veriyi konsola yazdırıyoruz
    // "greeting" id'sine sahip HTML öğesini bulup, mesajı buraya yazıyoruz
    //document.getElementById('greeting').innerText = data.message;
  })
  .catch(error => {
    console.log('Veri çekme hatası:', error);  // Hata oluşursa hata mesajını konsola yazdırıyoruz
    document.getElementById('greeting').innerText = 'Veri alınamadı.';
  });
