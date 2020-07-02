const fs = require('fs');
const acorn = require('acorn');
const walk = require('acorn-walk');
const compatdata = require('./data.json');

const fileContent = fs.readFileSync('./test.js');
try {
  const res = acorn.parse(fileContent);
  //   for (let token of acorn.tokenizer(fileContent)) {
  //     // iterate over the tokens
  //     console.log(token);
  //   }
  const expressionSet = new Set();
  walk.simple(res, {
    VariableDeclaration(node) {
      //   console.log(node);
    },
    Identifier(node) {
      // console.log(node);
    },
    MemberExpression(node) {
      //   console.log(node.property);
    },
    ArrowFunctionExpression(node) {
      //   console.log(node);
      expressionSet.add(node.type);
    },
  });
  //   console.log(expressionSet);
  generateCompatReport(expressionSet);
} catch (e) {
  console.log(e);
}

function generateCompatReport(dataSet) {
  dataSet.forEach((v) => {
    console.log(v);
  });
}

function parseCompatData() {
  const data = Object.entries(compatdata.data).map((v) => ({
    key: v[0],
    title: v[1].title,
    description: v[1].description,
    // categories: v[1].categories,
    // status: v[1].status,
    keywords: v[1].keywords,
  }));
  fs.writeFileSync('./compactDataSet.json', JSON.stringify(data, '', 2));
}

// parseCompatData();
