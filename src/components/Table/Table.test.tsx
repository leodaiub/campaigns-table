import { render, screen } from "@testing-library/react";
import AppTable from "./";
import { campaignsList, columns } from "../../data/campaignsData";
import { isAfter } from "date-fns";
import { ICampaign } from "../../types";

describe("AppTable", () => {
  it("renders the table with campaign data", () => {
    render(<AppTable columns={columns} />);

    const campaignsListFiltered = campaignsList.filter((data: ICampaign) =>
      isAfter(new Date(data.endDate), new Date(data.startDate))
    );

    for (const campaign of campaignsListFiltered) {
      expect(screen.getByText(campaign.name)).toBeInTheDocument();
    }
  });
});
