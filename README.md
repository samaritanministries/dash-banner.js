# Dash Banner

[![Build Status](https://travis-ci.org/samaritanministries/dash-banner.js.svg?branch=master)](https://travis-ci.org/samaritanministries/dash-banner.js)

####This is the alert banner for the Dash platform.


## Dependencies

 * [Samaritan CSS](https://github.com/samaritanministries/samaritan-css)
     * `flash`
     * `icons`

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

## Success Example

```coffee
DashBanner.View.flashSuccess("Some Success Message")
```

## Error Example

```coffee
DashBanner.View.flashError("Some Error Message")
```

# Running the sample

1. run `testem`
1. `open app/index.html`

# License

MIT License
