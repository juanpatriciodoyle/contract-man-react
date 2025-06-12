import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  color: #1f2937;

  th, td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  th {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280;
  }

  tbody tr:nth-child(even) {
    background-color: #f9fafb;
  }
`;