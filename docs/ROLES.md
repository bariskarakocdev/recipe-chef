# 👨‍🍳 Ekip Rolleri ve Görev Dağılımı

DataChefs projesinde sorumluluklar, uzmanlık alanlarına ve platform hedeflerine göre aşağıdaki şekilde paylaştırılmıştır:

## 📋 Görev Dağılım Tablosu

| Ekip Üyesi | Rol | Temel Sorumluluklar |
| :--- | :--- | :--- |
| **Barış Karakoç** | **Web & Frontend Developer** | Projenin tüm web arayüzü (React), bileşen mimarisi ve sistem entegrasyonu. |
| **Selim Anafıev** | **Mobile UI/UX Designer** | Mobil uygulamanın görsel tasarımı, kullanıcı deneyimi (UX) ve prototipleme süreçleri. |
| **Muhammed Kadir Bük** | **AI & Machine Learning Engineer** | Görüntü işleme modelleri (malzeme tanıma) ve interaktif Chatbot algoritmaları. |


---

## 🤝 Notlar
- **Web Kanalı:** Barış Karakoç tarafından tek başına yönetilmektedir.
- **Mobil Kanalı:** Tasarım ve geliştirme olarak iki ayrı uzmanlık alanına bölünmüştür.
- **Veritabanı & Backend:** Ekip üyeleri, kendi sorumlu oldukları platformların (Web/Mobil) backend ihtiyaçlarını ortaklaşa veya AI/Mobile geliştiriciler desteğiyle yürütecektir.


## 📌 Git Çalışma Akışı (Workflow) Kuralları

Ekip içi iletişimi güçlü tutmak ve süreci basitleştirmek adına projemizde **alt dal (branch) açılmayacaktır**. Tüm geliştirmeler doğrudan `main` (ana) dal üzerinden yürütülecektir.

**Ekip Üyelerinin Uyması Gereken Kurallar:**
1. **Geliştirmeye Başlamadan Önce:** Koda başlamadan önce mutlaka en güncel hali bilgisayarınıza çekin:
   `git pull origin main`
2. **Ortak İnceleme (Review):** Yazılan kodlar doğrudan gönderilmeden önce, ekip üyeleriyle birlikte (ekran paylaşımı veya yan yana) kontrol edilmelidir.
3. **Doğrudan Gönderim:** Kodun hatasız çalıştığı onaylandıktan sonra, commit işlemi yapılıp doğrudan `main` dalına pushlanacaktır.
- **Commit Standartları:** Her commit, ne yapıldığını açıkça belirten (örneğin: `feat:`, `fix:`, `docs:`) önekler içermelidir.
- **Senkronizasyon:** Her çalışma öncesi `git pull origin main` yapılarak güncel kod üzerinden çalışılacaktır.
