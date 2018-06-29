import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Form } from '@angular/forms';

@Component({
  selector: 'text-editor',
  template: `<textarea id="{{elementId}}" value="{{elementValue}}"></textarea>`
})
export class TextEditorComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Input() elementValue: string;
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'textcolor'],
      skin_url: '../assets/skins/lightgray',
      menubar: false,
      toolbar: ['forecolor | bold italic underline | alignleft aligncenter alignright alignjustify'],
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
