import { ReactNode } from "react";

type classObj = {
	primary: "btn--primary";
	primaryTwo: "btn--primary-2";
	secondary: "btn--secondary";
	delete: "btn--delete";
	tertiary: "btn--tertiary";
};
type propsType = {
	children: ReactNode;
	onClick(): void;
	type: keyof classObj;
};

const classObjValue: classObj = {
	primary: "btn--primary",
	primaryTwo: "btn--primary-2",
	secondary: "btn--secondary",
	delete: "btn--delete",
	tertiary: "btn--tertiary",
};

const Button = ({ children, type, onClick = () => {} }: propsType) => {
	return (
		<button onClick={onClick} className={classObjValue[type]}>
			{children}
		</button>
	);
};

export default Button;
