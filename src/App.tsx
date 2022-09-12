import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

import { Page } from './components';
import { theme } from './theme';

import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Page />
      </ThemeProvider>
    </Provider>
  )
}

export default App;
