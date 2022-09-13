import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Page } from './components';
import { theme } from './theme';

import { store, persistor } from './store';
import { NewPlanDialog } from './modules/plan';
import { NewItemTypeDialog } from './modules/itemTypes/components';

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <ThemeProvider theme={theme}>
          <Page />
          <NewItemTypeDialog />
          <NewPlanDialog />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
