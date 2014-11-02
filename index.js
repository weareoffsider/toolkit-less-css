var BASE_PX = 16;



var pxToRelativeUnit = function(css, optBase, unit) {
    var basePx = optBase ? parseInt(optBase.value) : BASE_PX;

    // iterate over space separated values
    if (Array.isArray(css.value)) {
        var out = css.value.map(function(subCss) {
          return pxToRelativeUnit(subCss, optBase, unit);
        });
        css.value = out;
        return css;
    }

    // don't convert nil, percentages or auto
    if (css.value == "auto") return css;
    if (css.value == 0) return css;
    if (css.unit.numerator[0] == "%") return css;

    // prevent accidental double conversion
    if (css.unit.numerator[0] == unit) return css;


    // convert using the base pixel size
    var newVal = css.value / basePx;
    css.value = newVal;
    css.unit.numerator = [unit];
    return css;
}


var funcs = {
/* ---------------------------------------------------------------------------

  Toolkit: Rem / Em
  =================

  rem / em takes a value or array of values (in px or unitless) and
  converts to rem / em.

  e.g.,
  .selector {
    margin: rem(32 auto 16 100%);
    font-size: rem(12);
  }
  
  becomes:
  .selector {
    margin: 2rem auto 1rem 100%;
    font-size: 0.75rem;
  }

  Makes life a little easier when working from designs specced in pixels.
  You can override the base px with a second argument: rem(16, 8) = 2rem

--------------------------------------------------------------------------- */

    rem: function(css, optBase) {
        return pxToRelativeUnit(css, optBase, 'rem');
    },

    em: function(css, optBase) {
        return pxToRelativeUnit(css, optBase, 'em');
    },

/* ---------------------------------------------------------------------------

  Toolkit: Tint / Shade
  =================

  Mix a colour with white (tint) or black (shade). As opposed to lighten or
  darken, this is subtly different in the result. Lightness only affects
  a singular colour channel, whereas tinting/shading will adjust lightness
  and saturation gradually until full white or black.

  Accepts a colour and percentage (with or without the unit).

  .selector {
    color: tint(blue, 50%);
    background: shade(red, 50%);
  }

--------------------------------------------------------------------------- */

    tint: function(css, amount) {
        var perc = amount.value / 100;
        var newRgb = css.rgb.map(function(colorValue) {
            var diff = 255 - colorValue;
            return colorValue + (perc * diff);
        });
        css.rgb = newRgb;
        return css;
    },

    shade: function(css, amount) {
        var perc = amount.value / 100;
        var newRgb = css.rgb.map(function(colorValue) {
            var diff = 0 + colorValue;
            return colorValue - (perc * diff);
        });
        css.rgb = newRgb;
        return css;
    }
};

module.exports.functions = funcs;
module.exports.setBasePx = function(newBase) {
    BASE_PX = newBase;
};

module.exports.loadFunctions = function(less) {
    Object.keys(module.exports.functions).forEach(function(key) {
        less.tree.functions[key] = module.exports.functions[key];
    });
};
