import * as vscode from 'vscode';
import { CompletionItem, CompletionList } from 'vscode';

export const completionProviderFactory = (
  items: CompletionItem[],
  regex: RegExp,
) => (
  document: vscode.TextDocument,
  position: vscode.Position,
) => {
  const firstCharOfLinePosition = new vscode.Position(position.line, 0);
  const beforeCursorText = document.getText(new vscode.Range(firstCharOfLinePosition, position))?.trim() || '';

  if (!(regex.exec(beforeCursorText))) {
    return null;
  }

  return new CompletionList(items);
};
