const esModules = ['@bsmp/webcomponents-react'].join('|');

module.exports = {
  displayName: 'app-react-ionic',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/app-react-ionic',
  moduleNameMapper: {
    '.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/app/__mocks__/fileMock.js',
  },
  modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
