import { jsx as _jsx } from "react/jsx-runtime";
const classObjValue = {
    primary: "btn--primary",
    primaryTwo: "btn--primary-2",
    secondary: "btn--secondary",
    delete: "btn--delete",
    tertiary: "btn--tertiary",
};
const Button = ({ children, type, onClick = () => { }, isDisabled = false, }) => {
    return (_jsx("button", { disabled: isDisabled, onClick: onClick, className: classObjValue[type], children: children }));
};
export default Button;
