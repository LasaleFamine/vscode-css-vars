import * as path from 'path';
import { handleCssConfigFiles, handleJsonConfigFiles } from '../hande-config-files';

describe('Handle config files var and env', () => {
  it('should correctly handle files array with var css files', () => {
    const result = handleCssConfigFiles(['vars.css'], path.resolve(__dirname, './fixtures'));
    expect(result).toHaveLength(1);
    expect(result[0].insertText).toEqual('some-var');
  });

  it('should correctly handle files array with env json files', () => {
    const result = handleJsonConfigFiles(['env.json'], path.resolve(__dirname, './fixtures'));
    expect(result).toHaveLength(1);
    expect(result[0].insertText).toEqual('some-nice-var');
  });
});
