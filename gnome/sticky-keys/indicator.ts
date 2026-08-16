import St from 'gi://St';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import GObject from 'gi://GObject';
import Clutter from 'gi://Clutter';

// lol typescript vs gobject will be a battle that never ends, will it?
@(GObject.registerClass as any)
//export default class Indicator extends PanelMenu.Button {
export default class Indicator extends PanelMenu.Button {
  private icon?: St.Icon;
  //private text?: St.Label;

	private stickied?: St.Label[];

  constructor() {
    super(0.0, _("sticky keys usage indicator"));

    this.icon ??= new St.Icon({
      iconName: "accessibility-sticky-keys-symbolic",
      style_class: "system-status-icon",
			accessible_name: "Sticky Keys are enabled",
    });

		// XXX Make an option to use symbols instead of words for modifier keys  
		// Reference: https://en.wikipedia.org/wiki/Modifier_key
		// ⇧ - Shift
		// ⌃ - Control
		// ⎇ - Alt
		// ⌘ - Command (macOS)
		// ⊞ - Windows
		function stickyLabel(text: string) {
			return new St.Label( {
				style_class: "sticky-key",
				text: text,
				y_align: Clutter.ActorAlign.CENTER,
				visible: false, // Hide by default.
			});
		}

		this.stickied = [
			stickyLabel("Shift"),
			// Caps won't really show up since it's a lock modifier, not a depressed modifier,
			// and Sticky Keys doesn't operate on it. Delete it?
			stickyLabel("Caps"),
			stickyLabel("Ctrl"),
			stickyLabel("Mod1"),
			stickyLabel("Mod2"),
			stickyLabel("Mod3"),
			stickyLabel("Mod4"),
			stickyLabel("Mod5"),
		];

		const container = new St.BoxLayout({
			style_class: "sticky-keys-indicator",
		});

		for (const label of this.stickied) {
			container.add_child(label);
		}

		// Show after the modifier labels to keep it from moving around visually
		container.add_child(this.icon);

		this.add_child(container);

		//const gaiaSettings = new Gio.Settings({ schema_id: "com.oakandspark.gaia" });
		//const useSymbols = new PopupMenu.PopupSwitchMenuItem("Show Symbols", false);
  }

	updateStickyModifiers(mask: number) {
		if (this.stickied) {
			if (mask == 0) {
				this.remove_style_class_name("sticky-active");
				for (const label of this.stickied) {
					label.hide();
				}
			} else {
				this.add_style_class_name("sticky-active");
				for (const [i, label] of this.stickied.entries()) {
					if (mask & 1 << i) {
						label.show(); 
					} else {
						label.hide();
					}
				}
			}

		}
	}

} // Indicator
//const GObjIndicator = GObject.registerClass({}, Indicator)

//export default GObjIndicator;
