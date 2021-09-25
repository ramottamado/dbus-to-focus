all: install

.PHONY: install lint

install:
	install -d ~/.local/share/gnome-shell/extensions
	cp -a dbus-to-focus@ramottamado.dev/ ~/.local/share/gnome-shell/extensions/

lint:
	eslint dbus-to-focus@ramottamado.dev