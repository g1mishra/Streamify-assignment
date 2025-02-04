import { render, screen } from "@testing-library/react";
import MetricsCard from "../MetricsCard";

describe("MetricsCard Component", () => {
  it("renders the card with title and value", () => {
    render(<MetricsCard title="Total Users" value="1,000" />);

    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("1,000")).toBeInTheDocument();
  });

  it("displays positive change indicator correctly", () => {
    render(<MetricsCard title="Revenue" value="$500K" change={2.5} />);

    const changeElement = screen.getByTestId("change-indicator");
    expect(changeElement).toBeInTheDocument();
    expect(changeElement).toHaveClass("text-green-500");
  });

  it("displays negative change indicator correctly", () => {
    render(<MetricsCard title="Active Users" value="750" change={-1.8} />);

    const changeElement = screen.getByTestId("change-indicator");
    expect(changeElement).toBeInTheDocument();
    expect(changeElement).toHaveClass("text-red-500");
  });

  it("renders without change indicator when change prop is not provided", () => {
    render(<MetricsCard title="Top Artist" value="Artist Name" />);

    expect(screen.queryByTestId("change-indicator")).not.toBeInTheDocument();
  });

  it("maintains consistent layout structure", () => {
    render(<MetricsCard title="Test Metric" value="Test Value" change={5} />);

    const card = screen.getByTestId("metrics-card");
    expect(card).toHaveClass("bg-white", "rounded-lg", "p-6");
  });
});
