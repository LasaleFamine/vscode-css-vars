/* eslint-disable no-restricted-syntax */
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as css from 'css';
import * as flat from 'flat';
import type { Rule, Declaration } from 'css';
import { CompletionItem } from 'vscode';

export const handleCssConfigFiles = (files: string[], folderPath: string) => {
  const items = [];

  for (const filePath of files) {
    const file = fs.readFileSync(path.join(folderPath, filePath), { encoding: 'utf8' });
    const cssParsed = css.parse(file);
    const rootRule: Rule | undefined = cssParsed.stylesheet?.rules.find((rule: Rule) => {
      const isRuleType = rule.type === 'rule';
      const hasRootSelector = rule?.selectors?.includes(':root');

      return Boolean(isRuleType && hasRootSelector);
    });

    const declarations = rootRule?.declarations;
    const variables = declarations?.filter((declaration: Declaration) => Boolean(
      declaration.type === 'declaration' && declaration?.property?.startsWith('--'),
    )) as Declaration[];

    if (!variables) {
      return [];
    }

    const sortedVariables = variables.sort((a, b) => {
      const aName = a.property?.toLowerCase() ?? '';
      const bName = b.property?.toLowerCase() ?? '';
      return aName.localeCompare(bName);
    });

    for (const variable of sortedVariables) {
      // For use when the user has already typed `var(--`
      const completionItemBare = new CompletionItem(variable.property ?? '', vscode.CompletionItemKind.Variable);
      completionItemBare.detail = variable.value;
      completionItemBare.insertText = variable.property?.replace(/^--/g, '');
      items.push(completionItemBare);
    }
  }

  return items;
};

export const handleJsonConfigFiles = (files: string[], folderPath: string) => {
  const items = [];

  for (const filePath of files) {
    const file = fs.readFileSync(path.join(folderPath, filePath), { encoding: 'utf8' });
    const jsonParsed = JSON.parse(file);
    const variables = Object.keys(flat(jsonParsed, { delimiter: '-' }));

    const sortedVariables = variables.sort((a, b) => {
      const aName = a?.toLowerCase() ?? '';
      const bName = b?.toLowerCase() ?? '';
      return aName.localeCompare(bName);
    });

    for (const variable of sortedVariables) {
      // For use when the user has already typed `env(--`
      const completionItemBare = new CompletionItem(variable, vscode.CompletionItemKind.Variable);
      completionItemBare.detail = variables[variable];
      completionItemBare.insertText = variable.replace(/^--/g, '');
      items.push(completionItemBare);
    }
  }

  return items;
};
