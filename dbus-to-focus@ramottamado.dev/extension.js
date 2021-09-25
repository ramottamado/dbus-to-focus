/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

'use strict';

const Gio = imports.gi.Gio;
const Main = imports.ui.main;

const DBusToFocusI =
    '<node>' +
    '   <interface name="dev.ramottamado.DBusToFocus">' +
    '       <method name="FocusWMClass">' +
    '           <arg type="s" direction="in" name="wm_class" />' +
    '           <arg type="b" direction="out" name="success"/>' +
    '           <arg type="s" direction="out" name="result"/>' +
    '       </method>' +
    '   </interface>' +
    '</node>';

class DBusToFocus {
    constructor() {
        this._dbusImpl = Gio.DBusExportedObject.wrapJSObject(DBusToFocusI, this);
    }

    FocusWMClass(wm_class) {
        let result;
        let success;

        try {
            let w = global.get_window_actors()
                .map(a => a.meta_window)
                .find(mw => mw.get_wm_class() === wm_class);

            result = JSON.stringify(Main.activateWindow(w));

            result = result == undefined
                ? 'Success'
                : result;

            success = true;
        }
        catch (e) {
            result = `${e}`;
            success = false;
        }

        return [success, result];
    }

    enable() {
        this._dbusImpl.export(Gio.DBus.session, '/dev/ramottamado/DBusToFocus');
    }

    disable() {
        if (this._dbusImpl) this._dbusImpl.unexport();
    }
}

function init() {
    return new DBusToFocus();
}
