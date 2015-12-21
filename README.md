# araştır++
ekşi sözlük araştır linkleri geri geldi! ekşi sözlük başlığı: https://eksisozluk.com/arastir--4441723

# özellikler
* istediğiniz siteleri ekleyip çıkartabilirsiniz. kontrol sizde!

# kurulum
her şeyden önce chrome kullanıyorsanız tampermonkey eklentisini, firefox kullanıyorsanız greasemonkey eklentisi kurun. daha sonra:

## programlama bilgisi olmayanlar ya da build ile uğraşmak istemeyenler için;
<!-- TODO: linkler master ile birleştirilince eklenecek -->
[![chrome](http://icons.iconarchive.com/icons/cornmanthe3rd/plex/16/Internet-chrome-icon.png) chrome için buraya tıklayın]() <br/>
[![firefox](http://icons.iconarchive.com/icons/cornmanthe3rd/plex/16/Internet-firefox-icon.png) firefox için buraya tıklayın]()

## "kendi buildimi kendim hazırlarım" diyenler için;

### malzemeler
* [nodejs](https://nodejs.org/en/)
* gulpjs global kurulumu (`npm install -g gulp` komutu ile kurulabilir)

### hazırlanışı
```bash
$ cd arastirpp
$ npm install
$ gulp build:all
```
ayrıca isteğe göre şu şekilde:
```bash
$ gulp build:chrome
```
ya da
```bash
$ gulp build:firefox
```
komutları ile sadece kullandığınız tarayıcı için build oluşturabilirsiniz. daha sonra araştır butonunuzu servis etmek için tampermonkey/greasemonkey eklentisine hazırlamış olduğunuz buildi eklemeniz yeterli olacaktır. işte bu kadar artık araştır butonunuz emrinize amade.

# ekran görüntüleri
![araştır menüsü ayarlar](http://i.imgur.com/HyTbNw5.png)
![araştır menüsü](http://i.imgur.com/ufRkJpT.png)

# katkı sağlamak için
bu depoyu forkladıktan sonra
```bash
$ git clone https://github.com/[kullanici_adin]/arastirpp.git
$ cd arastirpp
$ npm install
```
komutlarını çalıştırıp geliştirme ortamınızı hazır etmiş olursunuz. daha sonra pull request göndermeden önce `package.json` dosyasındaki `contributors` kısmına şu şekilde:
```json
"Adınız Soyadınız <e-posta adresiniz> (githup profil linkiniz ya da web siteniz)",
```
bir ekleme yaparsanız gönlümüzde yer edinip unutulmazsınız.