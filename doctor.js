// scripts
// "shark:es6to5": "babel ./node_modules/@ctrip/bbk-car-translation-key --out-dir dist",
// "shark:detect": "node ./scripts/SharkDoctor.js",
// "shark:doctor": "npm run shark:es6to5 && npm run shark:detect",

// devDependecies
// "@babel/core": "^7.11.1",
//     "@babel/preset-env": "^7.11.0",
//     "@babel/register": "^7.10.5",
//     "babel-cli": "^6.26.0",
//     "babel-plugin-transform-runtime": "^6.23.0",
//     "babel-preset-es2015": "^6.24.1",
//     "babel-preset-stage-2": "^6.24.1"

// .babelrc
// {
//   "presets": [
//       "es2015",
//       "stage-2"
//   ],
//   "plugins": ["transform-runtime"]
// }
// https://www.jianshu.com/p/8a8f7b0f887a
const fs = require('fs');
const path = require('path');
const sharks = require('../dist/dist/index');
// import fs from 'fs';
// import path from 'path';
// import sharks from '@ctrip/bbk-car-translation-key';

const sharkMap = new Map();
const reg = /getSharkValue\(\'(\S*)\'/g;

// 检测没有使用到的shark key
function main() {
  recursion(path.resolve(__dirname, '../src'), detectSharkKey);
  const source = doctor(sharks, sharkMap);
  generatorResponse(source);
  console.log('未使用key请查看\'../dist/unusedkey.json\'')
}

const doctor = (source, usedKeys) => {
  usedKeys.forEach((value, key) => {
    if (source.default[key]) {
      delete source.default[key]
    }
  });
  return source;
}

const generatorResponse = (source) => fs.writeFileSync(path.resolve(__dirname, '../dist/unusedkey.json'), JSON.stringify(source.default));

const detectSharkKey = (file) => {
  const usedKeys = getSharks(readFile(file));
  usedKeys.map(key => {
    sharkMap.set(key, sharkMap.has(key) ? sharkMap.get(key) + 1 : 1);
  });
}

const getSharks = content => {
  const matchs = content.match(reg) || [];
  return matchs.length === 0 ? matchs : matchs.map(m => m.replace('getSharkValue(\'', '').replace('\'', ''));
}

const readFile = dir => (fs.readFileSync(dir)).toString();

function recursion(dirs, cb) {
  (fs.readdirSync(dirs) || []).map(file => {
    const absPath = path.resolve(dirs, file);
    const stat = fs.statSync(absPath);
    if (stat.isFile()) {
      cb(absPath);
    } else if (stat.isDirectory()) {
      recursion(absPath, cb);
    }
  });
}

main();
