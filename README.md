# 🎫 vize-ui

**vize-ui**, kullanıcıların çeşitli etkinliklere katılabildiği, arkadaşlarıyla sosyal etkileşime geçebildiği ve kendi etkinliklerini oluşturabildiği modern bir web uygulamasıdır. Konserler, spor organizasyonları, sosyal buluşmalar gibi biletli etkinliklerin yanı sıra, bireysel etkinliklerin planlanmasına da olanak tanır.

---

## 📌 Proje Özeti

Bu proje, hem sosyal medya özellikleri taşıyan hem de etkinlik bazlı biletleme sistemini içinde barındıran bir platformdur. Kullanıcılar birbirleriyle bağlantı kurabilir, etkinlikler oluşturabilir, katılım sağlayabilir ve QR kod ile etkinliklere giriş yapabilir.

---
##  Başlıca Proje Görselleri
<img width="260" height="520" alt="Screenshot 1" src="https://github.com/user-attachments/assets/a0995e21-66c1-4bf8-b63d-4a858adc0158" />
<img width="260" height="520" alt="Screenshot 2" src="https://github.com/user-attachments/assets/7c385cf7-d353-4c39-ab6c-4b88dc5c8c34" />
<img width="260" height="520" alt="Screenshot 3" src="https://github.com/user-attachments/assets/a66888bc-f27a-41b7-bc82-c97c7c69c8b9" />
<img width="260" height="520" alt="Screenshot 4" src="https://github.com/user-attachments/assets/25634bc1-b52b-4d7b-9f64-3e9bc85bb10c" />
<img width="260" height="520" alt="Screenshot 5" src="https://github.com/user-attachments/assets/9dd81026-0d93-4289-a066-8c6cecd5f767" />
<img width="260" height="520" alt="Screenshot 6" src="https://github.com/user-attachments/assets/de3471d5-7504-499e-8d53-d99830c34b2b" />
<img width="260" height="520" alt="Screenshot 7" src="https://github.com/user-attachments/assets/38827aa4-7aaa-49cf-b03f-999460e8657a" />
<img width="260" height="520" alt="Screenshot 8" src="https://github.com/user-attachments/assets/460b1cd8-4161-42b2-9983-1134cbeb035f" />
<img width="260" height="520" alt="Screenshot 9" src="https://github.com/user-attachments/assets/db7d4bbb-0539-4aea-bec3-4fa2b316343e" />
<img width="260" height="520" alt="Screenshot 10" src="https://github.com/user-attachments/assets/59f74a72-33b0-4c55-8c6c-c9c54fc0dd1d" />

---

## 🔍 Temel Özellikler

- **Etkinlik Oluşturma ve Katılım**  
  Kullanıcılar konser, halı saha, okey partisi, buluşma gibi etkinlikler oluşturabilir ve diğer kullanıcılar bu etkinliklere katılabilir.

- **Bilet Satın Alma Sistemi**  
  Konser veya maç gibi biletli etkinliklere kullanıcılar doğrudan uygulama üzerinden bilet satın alarak katılabilir.

- **Sosyal Etkileşim**  
  Kullanıcılar birbiriyle arkadaş olabilir, post paylaşabilir, etkinliklere yorum yapabilir ve katılım bildirebilir.

- **QR Kod ile Giriş ve Moderasyon**  
  Etkinlik alanında görevli moderatörler, sistemin sağladığı **QR kod kontrol paneli** sayesinde kullanıcıların biletlerini doğrulayabilir.

- **Gerçek Zamanlı Kullanıcı Etkileşimi**  
  Arkadaşlık istekleri, yorumlar ve etkinlik katılımları anlık olarak sistemde güncellenmektedir.

---

## 👥 Kullanıcı Rolleri

- **Standart Kullanıcılar**
  - Etkinlik oluşturabilir
  - Bilet satın alabilir
  - Arkadaş ekleyebilir ve içerik paylaşabilir
  - Etkinliklere katılım sağlayabilir

- **Moderators**
  - QR kod üzerinden katılımcıların biletlerini tarayarak etkinlik girişlerini denetler
  - Katılımcı listesini görebilir ve kontrol edebilir

---

## 🧱 Teknolojik Yapı (Özet)

- **Frontend:** React.js (Bu proje: `vize-ui`)
- **Backend API:** Node.js / Express (bağlantılıdır)
- **Veritabanı:** MongoDB / Firebase (isteğe göre)
- **Authentication:** JWT tabanlı kimlik doğrulama
- **QR Kod:** Dinamik QR kod üretimi ve tarama
- **Gerçek Zamanlılık:** WebSocket veya Firebase (isteğe göre)

---

## 🌐 Kullanım Senaryoları

- 🎶 Kullanıcı A bir konser bileti satın alır ve QR kodu ile giriş yapar  
- 🏟️ Kullanıcı B bir halı saha etkinliği oluşturur, arkadaşlarını davet eder  
- 🎲 Kullanıcı C “Okeye 4. arıyorum” etkinliği açar, bölgedeki kullanıcılar katılır  
- 📱 Kullanıcılar post paylaşır, yorum yapar, birbirlerini arkadaş olarak ekler  
- 🛂 Moderatör QR kodu tarayarak katılımcının etkinlik biletini doğrular  

---

## 📄 Lisans

MIT © 2025 Mustafa Tezcan
