# Dash Banner

[![Build Status](https://travis-ci.org/samaritanministries/dash-banner.js.svg?branch=master)](https://travis-ci.org/samaritanministries/dash-banner.js)

#### This is the alert banner for the Dash platform.


## Dependencies

 * [Samaritan CSS](https://github.com/samaritanministries/samaritan-css)
     * `flash`
     * `icons`
 * An element with `data-id=dash-banner-container`

# Releasing a New Version

Steps to release a new version:

1. Update the [change log](/CHANGELOG.md).
2. Run `./bower_deploy.sh`

# Setup

* install node/npm
* npm install
* bower install
* npm install testem -g

# Tests

Run ```testem```

# Usage

Dash Banner requires an element with `data-id=dash-banner-container` on the page.

## Success Example

```coffee
DashBanner.View.showSuccess("Some Success Message")
DashBanner.View.flashSuccess("Some Success Message")
```
`flashSuccess` automatically closes the Banner after 3 sec

## Error Example

```coffee
DashBanner.View.showError("Some Error Message")
DashBanner.View.flashError("Some Error Message")
```
`flashError` automatically closes the Banner after 3 sec


## Action Example

```coffee
DashBanner.View.showAction("Some Action Message", "custom-status")
DashBanner.View.flashAction("Some Action Message", "custom-status")
```

`flashaction` automatically closes the Banner after 3 sec
`showAction` can also be used to attach the Banner to a custom container:

```coffee
DashBanner.View.showAction("Some Action Message", "custom-status", $('.custom-container'))
```
When used in this way the custom container must also be passed to `closeBanner`:

```coffee
DashBanner.View.closeBanner($('.custom-container'))
```


## Closing the Banner

When using `showSuccess`, `showError`, or `showAction` the Banner must be manually closed

```coffee
DashBanner.View.closeBanner()
```

When `showAction` is given a custom container, the custom container must also be passed to `closeBanner`

```coffee
DashBanner.View.showAction("Some Action Message", "custom-status", $('.custom-container'))
DashBanner.View.closeBanner($('.custom-container'))
```

# Running the sample

1. run `testem`
1. `open app/index.html`

# License

MIT License
