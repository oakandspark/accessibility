import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Indicator from "./indicator.js";

export default class AccessibilityExt extends Extension {
  private indicator?: Indicator;

  enable() {
    console.log("GNOME Accessibility Improvements Extension is now enabled");

    if (!this.indicator) {
      this.indicator = new Indicator();
      Main.panel.addToStatusArea(this.uuid, this.indicator);

      this.indicate_activity();
    }
  }

  disable() {
    this.indicator?.destroy();
    this.indicator = undefined;
  }

  indicate_activity() {
    this.indicator?.active();
  }
}
