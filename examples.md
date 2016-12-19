# Examples examples

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
