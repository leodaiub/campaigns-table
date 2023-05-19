/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@chakra-ui/react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";

export default function DateRangePicker() {
  const [dateRange, updateDateRange] = useStore(
    (state) => [state.dateRange, state.updateDateRange],
    shallow
  );

  return (
    <Box maxW={225}>
      <RangeDatepicker
        selectedDates={dateRange as any}
        onDateChange={updateDateRange as any}
        propsConfigs={{
          inputProps: {
            placeholder: "Select date range...",
          },
        }}
      />
    </Box>
  );
}
