const models = require('./models');

const load = db => {
  const compiledModels = {};

  for (let name in models) {
    compiledModels[name] = db.model(name);
  }

  console.log('[MongoDB] Extensions and models compiled');
  return compiledModels;
};

module.exports = load;
