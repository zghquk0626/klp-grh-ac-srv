(function (global) {
  const treatmentDetails = {
    rejuve_botox: {
      key: 'rejuve_botox',
      n: 'Rejuve, Botox',
      d: 'Your concern points to fine lines, wrinkles, or a need for subtle lifting and smoothing. Rejuve and Botox work together to refresh the skin and soften expression lines for a rested, natural finish.'
    },
    dermal_filler: {
      key: 'dermal_filler',
      n: 'Dermal Filler',
      d: 'Volume loss or facial contour concerns are the focus here. Dermal filler restores structure and balance in the cheeks, jawline, lips, or temples with natural-looking definition.'
    },
    facial_peeling_diamond: {
      key: 'facial_peeling_diamond',
      n: 'Medical Facial, Peeling, Diamond Silk',
      d: 'For uneven texture or tone, a medical facial, peeling, or Diamond Silk is the best fit. These options help smooth the skin surface, refine texture, and improve overall clarity with no downtime.'
    },
    skinbooster_subsisi: {
      key: 'skinbooster_subsisi',
      n: 'Skinbooster & Subsisi',
      d: 'Your skin needs deeper renewal and texture refinement. Skinbooster supports hydration and regeneration, while Subsisi helps improve uneven texture and overall skin quality.'
    },
    skinbooster: {
      key: 'skinbooster',
      n: 'Skinbooster',
      d: 'This route is best for dull, dehydrated, or tired-looking skin. Skinbooster helps restore glow, hydration, and overall skin quality from within.'
    },
    lifu: {
      key: 'lifu',
      n: 'LIFU',
      d: 'For sagging skin, a softer jawline, or a double chin, LIFU is a strong fit. It lifts, tightens, and contours without needles or downtime.'
    }
  };

  function getQuizRecommendation(firstAnswer, secondAnswer) {
    const primary = String(firstAnswer || '').toLowerCase();
    const recovery = String(secondAnswer || '').toLowerCase();

    if (primary === 'lines') {
      return treatmentDetails.rejuve_botox;
    }

    if (primary === 'volume') {
      return treatmentDetails.dermal_filler;
    }

    if (primary === 'texture') {
      return recovery === 'downtime' ? treatmentDetails.skinbooster_subsisi : treatmentDetails.facial_peeling_diamond;
    }

    if (primary === 'glow') {
      return recovery === 'downtime' ? treatmentDetails.skinbooster : treatmentDetails.facial_peeling_diamond;
    }

    if (primary === 'chubby') {
      return recovery === 'downtime' ? treatmentDetails.dermal_filler : treatmentDetails.lifu;
    }

    return treatmentDetails.rejuve_botox;
  }

  const api = { getQuizRecommendation, treatmentDetails };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  global.getQuizRecommendation = getQuizRecommendation;
})(typeof window !== 'undefined' ? window : globalThis);
