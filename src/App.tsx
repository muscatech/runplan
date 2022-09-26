import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Page } from './components';
import { theme } from './theme';

import { store, persistor } from './store';
import { NewPlanDialog } from './modules/plan';
import { ManageItemTypesDialog, NewItemTypeDialog } from './modules/itemTypes/components';
import { ChoosePlanDialog } from './modules/plan/components/ChoosePlanDialog';
import { WrongPrintMessage } from './components/WrongPrintMessage';
import { NewRoleDialog } from './modules/roles';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <ThemeProvider theme={theme}>
            <DndProvider backend={HTML5Backend}>
              <WrongPrintMessage />
              <Page />
            </DndProvider>
            <NewItemTypeDialog />
            <ManageItemTypesDialog />
            <NewPlanDialog />
            <ChoosePlanDialog />
            <NewRoleDialog />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </LocalizationProvider>
  );
}

export default App;
