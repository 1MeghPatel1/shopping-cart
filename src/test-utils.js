import { jsx as _jsx } from "react/jsx-runtime";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store";
const AllTheProviders = ({ children }) => {
    return _jsx(Provider, { store: store, children: children });
};
const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });
export * from "@testing-library/react";
export { customRender as render };
