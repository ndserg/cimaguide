module.exports = {
  extends: ['stylelint-config-recommended-vue', 'stylelint-config-recess-order'],

  rules: {
    'media-feature-range-notation': 'prefix',
    'no-unknown-custom-properties': null,
    'declaration-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'after-declaration']
      }
    ]
  }
};
