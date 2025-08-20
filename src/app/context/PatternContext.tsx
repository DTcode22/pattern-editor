'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import {
  PatternConfig,
  PatternType,
  AllPatternParamKeys,
  AudioMappingConfig,
} from '../lib/patterns/types';
import { patternRegistry } from '../lib/patterns/registry';

type State = {
  patternConfig: PatternConfig;
  zoom: number;
  mappings: Partial<Record<AllPatternParamKeys, AudioMappingConfig>>;
};

type Action =
  | { type: 'SET_PATTERN_TYPE'; payload: PatternType }
  | {
      type: 'UPDATE_PARAM';
      payload: { key: string; value: number };
    }
  | { type: 'RESET_PATTERN' }
  | { type: 'LOAD_CONFIG'; payload: { config: PatternConfig; zoom?: number } }
  | { type: 'SET_ZOOM'; payload: number }
  | {
      type: 'SET_MAPPING';
      payload: {
        param: AllPatternParamKeys;
        config: AudioMappingConfig | null;
      };
    }
  | {
      type: 'UPDATE_MAPPING_CONFIG';
      payload: {
        param: AllPatternParamKeys;
        config: Partial<AudioMappingConfig>;
      };
    }
  | {
      type: 'REPLACE_MAPPINGS';
      payload: Partial<Record<AllPatternParamKeys, AudioMappingConfig>>;
    };

const patternReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATTERN_TYPE': {
      const type = action.payload;
      if (type === 'vortex') {
        return {
          ...state,
          patternConfig: {
            type: 'vortex',
            params: patternRegistry.vortex.defaultParams,
          },
          zoom: 1,
          mappings: {},
        };
      } else {
        return {
          ...state,
          patternConfig: {
            type: 'spiral',
            params: patternRegistry.spiral.defaultParams,
          },
          zoom: 1,
          mappings: {},
        };
      }
    }
    case 'UPDATE_PARAM': {
      const { type, params } = state.patternConfig;
      if (type === 'vortex') {
        return {
          ...state,
          patternConfig: {
            type: 'vortex',
            params: { ...params, [action.payload.key]: action.payload.value },
          },
        };
      } else {
        return {
          ...state,
          patternConfig: {
            type: 'spiral',
            params: { ...params, [action.payload.key]: action.payload.value },
          },
        };
      }
    }
    case 'RESET_PATTERN': {
      const type = state.patternConfig.type;
      if (type === 'vortex') {
        return {
          ...state,
          patternConfig: {
            type: 'vortex',
            params: patternRegistry.vortex.defaultParams,
          },
          mappings: {},
        };
      } else {
        return {
          ...state,
          patternConfig: {
            type: 'spiral',
            params: patternRegistry.spiral.defaultParams,
          },
          mappings: {},
        };
      }
    }
    case 'LOAD_CONFIG':
      return {
        ...state,
        patternConfig: action.payload.config,
        zoom: action.payload.zoom || 1,
        mappings: {},
      };
    case 'SET_ZOOM':
      return { ...state, zoom: action.payload };
    case 'SET_MAPPING': {
      const newMappings = { ...state.mappings };
      if (action.payload.config === null) {
        delete newMappings[action.payload.param];
      } else {
        newMappings[action.payload.param] = action.payload.config;
      }
      return { ...state, mappings: newMappings };
    }
    case 'UPDATE_MAPPING_CONFIG': {
      const { param, config } = action.payload;
      const existingConfig = state.mappings[param];
      if (!existingConfig) return state;

      return {
        ...state,
        mappings: {
          ...state.mappings,
          [param]: { ...existingConfig, ...config },
        },
      };
    }
    case 'REPLACE_MAPPINGS':
      return { ...state, mappings: action.payload };
    default:
      return state;
  }
};

const initialState: State = {
  patternConfig: {
    type: 'spiral',
    params: patternRegistry.spiral.defaultParams,
  },
  zoom: 1,
  mappings: {},
};

const PatternStateContext = createContext<State | undefined>(undefined);
const PatternDispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);

export const PatternProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(patternReducer, initialState);

  return (
    <PatternStateContext.Provider value={state}>
      <PatternDispatchContext.Provider value={dispatch}>
        {children}
      </PatternDispatchContext.Provider>
    </PatternStateContext.Provider>
  );
};

export const usePatternState = () => {
  const context = useContext(PatternStateContext);
  if (context === undefined) {
    throw new Error('usePatternState must be used within a PatternProvider');
  }
  return context;
};

export const usePatternDispatch = () => {
  const context = useContext(PatternDispatchContext);
  if (context === undefined) {
    throw new Error('usePatternDispatch must be used within a PatternProvider');
  }
  return context;
};
