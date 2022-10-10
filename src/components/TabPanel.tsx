import { Box } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      aria-labelledby={`simple-tab-${index}`}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      style={{ minHeight: 0, flexGrow: 1, overflowY: 'auto' }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          { children }
        </Box>
      )}
    </div>
  );
}
