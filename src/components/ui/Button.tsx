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
	onClick?(): void;
	type: keyof classObj;
	isDisabled: boolean;
};

const classObjValue: classObj = {
	primary: "btn--primary",
	primaryTwo: "btn--primary-2",
	secondary: "btn--secondary",
	delete: "btn--delete",
	tertiary: "btn--tertiary",
};

const Button = ({
	children,
	type,
	onClick = () => {},
	isDisabled = false,
}: propsType) => {
	return (
		<button
			disabled={isDisabled}
			onClick={onClick}
			className={classObjValue[type]}
		>
			{children}
		</button>
	);
};

export default Button;
