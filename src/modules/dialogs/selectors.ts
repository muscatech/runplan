import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

export const useActiveDialog = () => useSelector((state: RootState) => state.dialogs.currentDialog);
