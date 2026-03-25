# 👨‍🍳 Ekip Rolleri ve Görev Dağılımı

DataChefs projesinde sorumluluklar, uzmanlık alanlarına ve platform hedeflerine göre aşağıdaki şekilde paylaştırılmıştır:

## 📋 Görev Dağılım Tablosu

| Ekip Üyesi | Rol | Temel Sorumluluklar |
| :--- | :--- | :--- |
| **Barış Karakoç** | **Web & Frontend Developer** | Projenin tüm web arayüzü (React), bileşen mimarisi ve sistem entegrasyonu. |
| **Ekip Üyesi 2** | **Mobile UI/UX Designer** | Mobil uygulamanın görsel tasarımı, kullanıcı deneyimi (UX) ve prototipleme süreçleri. |
| **Ekip Üyesi 3** | **AI & Machine Learning Engineer** | Görüntü işleme modelleri (malzeme tanıma) ve interaktif Chatbot algoritmaları. |
| **Ekip Üyesi 4** | **Mobile Developer** | Mobil uygulama (iOS/Android) geliştirme, mobil API entegrasyonu ve uygulama yayını. |

---

## 🤝 Notlar
- **Web Kanalı:** Barış Karakoç tarafından tek başına yönetilmektedir.
- **Mobil Kanalı:** Tasarım ve geliştirme olarak iki ayrı uzmanlık alanına bölünmüştür.
- **Veritabanı & Backend:** Ekip üyeleri, kendi sorumlu oldukları platformların (Web/Mobil) backend ihtiyaçlarını ortaklaşa veya AI/Mobile geliştiriciler desteğiyle yürütecektir.

- ## 🛠️ İş Birliği ve Kod Yönetimi (Git Workflow)

Proje güvenliğini ve kod kalitesini korumak için aşağıdaki kurallar uygulanacaktır:

- **Main Branch Koruması:** `main` dalına doğrudan kod gönderilmeyecektir (Direct push yasaktır).
- **Özellik Geliştirme:** Her yeni özellik veya hata düzeltme için ayrı bir dal (`feature/ozellik-adi` veya `fix/hata-adi`) açılacaktır.
- **Pull Request (PR) Süreci:** - Geliştirme bitince `main` dalına yönelik bir Pull Request açılacaktır.
    - Kodlar, en az bir ekip üyesi tarafından incelenip onaylandıktan sonra `merge` edilecektir.
- **Commit Standartları:** Her commit, ne yapıldığını açıkça belirten (örneğin: `feat:`, `fix:`, `docs:`) önekler içermelidir.
- **Senkronizasyon:** Her çalışma öncesi `git pull origin main` yapılarak güncel kod üzerinden çalışılacaktır.
