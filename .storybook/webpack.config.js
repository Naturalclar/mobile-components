const path = require("path");
const threadLoader = require("thread-loader");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const jsWorkerCommonOptions = {
  workers: 2,
  workerParallelJobs: 50,
  poolTimeout: Infinity,
  poolParallelJobs: 50
};

const babelWorkerOptions = {
  ...jsWorkerCommonOptions,
  name: "babel-pool"
};

const tsWorkerOptions = {
  ...jsWorkerCommonOptions,
  name: "ts-pool"
};

const externalLibs = [
  path.resolve(__dirname, "../node_modules/react-native-elements"),
  path.resolve(__dirname, "../node_modules/react-native-vector-icons"),
  path.resolve(__dirname, "../node_modules/@expo/vector-icons")
];

module.exports = ({ config, mode }) => {
  if (mode === "DEVELOPMENT") {
    threadLoader.warmup(babelWorkerOptions, ["babel-loader"]);
    threadLoader.warmup(tsWorkerOptions, ["ts-loader"]);

    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "cache-loader"
        },
        {
          loader: "thread-loader",
          options: tsWorkerOptions
        },
        {
          loader: "ts-loader",
          options: {
            experimentalWatchApi: true,
            transpileOnly: true,
            happyPackMode: true
          }
        }
      ]
    });
    config.module.rules.push({
      test: /\.jsx?$/,
      include: externalLibs,
      use: [
        {
          loader: "cache-loader"
        },
        {
          loader: "thread-loader",
          options: babelWorkerOptions
        },
        {
          loader: "babel-loader?cacheDirectory?true",
          options: {
            presets: ["module:metro-react-native-babel-preset"]
          }
        }
      ]
    });

    // ts type check
    config.plugins.push(
      new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })
    );
  }

  if (mode === "PRODUCTION") {
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "ts-loader"
        }
      ]
    });
    config.module.rules.push({
      test: /\.jsx?$/,
      include: externalLibs,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["module:metro-react-native-babel-preset"]
          }
        }
      ]
    });
  }

  config.resolve.alias = {
    // react-native を import している箇所を react-native-web に変換
    "react-native$": require.resolve("react-native-web"),
    // expo/vector-iconsはreact-native-vector-iconsに変換する
    "@expo/vector-icons": path.resolve(
      __dirname,
      "../node_modules/react-native-vector-icons"
    ),
    // import してエラーになるパッケージはMockする
    "react-navigation$": path.resolve(__dirname, "nothing-mock.js"),
    expo$: path.resolve(__dirname, "nothing-mock.js"),
    "@expo/react-native-action-sheet$": path.resolve(
      __dirname,
      "nothing-mock.js"
    ),
    "react-native-image-zoom-viewer": path.resolve(
      __dirname,
      "nothing-mock.js"
    ),
    "sentry-expo": path.resolve(__dirname, "nothing-mock.js"),
    "expo-analytics-amplitude": path.resolve(__dirname, "nothing-mock.js"),
    "expo-constants": path.resolve(__dirname, "nothing-mock.js"),
    "expo-haptics": path.resolve(__dirname, "nothing-mock.js"),
    "expo-permissions": path.resolve(__dirname, "nothing-mock.js"),
    "expo-facebook": path.resolve(__dirname, "nothing-mock.js"),
    "react-native-modalize": path.resolve(__dirname, "nothing-mock.js"),
    "react-native-modal-datetime-picker": path.resolve(
      __dirname,
      "nothing-mock.js"
    )
  };

  // .ts, .tsx を含めるように追加
  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
