/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'next/core-web-vitals', 'prettier'],
  parser: '@typescript-eslint/parser', // ソース解析に@typescript-eslint/parserを使うよう設定
  plugins: ['@typescript-eslint'], // プラグインとしてロードし、コードベース内で typescript-eslint のルールを使用できるようになる
  root: true, // このファイルがルートレベルのファイルであることを示す
};
