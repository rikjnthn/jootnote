import "@testing-library/jest-dom";

jest.mock("pocketbase", () => {
  return {
    __esModule: true,
    default: jest.fn(),
    ClientResponseError: jest.fn(),
  };
});
