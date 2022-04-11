# Focus WMClass GNOME Shell Extension

This extension provides dbus method to focus app window on GNOME Shell by their `WM_CLASS` property (similar like `wmctrl -xa`).

## Installation

```sh
git clone git://github.com/ramottamado/gnome-shell-focus-wmclass.git
cd dbus-to-focus
make install
```

## Example Usage

```sh
gdbus call \
  --session \
  --dest org.gnome.Shell \
  --object-path /org/gnome/Shell/Window \
  --method org.gnome.Shell.Window.FocusWMClass "Spotify"
```
