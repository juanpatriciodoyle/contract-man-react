import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Toolbar, ToolbarProps } from '../toolbar';
import { TableRowAnimated } from './tableElements';

const ManagerWrapper = styled.div`
    background-color: #ffffff;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07);
`;

export const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
`;

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    color: #1f2937;

    tbody tr:nth-child(even) {
        background-color: #f9fafb;
    }
`;

export const Th = styled.th`
    padding: 0.75rem 1rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280;
    border-bottom: 1px solid #e5e7eb;
`;

export const Td = styled.td`
    padding: 1rem 1rem;
    border-bottom: 1px solid #e5e7eb;
    vertical-align: middle;
    font-size: 0.875rem;
`;

export interface TableColumn<T> {
    key: string;
    label: string;
    renderCell: (item: T, index: number) => React.ReactNode;
}

interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    emptyMessage?: string;
    showToolbar?: boolean;
    toolbarProps?: ToolbarProps;
}

function Table<T>({ columns, data, emptyMessage = "No items to display.", showToolbar = false, toolbarProps }: TableProps<T>) {
    return (
        <ManagerWrapper>
            {showToolbar && toolbarProps && (
                <Toolbar {...toolbarProps} />
            )}

            <TableWrapper>
                <StyledTable>
                    <thead>
                    <tr>
                        {columns.map((column) => (
                            <Th key={column.key}>{column.label}</Th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.length > 0 ? (
                        <AnimatePresence mode="wait">
                            {data.map((item, index) => (
                                <TableRowAnimated
                                    key={item[columns[0].key as keyof T] as React.Key || index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {columns.map((column) => (
                                        <Td key={`${column.key}-${index}`}>
                                            {column.renderCell(item, index)}
                                        </Td>
                                    ))}
                                </TableRowAnimated>
                            ))}
                        </AnimatePresence>
                    ) : (
                        <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <Td colSpan={columns.length} style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                                {emptyMessage}
                            </Td>
                        </motion.tr>
                    )}
                    </tbody>
                </StyledTable>
            </TableWrapper>
        </ManagerWrapper>
    );
}

export default Table;