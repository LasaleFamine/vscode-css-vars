const languages = {
  createDiagnosticCollection: jest.fn(),
};

const StatusBarAlignment = {};
// @ts-expect-error
const window = {
  createStatusBarItem: jest.fn(() => ({
    show: jest.fn(),
  })),
  showErrorMessage: jest.fn(),
  showWarningMessage: jest.fn(),
  createTextEditorDecorationType: jest.fn(),
};

const workspace = {
  getConfiguration: jest.fn(),
  workspaceFolders: [],
  onDidSaveTextDocument: jest.fn(),
};

const OverviewRulerLane = {
  Left: null,
};

const Uri = {
  file: (f: any) => f,
  parse: jest.fn(),
};
// @ts-expect-error
const Range = jest.fn();
const Diagnostic = jest.fn();
const DiagnosticSeverity = {
  Error: 0, Warning: 1, Information: 2, Hint: 3,
};

const debug = {
  onDidTerminateDebugSession: jest.fn(),
  startDebugging: jest.fn(),
};

const commands = {
  executeCommand: jest.fn(),
};

const CompletionItemKindEnum = {
  Text: 0,
  Method: 1,
  Function: 2,
  Constructor: 3,
  Field: 4,
  Variable: 5,
  Class: 6,
  Interface: 7,
  Module: 8,
  Property: 9,
  Unit: 10,
  Value: 11,
  Enum: 12,
  Keyword: 13,
  Snippet: 14,
  Color: 15,
  Reference: 17,
  File: 16,
  Folder: 18,
  EnumMember: 19,
  Constant: 20,
  Struct: 21,
  Event: 22,
  Operator: 23,
  TypeParameter: 24,
  User: 25,
  Issue: 26,
};

const vscode = {
  languages,
  StatusBarAlignment,
  window,
  workspace,
  OverviewRulerLane,
  Uri,
  Range,
  Diagnostic,
  DiagnosticSeverity,
  debug,
  commands,
  CompletionItemKind: jest.fn().mockImplementation(() => CompletionItemKindEnum),
  CompletionItem: jest.fn().mockImplementation(() => ({ detail: '', insertText: '' })),
};

module.exports = vscode;
