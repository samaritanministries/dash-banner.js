# Dash Banner

[![Build Status](https://travis-ci.org/samaritanministries/dash-banner.js.svg?branch=master)](https://travis-ci.org/samaritanministries/dash-banner.js)
[![Dash-Banner Version](https://img.shields.io/badge/Version-2.1.0-green.svg)]()

Dash Banner has been converted to use ES6 and Webpack, however it is still being shipped with a bundled Javascript file for use with pre-ES6 applications. Instructions for both are included.

## Installation

Dash-Banner.js is delivered as a [bower](bower.io) component.

1. Install bower
  ```bash
  npm install -g bower
  ```

  >Note: Bower requires node, npm and git.

2. Create a `bower.json` file
  ```bash
  bower init
  ```

3. Install the dash-banner.js bower component and save it to your `bower.json` file
  ```bash
  bower install dash-banner.js --save
  ```

## Usage

* [Dashing Framework](https://github.com/dashframework/dashing/)
* Add an element with `data-id=dash-banner-container` to your page.
* [Additional examples](examples.md)

### Including SASS in your project

Include component styles in your main application SASS file.

```scss
@import "path/to/dash_banner/dist/dash-banner"
```

### ES5

1. Add `<script src="path/to/dash_banner/dist/dash-banner.js"></script>` to your index.
2. `DashBanner.View.flashSuccess("Great Success!");`

### ES6

```javascript
import DashBannerView from "path/to/dash_banner/scripts/dash_banner/view.js"
DashBannerView.flashSuccess("Great Success!");
```

## Project Setup

### Dependencies

* install node/npm
* npm install
* bower install

### Running the Tests

For a single run of the tests:
`npm test`

To run the tests with a watcher:
`npm run karma`

### Running the Demo

1. `npm run demo`
2. Open `http://localhost:8080/webpack-dev-server/app`

## Releasing a New Version

1. Update [the changelog](CHANGELOG.md)
2. Commit your changes
3. Run `./bower_deploy.sh`

>Note: With the addition of the font icons, the icons will not display unless the page is loaded into a web server. grunt uxServer is not available to be ran in this component as of now, however apache or stack can be used to run it properly (LAMP/WAMP/MAMP).

## License

[MIT License](LICENSE.md)
