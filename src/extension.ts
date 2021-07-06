/* eslint-disable no-restricted-syntax */
import * as vscode from 'vscode';
import { completitionProviderFactory } from './completition-provider-factory';
import { handleCssConfigFiles, handleJsonConfigFiles } from './hande-config-files';

const ExtensionConfig = {
  mainKey: 'cssEnvVarsAutocomplete',
  varFilesKey: 'varFiles',
  envFilesKey: 'envFiles',
  languageModeKey: 'languageModes',
};

export function activate(context: vscode.ExtensionContext) {
  const varBareItems: vscode.CompletionItem[] = [];
  const envBareItems: vscode.CompletionItem[] = [];
  const workspaceFolder = vscode.workspace.workspaceFolders ?? [];
  const folderPath = workspaceFolder[0]?.uri.fsPath;

  if (!vscode.workspace.workspaceFolders) {
    return;
  }

  const config = vscode.workspace.getConfiguration(ExtensionConfig.mainKey);
  const hasVarFilesConfig = config?.has(ExtensionConfig.varFilesKey);
  const hasEnvFilesConfig = config?.has(ExtensionConfig.envFilesKey);
  const hasAtLeastOneConfig = hasVarFilesConfig || hasEnvFilesConfig;

  // no config or specified files
  if (!config || !hasAtLeastOneConfig) {
    return;
  }

  const varConfigFiles = (config.get<string[]>(ExtensionConfig.varFilesKey) ?? []);
  const envConfigFiles = (config.get<string[]>(ExtensionConfig.envFilesKey) ?? []);
  const envConfigFilesCss = envConfigFiles.filter(item => item.endsWith('.css'));
  const envConfigFilesJson = envConfigFiles.filter(item => item.endsWith('.json'));
  const configLanguageMods = (config.get<string[]>(ExtensionConfig.languageModeKey) ?? []);
  const checkedLanguages = configLanguageMods.length ? configLanguageMods : ['css', 'postcss'];

  varBareItems.push(...handleCssConfigFiles(varConfigFiles, folderPath));
  envBareItems.push(...handleCssConfigFiles(envConfigFilesCss, folderPath));
  envBareItems.push(...handleJsonConfigFiles(envConfigFilesJson, folderPath));

  const varCompletionProvider = vscode.languages.registerCompletionItemProvider(
    checkedLanguages,
    {
      provideCompletionItems: completitionProviderFactory(varBareItems, /var\(--([\w-]*)/),
    },
    'var(--',
  );

  const envCompletitionProvider = vscode.languages.registerCompletionItemProvider(
    checkedLanguages,
    {
      provideCompletionItems: completitionProviderFactory(envBareItems, /env\(--([\w-]*)/),
    },
    'env(--',
  );

  context.subscriptions.push(varCompletionProvider, envCompletitionProvider);
}
