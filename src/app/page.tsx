// src/app/page.tsx
import { PatternProvider } from './context/PatternContext';
import PatternEditor from './components/PatternEditor';

export default function Page() {
  return (
    <PatternProvider>
      <PatternEditor />
    </PatternProvider>
  );
}
