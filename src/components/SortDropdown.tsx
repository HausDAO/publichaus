import {
  Label,
  Select,
  SelectProps,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';
import styled from 'styled-components';

// SENDTO UI LIBRARY

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  width: 32rem;
  margin-left: auto;
  label {
    display: block;
    width: 10rem;
  }
  @media ${widthQuery.sm} {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    label {
      margin-bottom: 1rem;
    }
  }
`;
type SortDropdownProps = SelectProps;

export const SortDropdown = ({
  id,
  label = 'Sort By',
  options,
  ...props
}: SortDropdownProps) => {
  const isMobile = useBreakpoint(widthQuery.sm);
  return (
    <SelectBox>
      <Label id="sort-select">{label}</Label>
      <Select
        id={id}
        options={options.map((option) => ({
          name: option.name,
          value: option.value,
        }))}
        full={isMobile}
        {...props}
      />
    </SelectBox>
  );
};
