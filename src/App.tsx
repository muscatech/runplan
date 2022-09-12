import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import { Page } from './components';
import { Theme } from './theme';

import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <Page />
      </ThemeProvider>
    </Provider>
  )
}

export default App;
