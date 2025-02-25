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
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string);
        onImport(config.params, config.pattern);
      } catch (error) {
        console.error('Error importing configuration:', error);
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
