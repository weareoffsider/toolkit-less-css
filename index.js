var REM_BASE = 16;

var funcs = {
    /* ---------------------------------------------------------------------------

      Toolkit: Rem
      ============

      rem takes a value or array of values (in px or unitless) and
      converts to rem.

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

    --------------------------------------------------------------------------- */

    rem: function(css) {
        if (Array.isArray(css.value)) {
            var out = css.value.map(funcs.rem);
            css.value = out;
            return css;
        }
        if (css.value == "auto") return css;
        if (css.value == 0) return css;
        if (css.unit.numerator[0] == "%") return css;

        var newRem = css.value / REM_BASE;
        css.value = newRem;
        css.unit.numerator = ['rem'];
        return css;
    }
};

module.exports.functions = funcs;
module.exports.setRemBase = function(newBase) {
    REM_BASE = newBase;
};

module.exports.loadFunctions = function(less) {
    Object.keys(module.exports.functions).forEach(function(key) {
        less.tree.functions[key] = module.exports.functions[key];
    });
};
