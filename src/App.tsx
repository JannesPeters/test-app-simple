import ConceptA from './components/ConceptA';
import ConceptB from './components/ConceptB';

// Switch between UI concepts based on environment variable or URL parameter
const urlParams = new URLSearchParams(window.location.search);
const UI_VARIANT = urlParams.get('variant') || import.meta.env.VITE_UI_VARIANT || 'concept-a';

export default function App() {
  if (UI_VARIANT === 'concept-b') {
    return <ConceptB />;
  }
  
  return <ConceptA />;
}
