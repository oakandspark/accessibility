import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Mtk from 'gi://Mtk';
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import Indicator from "./indicator.js";

export default class AccessibilityExt extends Extension {
  private indicator?: Indicator;

  enable() {
    console.log("GNOME Accessibility Extension is now enabled");

    if (!this.indicator) {
      this.indicator = new Indicator();
      Main.panel.addToStatusArea(this.uuid, this.indicator);
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

