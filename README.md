# Dash Banner

[![Build Status](https://travis-ci.org/samaritanministries/dash-banner.js.svg?branch=master)](https://travis-ci.org/samaritanministries/dash-banner.js)

#### This is the alert banner for the Dash platform.

Right now, this component is in a state of flux, transitioning between ES5 and ES6. As of now, all of the JavaScript has been migrated to using Webpack, however the CSS files are still built via Grunt. Ideally, grunt would be entirely removed in favor of Webpack.

## Dependencies

 * [Dashing Framework](https://github.com/dashframework/dashing/)
 * Add an element with `data-id=dash-banner-container` to your page.

# Usage

Dash Banner requires an element with `data-id=dash-banner-container` on the page.

## ES6 Applications

```javascript
import DashBannerView from "path/to/dash_banner/scripts/dash_banner/view.js"
DashBannerView.flashSuccess("Great Success!");
```

## ES5 Applications

1. Add `<script src="path/to/dash_banner/scripts/dash_banner/view.js"></script>` to your index.
2. `DashBanner.View.flashSuccess("Great Success!");`

# Project Setup

 * install node/npm
 * npm install
 * bower install

# Running the Tests

Run `npm test`

# Releasing a New Version

Steps to release a new version:

1. Update the [change log](/CHANGELOG.md).
2. Run `./bower_deploy.sh`

# More examples

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
2. `open app/index.html`

>Note: With the addition of the font icons, the icons will not display unless the page is loaded into a web server. grunt uxServer is not available to be ran in this component as of now, however apache or stack can be used to run it properly (LAMP/WAMP/MAMP).

## Including SASS in your project

Include component styles in your main application SASS file.

```scss
@import "bower_components/dash-spinner.js/styles/dash-spinner";
```
>Note: Depending on your bower configuration, this file path may be different

## Banner CSS Classes

Multiple classes can be called by the CSS supplied within this component. They are as follows:

## Banner General

<dl>
 <dt>.dash-banner-container</dt>
 <dd>This class is required as the initial wrapper.</dd>
 <dt>.dash-banner</dt>
 <dd>This activates the initial banner, alone it will provide a generic banner with a gray background.</dd>
 <dt>.dash-banner--undefined</dt>
 <dd>A gray background by default, this class is meant to be overwritten to any color needed. apply this after .dash-banner has been applied.</dd>
</dl>

## Banner Colors

<dl>
 <dt>.dash-banner--error,  .dash-banner--red</dt>
 <dd>The typical dash red as a banner background.</dd>
 <dt>.dash-banner--success,  .dash-banner--green</dt>  	
 <dd>The typical dash green as a banner background.</dd>
 <dt>.dash-banner--blue</dt>
 <dd>The typical dash blue as a banner background.</dd>
 <dt>.dash-banner--gray, .dash-banner--grey</dt>
 <dd>The typical dash gray/grey as a banner background.</dd>
 <dt>.dash-banner--orange</dt>
 <dd>The typical dash orange as a banner background.</dd>
 <dt>.dash-banner--purple</dt>
 <dd>The typical dash purple as a banner background.</dd>
</dl>

## Banner Other

<dl>
  <dt>.dash-banner--close</dt>
  <dd>This displays the close icon on a banner, currently this functionality is not enabled by any banner</dd>
  <dt>.dash-banner--icon</dt>
  <dd>The size, color, and alignment of the icons displayed by the banner</dd>
  <dt>.dash-banner--title</dt>
  <dd>The size, color, and alignment of the text displayed by the banner</dd>
  <dt>.dash-banner--row</dt>
  <dd>This class provides a simple fix to the normal dash "row" class to prevent overflow within banners. This class should only be added to the "row" containing element for the banner</dd>
  <dt>.dashing-icon--undefined</dt>
  <dd>An icon to be overwritten, displays alert-filled by default</dd>
</dl>


# Banner Example

```html

<div data-id="dash-banner-container">
	<div>
		<div data-id="dash-banner" class="dash-banner dash-banner--error">
  			<div class="row dash-banner--row">
    		<i data-id="banner-icon" class="dashing-icon dashing-icon--white dash-banner--icon dashing-icon--alert-filled"></i>
    		<h3 class="dash-banner--title" data-id="banner-message">Some Error Message 216079393</h3>
    		<div class="dash-banner--close button button--transparent button--icon button--icon--small hidden" data-id="banner-close">
    			<i class="dashing-icon dashing-icon--close dashing-icon--white"></i>
    		</div>
  		</div>
	</div>
</div>

```

# License

MIT License
