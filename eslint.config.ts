import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  // 1. Chỉ định các file/thư mục cần bỏ qua
  { ignores: ['dist', 'node_modules', 'routeTree.gen.ts'] },

  // 2. Cấu hình chung cho project
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
    },
    rules: {
      // Các rules mặc định của React Hooks
      ...reactHooks.configs.recommended.rules,

      // Cấu hình React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Tích hợp Prettier: Báo lỗi nếu code không đúng format của Prettier
      'prettier/prettier': 'error',

      // Một số quy tắc bổ sung giúp code sạch hơn
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // 3. Vô hiệu hóa các rule của ESLint xung đột với Prettier (Phải để cuối cùng)
  prettierConfig,
)
