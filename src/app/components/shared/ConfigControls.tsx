'use client';

import { Button } from '@/components/ui/button';
import { Save, Download } from 'lucide-react';
import { CombinedPatternParams, PatternType } from '../../lib/patterns/types';

interface ConfigControlsProps {
  params: CombinedPatternParams;
  patternType: PatternType;
  onImport: (params: CombinedPatternParams, patternType: PatternType) => void;
}

const ConfigControls: React.FC<ConfigControlsProps> = ({
  params,
  patternType,
  onImport,
}) => {
  // Function to export configuration as JSON
  const exportConfiguration = () => {
    const config = {
      params,
      pattern: patternType,
      timestamp: new Date().toISOString(),
    };

    // Add parameter animations for emergence pattern
    if (patternType === 'emergence') {
      // Import animations dynamically to avoid circular dependencies
      import('../../lib/patterns/defaultParams').then(
        ({ defaultEmergenceAnimations }) => {
          const configWithAnimations = {
            ...config,
            parameterAnimations: defaultEmergenceAnimations,
          };
          downloadConfig(configWithAnimations);
        }
      );
    } else {
      downloadConfig(config);
    }
  };

  // Helper function to download the configuration
  const downloadConfig = (config: any) => {
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pattern-config-${patternType}-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to handle configuration import
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const config = JSON.parse(event.target?.result as string);

        // Validate the imported configuration
        if (!config.params || !config.pattern) {
          alert('Invalid configuration file. Missing params or pattern.');
          return;
        }

        // Import the configuration
        onImport(config.params, config.pattern);

        // Handle parameter animations if they exist
        if (
          config.parameterAnimations &&
          config.parameterAnimations.length > 0
        ) {
          console.log(
            'Imported parameter animations:',
            config.parameterAnimations
          );

          // If it's an emergence pattern, we could store the animations in localStorage
          // for later use, or pass them to a global state manager
          if (config.pattern === 'emergence') {
            try {
              localStorage.setItem(
                'emergenceAnimations',
                JSON.stringify(config.parameterAnimations)
              );
              console.log('Stored emergence animations in localStorage');
            } catch (error) {
              console.error(
                'Failed to store animations in localStorage:',
                error
              );
            }
          }
        }
      } catch (error) {
        console.error('Error importing configuration:', error);
        alert('Error importing configuration. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex gap-2">
      {/* Export Config Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={exportConfiguration}
        title="Export Configuration"
      >
        <Save className="h-4 w-4" />
      </Button>

      {/* Import Config Button */}
      <div className="relative">
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Button variant="outline" size="sm" title="Import Configuration">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ConfigControls;
