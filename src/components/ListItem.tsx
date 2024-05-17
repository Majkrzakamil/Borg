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
  border-bottom: 0.0625rem solid #8f96a180;
  padding: 0.75rem 0;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
`;

const CopyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column-reverse;
    align-items: start;
  }
`;

const ValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    text-align: left;
  }
`;

const ListItem: React.FC<ListItemProps> = ({
  label,
  value,
  icon: Icon,
  subLabel,
}) => (
  <ListItemStyled aria-label={`${label} - ${value}`}>
    <IconWrapper>
      <Icon />
    </IconWrapper>
    <CopyWrapper>
      <Text color="dark" fontSize="subtitle">
        {label}
      </Text>
      <ValueWrapper>
        <Text color="green" fontSize="subtitle" fontWeight="demiBold">
          {value}
        </Text>
        {subLabel && (
          <Text color="green" fontSize="medium">
            {subLabel}
          </Text>
        )}
      </ValueWrapper>
    </CopyWrapper>
  </ListItemStyled>
);

export default ListItem;
