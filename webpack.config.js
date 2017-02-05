const VirtualModulePlugin = require('virtual-module-webpack-plugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const fs = require('fs');
const localization = require('./src/texts/localization.json');
const generated = {
  path: 'https://some-example-host.com/foo/bar?baz'
};

fs.writeFileSync('src/texts/localization.d.ts', `declare var _default: ${typify(localization)}; export = _default;`, 'utf8');
fs.writeFileSync('src/config.d.ts', `declare var _default: ${typify(generated)}; export = _default;`, 'utf8');

function typify(obj) {
  const decl = {}
  Object.keys(obj).forEach(key => decl[key] = typeof(obj[key]));
  return JSON.stringify(decl);
}

function copy(source, target) {
  fs.createReadStream(source).pipe(fs.createWriteStream(target));
}

function createDirectory(dir) {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
}

createDirectory('dist');
copy('src/index.html', 'dist/index.html');

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'dist/bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [
      new TsConfigPathsPlugin()
    ]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
    ]
  },
  plugins: [
    new VirtualModulePlugin({
      moduleName: 'src/example.ts',
      contents: 'export default { content: "hello world, again..." };'
    }),
    new VirtualModulePlugin({
      moduleName: 'src/config.json',
      contents: JSON.stringify(generated)
    })
  ]
}