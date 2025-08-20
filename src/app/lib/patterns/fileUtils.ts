// src/app/lib/patterns/fileUtils.ts
import { PatternConfig, PatternConfigFile } from './types';

export const savePatternConfig = (patternConfig: PatternConfig): void => {
  const fileContent: PatternConfigFile = {
    pattern: patternConfig.type,
    params: patternConfig.params,
    timestamp: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(fileContent, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pattern-config-${
    patternConfig.type
  }-${new Date().getTime()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const loadPatternConfig = (
  file: File
): Promise<{ config: PatternConfig }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target?.result as string);
        if (content.pattern && content.params) {
          const config: PatternConfig = {
            type: content.pattern,
            params: content.params,
          };
          resolve({ config });
        } else {
          reject(new Error('Invalid config file structure.'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};
