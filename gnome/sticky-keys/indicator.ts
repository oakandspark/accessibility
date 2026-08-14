import St from 'gi://St';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import GObject from 'gi://GObject';

@GObject.registerClass
export default class Indicator extends PanelMenu.Button {
  private icon?: St.Icon;

  constructor() {
    super(0.0, _("xdotool usage indicator"));
    this.icon ??= new St.Icon({
      // XXX: Perhaps pick a more appropriate icon?
      iconName: "face-smile-symbolic",
      style_class: "system-status-icon",
    });

    this.add_child(this.icon);
  }

  active() {
    this.icon?.add_style_class_name("active")
  }
}

