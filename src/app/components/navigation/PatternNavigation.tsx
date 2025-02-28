'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PatternType } from '../../lib/patterns/types';

interface PatternNavigationProps {
  selectedPattern: PatternType;
  onSelectPattern: (pattern: PatternType) => void;
}

const PatternNavigation: React.FC<PatternNavigationProps> = ({
  selectedPattern,
  onSelectPattern,
}) => {
  return (
    <div className="h-full bg-[url('/asdf.jpg')] bg-bottom bg-cover">
      <ScrollArea className="h-full p-4">
        <h2 className="text-lg font-bold mb-4 text-white">Patterns</h2>
        <div className="space-y-2">
          <Button
            className="w-full justify-start"
            onClick={() => onSelectPattern('vortex')}
          >
            Vortex
          </Button>
          <Button
            className="w-full justify-start"
            onClick={() => onSelectPattern('spiral')}
          >
            Spiral
          </Button>
          {/* Add more pattern buttons here as needed */}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PatternNavigation;
