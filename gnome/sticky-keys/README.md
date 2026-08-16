


# Building

## Dependencies

You'll need nodejs and npm. Then run:

```
npm install
```

You'll also need `glib-compile-schemas` and `gnome-extensions` tools which come with a system that has GNOME available.

## Build it

`sh build.sh`

# Installing

First, download the latest release or build it locally, then run:

```
gnome-extensions install gaia@oakandspark.com.shell-extension.zip
```


You'll need to logout and log back into GNOME in order for GNOME to see this new extension.

Then enable it with this command:

```
gnome-extensions enable gaia@oakandspark.com
```
