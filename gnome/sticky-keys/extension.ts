import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Indicator from "./indicator.js";
import Gio from 'gi://Gio';
import Clutter from 'gi://Clutter';

const KEYBOARD_A11Y_SCHEMA    = 'org.gnome.desktop.a11y.keyboard';
const KEY_STICKY_KEYS_ENABLED = 'stickykeys-enable';
const KBD_A11Y_MODS_STATE_CHANGED = "kbd-a11y-mods-state-changed";

// How does Mutter, Wayland, Clutter, etc all name this?
// xkb calls them shift, control, mod1, mod2, ..., mod5, etc.
// This also doesn't account for 'virtual' modifiers.
const MODIFIER_MASKS = [
	"Shift",
	"Caps" /* Unused ? */,
	"Ctrl",
	"Alt"
];

export default class AccessibilityExt extends Extension {
  private indicator?: Indicator;

	private a11ySettings?: Gio.Settings;
	private a11ySettingsSignal?: number;

	private seat?: Clutter.Seat;
	private seatSignal?: number;

  enable() {
    console.log("GNOME Accessibility Improvements Extension is now enabled");

    if (!this.indicator) {
      this.indicator = new Indicator();
      Main.panel.addToStatusArea(this.uuid, this.indicator);
    }

		this.a11ySettings = new Gio.Settings({schema_id: KEYBOARD_A11Y_SCHEMA});
		this.a11ySettingsSignal = this.a11ySettings.connect(`changed::${KEY_STICKY_KEYS_ENABLED}`, this.updateA11ySettings.bind(this));

		this.seat = global.stage.context.get_backend().get_default_seat();
		this.seatSignal = this.seat.connect(KBD_A11Y_MODS_STATE_CHANGED, this.updateStickyModifiers.bind(this));

		// XXX: If this extension is enabled while sticky keys is already enabled and sticking a  modifier,
		// can it be queried? I didn't find any way to do this while reading mutter's meta-keyboard-a11y.c.

		this.updateA11ySettings(this.a11ySettings, KEY_STICKY_KEYS_ENABLED);
  }

  disable() {
    this.indicator?.destroy();
    this.indicator = undefined;

		if (this.a11ySettingsSignal) {
			this.a11ySettings?.disconnect(this.a11ySettingsSignal);
			this.a11ySettingsSignal = undefined;
		}

		if (this.seatSignal) {
			this.seat?.disconnect(this.seatSignal);
			this.seatSignal = undefined;
		}
  }

  updateA11ySettings(settings: Gio.Settings, key: string) {
		let enabled = settings.get_boolean(key);

		if (enabled) {
			this.indicator?.show();
		} else {
			this.indicator?.hide();
		}
	}

	updateStickyModifiers(_seat: Clutter.Seat, latched: number, _locked: number) {
		this.indicator?.updateStickyModifiers(latched);
	}
}
