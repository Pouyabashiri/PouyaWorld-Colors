(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.colorPalettes = {}));
})(this, (function (exports) { 'use strict';
  const palettes = [{"name":"River and Locomotive","colors":["#009d9e","#eb904f","#746d85","#c67770","#e6646b","#849a76","#70acb1"]},{"name":"Riverside Trees","colors":["#83c3ff","#785f80","#d38385","#d38385","#28a2a5","#eead83","#504651","#feb96e"]}]

  /**
   * @param {Array} palettes
   * @return {Array} Array of arrays of colors
   */
  function flattenPalettes(palettes) {
    return palettes.reduce((acc, palette) => {
      if (palette.hasOwnProperty('palettes')) {
        return acc.concat(flattenPalettes(palette.palettes));
      }
      return acc.concat(palette);
    }, []);
  }

  let localPalettes = palettes;
  let localPalettesFlat = flattenPalettes(localPalettes);

  const colorPalettes = {
    palettes: localPalettes,
    palettesFlat: localPalettesFlat,
    get: (nameOrIndex) => {
      if (typeof nameOrIndex === 'number') {
        return localPalettesFlat[nameOrIndex];
      }
      return localPalettesFlat.find((p) => p.name === nameOrIndex);
    },
    random: (nbr) => {
      if (nbr && typeof nbr != 'number' || nbr > 1 || nbr < 0) {
        throw new Error('random() only accepts a number between 0 and 1');
      }

      return localPalettesFlat[
          Math.floor(
              (nbr || Math.random()) * localPalettesFlat.length,
          )
      ];
    },
    addPalettes: (newPalettes) => {
      localPalettes = palettes.concat(newPalettes);
      localPalettesFlat = flattenPalettes(localPalettes);
    },
  };

  
  exports.colorPalettes = colorPalettes;
}));