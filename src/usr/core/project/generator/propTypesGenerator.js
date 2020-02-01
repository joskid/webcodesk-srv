/*
 *    Copyright 2019 Alex (Oleksandr) Pustovalov
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import * as constants from '../../../../commons/constants';

const propertyTypeMap = {
  [constants.COMPONENT_PROPERTY_STRING_TYPE]: (propertyNode) => {
    const { props: {propertyName, isRequired} } = propertyNode;
    return {
      typeInComment: `\`{string, required: ${!!isRequired}}\``,
      sampleCode: `${propertyName}: "text"`,
      singleSampleCode: '"text"',
    };
  },
  [constants.COMPONENT_PROPERTY_OBJECT_TYPE]: (propertyNode) => {
    const { props: {propertyName ,isRequired} } = propertyNode;
    return {
      typeInComment: `\`{Object, required: ${!!isRequired}}\``,
      sampleCode: `${propertyName}: {}`,
      singleSampleCode: '{}',
    };
  },
  [constants.COMPONENT_PROPERTY_ONE_OF_TYPE]: (propertyNode) => {
    const { props: {propertyName, propertyValueVariants, isRequired} } = propertyNode;
    let variantValue;
    let variantsString = '';
    if (propertyValueVariants && propertyValueVariants.length > 0) {
      variantValue = propertyValueVariants[0].value;
      propertyValueVariants.forEach(propertyValueVariantItem => {
        variantsString += `${propertyValueVariantItem.value}, `;
      });
      if (variantsString.length > 4) {
        variantsString = variantsString.substring(0, variantsString.length - 2);
      }
    } else {
      variantsString = '"text"';
    }
    return {
      typeInComment: `\`{string, required: ${!!isRequired}}\``,
      sampleCode: `${propertyName}: "${variantValue}"`,
      singleSampleCode: `"${variantValue}"`,
    };
  },
  [constants.COMPONENT_PROPERTY_SYMBOL_TYPE]: (propertyNode) => {
    const { props: {propertyName, isRequired} } = propertyNode;
    return {
      typeInComment: `\`{string, required: ${!!isRequired}}\``,
      sampleCode: `${propertyName}: "text"`,
      singleSampleCode: '"text"',
    };
  },
  [constants.COMPONENT_PROPERTY_BOOL_TYPE]: (propertyNode) => {
    const { props: {propertyName, isRequired} } = propertyNode;
    return {
      typeInComment: `\`{boolean, required: ${!!isRequired}}\``,
      sampleCode: `${propertyName}: true`,
      singleSampleCode: 'true',
    };
  },
  [constants.COMPONENT_PROPERTY_ANY_TYPE]: (propertyNode) => {
    const { props: {propertyName, isRequired} } = propertyNode;
    return {
      typeInComment: `\`{any, required: ${!!isRequired}}\``,
      sampleCode: `${propertyName}: {}`,
      singleSampleCode: '{}',
    };
  },
  [constants.COMPONENT_PROPERTY_ARRAY_TYPE]: (propertyNode) => {
    const { props: {propertyName, isRequired} } = propertyNode;
    return {
      typeInComment: `\`{array, required: ${!!isRequired}}\``,
      sampleCode: `${propertyName}: []`,
      singleSampleCode: '[]',
    };
  },
  [constants.COMPONENT_PROPERTY_NUMBER_TYPE]: (propertyNode) => {
    const { props: {propertyName, isRequired} } = propertyNode;
    return {
      typeInComment: `\`{number, required: ${!!isRequired}}\``,
      sampleCode: `${propertyName}: 25`,
      singleSampleCode: '25',
    };
  },
  [constants.COMPONENT_PROPERTY_ELEMENT_TYPE]: (propertyNode) => {
    const { props: {propertyName, isRequired} } = propertyNode;
    return {
      typeInComment: `\`{Component, required: ${!!isRequired}}\``,
      sampleCode: `${propertyName}: <Component />`,
      singleSampleCode: '<Component />',
    };
  },
  [constants.COMPONENT_PROPERTY_NODE_TYPE]: (propertyNode) => {
    const { props: {propertyName, isRequired} } = propertyNode;
    return {
      typeInComment: `\`{Component, required: ${!!isRequired}}\``,
      sampleCode: `${propertyName}: <Component />`,
      singleSampleCode: '<Component />',
    };
  },
};

function createSampleObjectNextLine (node, variableName, level = 0) {
  let result = [];
  if (node) {
    const { type, props, children } = node;
    let propertyName;
    if (props) {
      propertyName = props.propertyName;
    }
    if (type === constants.COMPONENT_PROPERTY_SHAPE_TYPE) {
      if (propertyName) {
        if (level > 0) {
          result.push(
            `${propertyName}: {`
          );
        } else {
          result.push(`const ${variableName} = {`);
        }
        if (children && children.length > 0) {
          result = children.reduce(
            (acc, child) => acc.concat(createSampleObjectNextLine(child, variableName, level + 1)),
            result
          );
        }
        result.push(
          `}${level > 0 ? ',' : ';'}`
        );
      } else {
        if (level > 0) {
          result.push(
            '{'
          );
        } else {
          result.push(`const ${variableName} = {`);
        }
        if (children && children.length > 0) {
          result = children.reduce(
            (acc, child) => acc.concat(createSampleObjectNextLine(child, variableName, level + 1)),
            result
          );
        }
        result.push(
          `}${level > 0 ? ',' : ';'}`
        );
      }
    } else if (type === constants.COMPONENT_PROPERTY_ARRAY_OF_TYPE) {
      if (propertyName) {
        if (level > 0) {
          result.push(
            `${propertyName}: [`
          );
        } else {
          result.push(`const ${variableName} = [`);
        }
        if (children && children.length > 0) {
          result = children.reduce(
            (acc, child) => acc.concat(createSampleObjectNextLine(child, variableName, level + 1)),
            result
          );
        }
        result.push(
          `]${level > 0 ? ',' : ';'}`
        );
      } else {
        if (level > 0) {
          result.push(
            '['
          );
        } else {
          result.push(`const ${variableName} = [`);
        }
        if (children && children.length > 0) {
          result = children.reduce(
            (acc, child) => acc.concat(createSampleObjectNextLine(child, variableName, level + 1)),
            result
          );
        }
        result.push(
          `]${level > 0 ? ',' : ';'}`
        );
      }
    } else if (type === constants.COMPONENT_PROPERTY_FUNCTION_TYPE) {
      if (level === 0) {
        if (children && children.length > 0) {
          result.push(`const ${variableName} = {`);
          result = children.reduce(
            (acc, child) => acc.concat(createSampleObjectNextLine(child, variableName, level + 1)),
            result
          );
          result.push(
            `}${level > 0 ? ',' : ';'}`
          );
        } else {
          result.push(`const ${variableName} = undefined;`);
        }
      }
    } else if (type === constants.COMPONENT_PROPERTY_STRING_TYPE
      || type === constants.COMPONENT_PROPERTY_OBJECT_TYPE
      || type === constants.COMPONENT_PROPERTY_ONE_OF_TYPE
      || type === constants.COMPONENT_PROPERTY_SYMBOL_TYPE
      || type === constants.COMPONENT_PROPERTY_BOOL_TYPE
      || type === constants.COMPONENT_PROPERTY_ANY_TYPE
      || type === constants.COMPONENT_PROPERTY_ARRAY_TYPE
      || type === constants.COMPONENT_PROPERTY_NUMBER_TYPE) {
      const commentValues = propertyTypeMap[type](node);
      if (propertyName) {
        if (level > 0) {
          result.push(
            `${commentValues.sampleCode},`
          );
        } else {
          result.push(`const ${variableName} = ${commentValues.singleSampleCode};`);
        }
      }
    }
  }
  return result;
}

function createInputDescriptionNextLine (node, level = 0) {
  let result = [];
  if (node) {
    const { type, props, children } = node;
    let propertyName;
    let propertyComment = '';
    let isRequired;
    if (props) {
      propertyName = props.propertyName;
      propertyComment = props.propertyComment ? props.propertyComment.trim().replace('\n', ' ') : '';
      isRequired = props.isRequired;
    }
    const starterSpace = Array(level).fill('   ').join('');
    if (type === constants.COMPONENT_PROPERTY_SHAPE_TYPE) {
      if (propertyName) {
        result.push(`${starterSpace}* __${propertyName}__ - \`{Object, required: ${!!isRequired}}\` ${propertyComment}`);
        if (children && children.length > 0) {
          result = children.reduce(
            (acc, child) => acc.concat(createInputDescriptionNextLine(child, level + 1)),
            result
          );
        }
      } else {
        result.push(`${starterSpace}* __array item__ - \`{Object, required: ${!!isRequired}}\` ${propertyComment}`);
        if (children && children.length > 0) {
          result = children.reduce(
            (acc, child) => acc.concat(createInputDescriptionNextLine(child, level + 1)),
            result
          );
        }
      }
    } else if (type === constants.COMPONENT_PROPERTY_ARRAY_OF_TYPE) {
      if (propertyName) {
        result.push(`${starterSpace}* __${propertyName}__ - \`{Array, required: ${!!isRequired}}\` ${propertyComment}`);
        if (children && children.length > 0) {
          result = children.reduce(
            (acc, child) => acc.concat(createInputDescriptionNextLine(child, level + 1)),
            result
          );
        }
      } else {
        result.push(`${starterSpace}* __arrayItem__ - \`{Array, required: ${!!isRequired}}\` ${propertyComment}`);
        if (children && children.length > 0) {
          result = children.reduce(
            (acc, child) => acc.concat(createInputDescriptionNextLine(child, level + 1)),
            result
          );
        }
      }
    }
    // else if (type === constants.COMPONENT_PROPERTY_FUNCTION_TYPE) {
    //   result.push(`${starterSpace}* __${propertyName}__ - {Function} ${propertyComment}`);
    //   result = children.reduce(
    //     (acc, child) => acc.concat(createInputDescriptionNextLine(child, level + 1)),
    //     result
    //   );
    // }
    else if (type === constants.COMPONENT_PROPERTY_STRING_TYPE
      || type === constants.COMPONENT_PROPERTY_OBJECT_TYPE
      || type === constants.COMPONENT_PROPERTY_ONE_OF_TYPE
      || type === constants.COMPONENT_PROPERTY_SYMBOL_TYPE
      || type === constants.COMPONENT_PROPERTY_BOOL_TYPE
      || type === constants.COMPONENT_PROPERTY_ANY_TYPE
      || type === constants.COMPONENT_PROPERTY_ARRAY_TYPE
      || type === constants.COMPONENT_PROPERTY_NUMBER_TYPE
      || type === constants.COMPONENT_PROPERTY_NODE_TYPE
      || type === constants.COMPONENT_PROPERTY_ELEMENT_TYPE) {
      const typeDescriptionObject = propertyTypeMap[type](node);
      let typeString;
      if (typeDescriptionObject) {
        typeString = typeDescriptionObject.typeInComment;
      }
      if (propertyName) {
        result.push(`${starterSpace}* __${propertyName}__ - ${typeString} ${propertyComment}`);
      } else {
        result.push(`${starterSpace}* __array item__ - ${typeString} ${propertyComment}`);
      }
    }
  }
  return result;
}

function createOutputDescriptionNextLine (node) {
  let result = [];
  if (node) {
    const { type, props } = node;
    let propertyName;
    let propertyComment = '';
    if (props) {
      propertyName = props.propertyName;
      propertyComment = props.propertyComment ? props.propertyComment.trim().replace('\n', ' ') : '';
    }
    if (type === constants.COMPONENT_PROPERTY_FUNCTION_TYPE) {
      result.push(`   * __${propertyName}__ - \`{Function}\` ${propertyComment}`);
    }
  }
  return result;
}

export function generateSampleObjectScript(node, variableName) {
  return createSampleObjectNextLine(node, variableName).join('\n');
}

export function generateComponentMarkDownSpecification(properties, componentComment) {
  let inputs = [];
  let outputs = [];
  if (properties && properties.length > 0) {
    properties.forEach(property => {
      inputs = inputs.concat(createInputDescriptionNextLine(property));
    });
  }
  if (properties && properties.length > 0) {
    properties.forEach(property => {
      outputs = outputs.concat(createOutputDescriptionNextLine(property));
    });
  }
  let resultMarkdownText = '## Specification\n\n';
  resultMarkdownText += componentComment ? `${componentComment}\n\n` : '';
  if (inputs.length > 0) {
    let inputText = inputs.join('\n');
    resultMarkdownText += `*Inputs*\n\n${inputText}\n\n`;
  }
  if (outputs.length > 0) {
    let outputText = outputs.join('\n');
    resultMarkdownText += `*Outputs*\n\n${outputText}\n\n`;
  }
  return resultMarkdownText;
}

export function generateFunctionsMarkDownSpecification(functions) {
  let resultMarkdownText = '## Specification\n\n';
  if (functions && functions.length > 0) {
    functions.forEach(functionModel => {
      const { props: { functionComment, displayName, dispatches } } = functionModel;
      resultMarkdownText += `### Function \`${displayName}\`\n`;
      if (functionComment) {
        resultMarkdownText += `${functionComment}\n\n`;
      }
      let outputs = [];
      if (dispatches && dispatches.length > 0) {
        dispatches.forEach(dispatch => {
          const { name, wcdAnnotations } = dispatch;
          let validComment = '';
          if (wcdAnnotations) {
            const wcdAnnotationComment = wcdAnnotations[constants.ANNOTATION_COMMENT];
            if (wcdAnnotationComment) {
              validComment = wcdAnnotationComment.trim().replace('\n', '');
            }
          }
          if (name === constants.FUNCTION_OUTPUT_ERROR_NAME) {
            outputs.push(`   * __${name}__ - ${validComment}`);
          } else {
            outputs.push(`   * __${name}__ - ${validComment}`);
          }
        });
      }
      if (outputs.length > 0) {
        let outputText = outputs.join('\n');
        resultMarkdownText += `*Output*\n\n${outputText}\n\n`;
      }
    });
  }
  return resultMarkdownText;
}
