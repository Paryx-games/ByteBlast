import styled from 'styled-components';

export const ControlBar = styled.div`
  display: flex; gap: 1rem; padding: 1rem; background: #222;
  button { padding: 0.5rem 1rem; background: #444; color: #fff; border: none; cursor: pointer; }
`;

export const Board = styled.div`
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; padding: 1rem;
`;

export const Button = styled.div`
  background: #333; color: #fff; padding: 1rem; border-radius: 8px;
  display: flex; justify-content: center; align-items: center; height: 100px;
  cursor: pointer; transition: transform 0.2s ease;
  &:hover { transform: scale(1.05); background: #444; }
`;