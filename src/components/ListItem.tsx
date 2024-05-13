import React from 'react';

interface ListItemProps {
	label: string;
	value: string;
	icon: React.ElementType;
}

const ListItem: React.FC<ListItemProps> = ({ label, value, icon: Icon }) => (
	<li aria-label={`${label} - ${value}`} style={{ display: 'flex', alignItems: 'center' }}>
		<Icon />
		{label}: {value}
	</li>
);

export default ListItem;
