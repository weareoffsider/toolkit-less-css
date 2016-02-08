# Change Log

All notable changes to this project will be documented in this file.

## Unreleased Changes


## 0.2.1 - 2015-02-08
### Fixed
- Missing '@' from 'legacy' variables prevented ie8 fallback styles.
- "Tests" added for to and legacy mq abstractions.

## 0.2.0 - 2014-01-18
### Changed
- Media Query function no longer uses em function, as media queries default to
  16 as their base size regardless of html/body font size.

## 0.1.0 - 2014-12-16
### Added
- support for Less 2.0 plugin system.

### Removed
- support for Less versions < 2.0, as the codebase used hacks to load functions

## 0.0.5 - 2014-11-23
### Fixed
- removed deepcopy dependency breaking npm require

## 0.0.4 - 2014-11-22
### Fixed
- incorrect author understanding of LESS tree API, changed to immutable
  functions to avoid mutating variables in the scope of the rest of the tree

## 0.0.3 - 2014-11-21
### Fixed
- `.ratio` support for strictMath mode

## 0.0.2 - 2014-11-15
### Added
- support for strictMath mode (un-necessary parenthesis)

## 0.0.1 - 2014-11-3
### Added
- tint, shade, rem and em custom functions.
- function for change the base pixel size for custom functions.
- function loader for applying custom functions to Less.
- media query mixin named `.from`, `.to`, and `.from-to`, supporting a legacy
  argument for render in @ie8mode.
- `.modern` mixin for rules that shouldn't render in @ie8mode.
- `.legacy` mixin for rules that should render only in @ie8mode.
- `.clear` mixin for clearfix.
- `.contain-margins`.
- `.font-smoothing`.
- `.inline-transitions`.
- `.ratio` and `.ratio-child` for creating image containers that don't snap on
  page load, and instead hold their size to a specified ratio.
- `.triangle` for creating a CSS triangle.
