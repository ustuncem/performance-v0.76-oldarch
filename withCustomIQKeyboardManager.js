const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const withCustomIQKeyboardManager = config => {
  return withDangerousMod(config, [
    'ios',
    async modConfig => {
      const podfilePath = path.join(modConfig.modRequest.platformProjectRoot, 'Podfile');
      const podfileContent = fs.readFileSync(podfilePath, 'utf8');

      // Check if the custom pod is already added
      if (!podfileContent.includes('IQKeyboardManagerSwift')) {
        console.log('Adding IQKeyboardManagerSwift to Podfile');

        // Insert the custom pod under the config section
        const updatedPodfileContent = podfileContent.replace(
          /(config = use_native_modules!\(config_command\)\n)/,
          `$1  pod 'IQKeyboardManagerSwift', :git => 'https://github.com/douglasjunior/IQKeyboardManager.git', :branch => 'react-native-keyboard-manager'\n`
        );

        fs.writeFileSync(podfilePath, updatedPodfileContent);
      }

      return modConfig;
    },
  ]);
};

module.exports = withCustomIQKeyboardManager;
