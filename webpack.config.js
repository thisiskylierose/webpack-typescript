const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')

// https://florianbrinkmann.com/en/5351/webpack-sass-multiple-entry-points/

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: ['./src/scripts/main.ts', './src/styles/main.scss'],
    test: ['./src/scripts/test.ts', './src/styles/test.scss']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
            }
          },
          {
						loader: 'sass-loader'
					}
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      exclude: ['.gitkeep']
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true
        },
      }
    }
  }
};
