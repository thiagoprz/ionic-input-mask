Ionic Mask Directive
===



Install
--
npm i @thiagoprz/ionic-input-mask

Usage
---
Import into your component's module and add the "mask" property to ion-input:

my-component.module.ts
```
import {IonicInputMaskModule} from "@thiagoprz/ionic-input-mask";

@NgModule({
    ...
    imports: [
        ...,
        IonicInputMaskModule
    ],
    ...
})
export class MyComponent {}
```

my-component.html
```
<ion-content>
    ...
    <ion-item>
      <ion-label>Phone</ion-label>
      <ion-input class="ion-text-right" [(ngModel)]="phone" maxlength="255" type="tel" placeholder="(99)9999-99999" mask="(**)****-*****"></ion-input>
    </ion-item>
    ...
</ion-content>
```
