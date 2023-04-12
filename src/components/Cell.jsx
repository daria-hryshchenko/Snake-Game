import styled from 'styled-components';

export const Cell = () => {
  return <CellWrap />;
};

const CellWrap = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid black;
  margin: 5px;
`;
