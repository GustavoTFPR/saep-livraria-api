import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/', 'coverage/', 'node_modules/'] },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // nos testes lidamos com o corpo da resposta (any do supertest) — não brigar com isso
    // no-unused-vars desligado pq o fluxo pede o plano (it.todo) com os imports já prontos
    // pro request/app, antes de qualquer it de verdade usá-los
    files: ['tests/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    // arquivos JS de config (CommonJS) — não type-checked e com globais do Node
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      sourceType: 'commonjs',
      parserOptions: { projectService: false },
      globals: {
        module: 'writable',
        require: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
      },
    },
  },
  {
    // eslint.config.mjs (ESM) — fora do type-check pra não brigar com o project service
    files: ['**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      parserOptions: { projectService: false },
    },
  },
);