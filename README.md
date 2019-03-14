# Vedu2
## ::Super Git Guide Kaynak::
http://rogerdudler.github.io/git-guide/index.tr.html

ayrıca http://volkanaltan.blogspot.com/2012/05/git-notlarm.html

ayrıca https://medium.com/kodcular/k%C4%B1saca-git-ba0877d56663

ayrıca https://medium.com/@odayibasi/git-komutlar%C4%B1-ve-kullan%C4%B1m%C4%B1-51ec0c07a434

ayrıca https://www.slideshare.net/vigoo1/nsanlar-iin-git


## Nasıl local source, remote source(github)'dan güncellenir
PS C:\ops\vedu2github> git pull https://github.com/aydincandan/vedu2github.git master

## Nasıl remote source(github), localden yaratılır ve güncellenir
... Stage All Changes

... Commit All [açıklama soracak]

... Push to master

veya

git remote add vedu2github https://github.com/aydincandan/vedu2github.git (1 kerelik gerekiyor)

username soracak

şifre soracak

git push --set-upstream vedu2github master

ref : http://blog.yararman.com/visual-studio-code-ile-github-kullanimi/


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



https://medium.com/kodcular/k%C4%B1saca-git-ba0877d56663

git(clone-pull-add-commit-push)

git clone https://github.com/aydincandan/xxxxx.git {diyerek kendi repomuzu locale çekelim}

cd xxxxx {içine girelim}

git config --global user.name "aydincandan"

git config --global user.email "aydincandan@gmail.com"

<repeat point>

git status

git pull {illaki diyelim, remote tarafı güncellenmiş olabilir}

{şimdi klasöre bazı dosyalar ekle, veya varolan bazı dosyaların içeriğini değiştir}

	git add . {diyerek yukarıdaki değişiklikleri INDEX'(stage?) bildiriyoruz.}

	git commit -m "tüm değişiklik ve eklemelerin bu şekilde bir açıklamasını yazıyoruz"

	git push {ve remote'a gönderiyoruz}

{şimdi de remote tarafına geçip 'Create New File' ile bir dosya ekleyelim yada bir dosyayı editleyelim}

<goto repeat>