import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ButtonWithTimer from ".";

const THREE_SECONDS = 3;

describe("ButtonWithTimer Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    render(
      <ButtonWithTimer
        name="Resend Verification Email"
        initialTime={THREE_SECONDS}
        title="Request"
      />,
    );

    const button = screen.getByTitle("Request");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Resend Verification Email");
  });

  it("should render correctly when onClick function is clicked", async () => {
    const mockClickFunction = jest.fn();

    render(
      <ButtonWithTimer
        clickFuntion={(setIsloading) => {
          mockClickFunction();
          setIsloading(true);
        }}
        name="Resend Verification Email"
        initialTime={THREE_SECONDS}
        title="Request"
      />,
    );

    const button = screen.getByTitle("Request");

    await userEvent.click(button, {
      advanceTimers: jest.advanceTimersByTime,
    });

    expect(mockClickFunction).toHaveBeenCalled();

    expect(await screen.findByText(/00 : 03/i)).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(1000));

    expect(await screen.findByText(/00 : 02/i)).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(2000));

    expect(await screen.findByText(/00 : 00/i)).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(1000));

    expect(
      await screen.findByText("Resend Verification Email"),
    ).toBeInTheDocument();
  });

  it("should not invoked clickFunction if is loading", async () => {
    const mockClickFunction = jest.fn();

    render(
      <ButtonWithTimer
        clickFuntion={(setIsloading) => {
          mockClickFunction();
          setIsloading(true);
        }}
        name="Resend Verification Email"
        initialTime={THREE_SECONDS}
        title="Request"
      />,
    );

    const button = screen.getByRole("button");

    await userEvent.click(button, {
      advanceTimers: jest.advanceTimersByTime,
    });

    expect(mockClickFunction).not.toHaveBeenCalledTimes(2);
  });

  it("should render correctly when initial isLoading true", async () => {
    const mockClickFunction = jest.fn();

    render(
      <ButtonWithTimer
        clickFuntion={(setIsloading) => {
          mockClickFunction();
          setIsloading(true);
        }}
        name="Resend Verification Email"
        initialTime={THREE_SECONDS}
        title="Request"
        initialIsLoading
      />,
    );

    expect(await screen.findByText(/00 : 03/i)).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(1000));

    expect(await screen.findByText(/00 : 02/i)).toBeInTheDocument();
  });
});
