module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  testEnvironment: "jsdom",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec1|test1).[tj]s?(x)"
  ],
  "moduleFileExtensions": [
    "js",
    "ts",
    "json",
    // 告诉 Jest 处理 `*.vue` 文件
    "vue"
  ],
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  "transform": {
    // 用 `vue-jest` 处理 `*.vue` 文件
    ".*\\.(vue)$": "vue-jest",
    '\\.(js|jsx|ts|tsx)$': [
      'babel-jest', {
        presets: [
          [
            '@babel/preset-env',
            {
              modules: "umd",
              targets: {
                node: "current",
              },
            },
          ],
          '@babel/preset-typescript',
        ],
        "plugins": ["@vue/babel-plugin-jsx", "@babel/plugin-transform-runtime"]
      }
    ]
  }
};
