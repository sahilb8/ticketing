// this due to nextjs sometimes will not detect the changes that you do
// so this will tell to pull all the files from the folder every 300 milliseconds.
module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 300;
    return config;
  }
};