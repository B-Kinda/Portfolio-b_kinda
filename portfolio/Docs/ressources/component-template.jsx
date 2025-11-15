import PropTypes from "prop-types";
import React from "react";
import "./ComponentName.module.css";

/**
 * Description du composant
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.title - Le titre du composant
 * @param {React.ReactNode} props.children - Le contenu enfant
 * @param {function} props.onClick - Gestionnaire d'événement de clic
 * @returns {JSX.Element} Le composant rendu
 */
const ComponentName = ({ title, children, onClick }) => {
	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onClick(e);
		}
	};

	return (
		<button
			className="component-container"
			onClick={onClick}
			onKeyDown={handleKeyDown}
			type="button"
		>
			<h2>{title}</h2>
			<div className="content">{children}</div>
		</button>
	);
};

ComponentName.propTypes = {
	/** Le titre du composant */
	title: PropTypes.string.isRequired,

	/** Le contenu enfant */
	children: PropTypes.node,

	/** Gestionnaire d'événement de clic */
	onClick: PropTypes.func,
};

ComponentName.defaultProps = {
	children: null,
	onClick: () => {},
};

export default ComponentName;
