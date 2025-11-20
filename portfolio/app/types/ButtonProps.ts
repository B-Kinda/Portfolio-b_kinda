// -------------------- Types externes bouton --------------------
export interface ButtonProps {
	text?: string;
	activeText?: string;
	isActive?: boolean;
	onToggle?: (newState: boolean) => void;
	href?: string;
	className?: string;
}
