module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./'],
        alias: {
          '#': './src',
          '#features': './src/features',
          '#onboarding': './src/features/onboarding',
          '#authentication': './src/features/authentication',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
