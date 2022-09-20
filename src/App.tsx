import { ThemeProvider } from '@mui/material/styles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Page } from './components';
import { theme } from './theme';

import { store, persistor } from './store';
import { NewPlanDialog } from './modules/plan';
import { NewItemTypeDialog } from './modules/itemTypes/components';
import { ChoosePlanDialog } from './modules/plan/components/ChoosePlanDialog';

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <ThemeProvider theme={theme}>
          <DndProvider backend={HTML5Backend}>
            <Page />
          </DndProvider>
          <NewItemTypeDialog />
          <NewPlanDialog />
          <ChoosePlanDialog />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
