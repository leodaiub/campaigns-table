import { create } from "zustand";
import { campaignsList } from "../campaignsData";
import { isAfter } from "date-fns";
import { ICampaign } from "../types";

interface CampaignsState {
  tableData: ICampaign[];
  search: string | undefined;
  dateRange: [Date, Date] | [undefined, undefined];
  updateSearch: (search: CampaignsState["search"]) => void;
  updateDateRange: (dateRange: CampaignsState["dateRange"]) => void;
  updateTableData: (tableData: CampaignsState["tableData"]) => void;
}

export const useStore = create<CampaignsState>()((set) => ({
  tableData: campaignsList.filter((data: ICampaign) =>
    isAfter(new Date(data.endDate), new Date(data.startDate))
  ),
  search: "",
  dateRange: [undefined, undefined],
  updateSearch: (search: CampaignsState["search"]) =>
    set(() => ({ search: search })),
  updateDateRange: (dateRange: CampaignsState["dateRange"]) =>
    set(() => ({ dateRange: dateRange })),
  updateTableData: (tableData: CampaignsState["tableData"]) =>
    set((state) => ({ tableData: [...state.tableData, ...tableData] })),
}));
