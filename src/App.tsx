import { ThemeProvider } from 'styled-components';

import { Page } from './components';
import { Theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Page />
    </ThemeProvider>
  )
}

export default App;
