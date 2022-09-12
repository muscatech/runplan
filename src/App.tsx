import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

import { Page } from './components';
import { theme } from './theme';

import { store } from './store';
import { NewPlanDialog } from './modules/plan';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Page />
        <NewPlanDialog />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
