all: install

.PHONY: install lint

install:
	install -d ~/.local/share/gnome-shell/extensions
	cp -a focus-wmclass@ramottamado.dev/ ~/.local/share/gnome-shell/extensions/

lint:
	eslint focus-wmclass@ramottamado.dev