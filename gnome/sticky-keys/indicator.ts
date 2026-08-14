import St from 'gi://St';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import GObject from 'gi://GObject';

// lol typescript vs gobject will be a battle that never ends, will it?
@(GObject.registerClass as any)
export default class Indicator extends PanelMenu.Button {
  private icon?: St.Icon;

  constructor() {
    super(0.0, _("sticky keys usage indicator"));
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
} // Indicator
//const GObjIndicator = GObject.registerClass({}, Indicator)

//export default GObjIndicator;
