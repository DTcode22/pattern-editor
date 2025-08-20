'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { PatternConfig, PatternType } from '../lib/patterns/types';
import { patternRegistry } from '../lib/patterns/registry';

type State = {
  patternConfig: PatternConfig;
  zoom: number;
};

type Action =
  | { type: 'SET_PATTERN_TYPE'; payload: PatternType }
  | {
      type: 'UPDATE_PARAM';
      payload: { key: string; value: number };
    }
  | { type: 'RESET_PATTERN' }
  | { type: 'LOAD_CONFIG'; payload: { config: PatternConfig; zoom?: number } }
  | { type: 'SET_ZOOM'; payload: number };

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
        };
      } else {
        // type === 'spiral'
        return {
          ...state,
          patternConfig: {
            type: 'spiral',
            params: patternRegistry.spiral.defaultParams,
          },
          zoom: 1,
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
            params: {
              ...params,
              [action.payload.key]: action.payload.value,
            },
          },
        };
      } else {
        // type === 'spiral'
        return {
          ...state,
          patternConfig: {
            type: 'spiral',
            params: {
              ...params,
              [action.payload.key]: action.payload.value,
            },
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
        };
      } else {
        // type === 'spiral'
        return {
          ...state,
          patternConfig: {
            type: 'spiral',
            params: patternRegistry.spiral.defaultParams,
          },
        };
      }
    }
    case 'LOAD_CONFIG':
      return {
        patternConfig: action.payload.config,
        zoom: action.payload.zoom || 1,
      };
    case 'SET_ZOOM':
      return {
        ...state,
        zoom: action.payload,
      };
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
