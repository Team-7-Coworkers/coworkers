module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: '^(?<type>.+):\\s(?<subject>.+)$',
      headerCorrespondence: ['type', 'subject'],
    },
  },
  rules: {
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [0],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        '🎉 init',
        '✨ feat',
        '📦️ chore',
        '💄 design',
        '🚑️ fix',
        '✅ test',
        '🚀 deploy',
        '🔨 refactor',
        '🚚 rename',
        '📚 docs',
        '🔥 remove',
      ],
    ],
  },
};
