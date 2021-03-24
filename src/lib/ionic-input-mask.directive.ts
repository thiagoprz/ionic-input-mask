import { Attribute, Directive } from '@angular/core';
import { NgModel } from "@angular/forms";

@Directive({
  selector: '[mask]',
  host: {
    '(keypress)': 'onInputChange($event)'
  },
  providers: [NgModel]
})
export class IonicInputMaskDirective {

  pattern: string;

  /**
   * Construtor
   * @param {NgModel} model
   * @param {string} pattern
   */
  constructor(public model: NgModel,
              @Attribute('mask') pattern: string) {
    this.pattern = pattern;
  }

  /**
   * Listener para mudança de valor do input
   * @param event
   */
  onInputChange(event: any) {
    let value = event.target.value,
      pattern = this.pattern;
    if (event.keyIdentifier === 'U+0008' || event.keyCode === 8 || event.key === 'Backspace') {
      if (value.length) { //prevent fatal exception when backspacing empty value in progressive web app
        //remove all trailing formatting then delete character
        while (pattern[value.length] && pattern[value.length] !== '*') {
          value = value.substring(0, value.length - 1);
        }
        //remove all leading formatting to restore placeholder
        if (pattern.substring(0, value.length).indexOf('*') < 0) {
          value = value.substring(0, value.length - 1);
        }
      }
    } else {
      let maskIndex = value.length,
        formatted = '';
      if (value.length === 1 && value !== pattern[0]) {
        //apply leading formatting
        maskIndex = 0;
        while (maskIndex < pattern.length && pattern[maskIndex] !== '*') {
          formatted += pattern[maskIndex];
          maskIndex++;
        }
      }
      formatted += value;
      if (maskIndex < pattern.length) {
        //apply trailing formatting
        while (pattern[maskIndex] !== '*') {
          formatted += pattern[maskIndex];
          maskIndex++;
        }
      }
      value = formatted;
    }
    event.target.value = value;
    if (this.model) {
      this.model.update.emit(value);
    }
    return true;
  }

}
