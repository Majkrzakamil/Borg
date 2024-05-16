import React from 'react';
import styled from 'styled-components';

import Text from './Text';

interface ListItemProps {
  label: string;
  value: string;
  icon: React.ElementType;
  subLabel?: string;
}

const ListItemStyled = styled.li`
  display: flex;
  align-items: center;
  gap: 0.67rem;
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
`;

const ValueText = styled(Text)`
  margin-left: auto;
`;

const ValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  text-align: right;
`;

const ListItem: React.FC<ListItemProps> = ({ label, value, icon: Icon, subLabel }) => (
  <ListItemStyled aria-label={`${label} - ${value}`}>
    <IconWrapper>
      <Icon />
    </IconWrapper>
    <Text color="dark" fontSize="subtitle">
      {label}
    </Text>
    <ValueWrapper>
      <Text color="green" fontSize="subtitle" fontWeight="demiBold">
        {value}
      </Text>
      {subLabel &&
        <Text color="green" fontSize="medium">
          {subLabel}
        </Text>}
    </ValueWrapper>
  </ListItemStyled>
);

export default ListItem;
