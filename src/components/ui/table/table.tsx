import React, {useState} from 'react';
import styled from 'styled-components';
import {motion, AnimatePresence} from 'framer-motion';
import {Toolbar, ToolbarProps} from '../toolbar';
import {TableRowAnimated} from './tableElements';
import {ChevronUp, ChevronDown} from 'lucide-react';
import { CardLayout } from '../CardLayout';

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

export const Th = styled.th<{ $sortable?: boolean }>`
    padding: 0.75rem 1rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280;
    border-bottom: 1px solid #e5e7eb;
    cursor: ${({$sortable}) => ($sortable ? 'pointer' : 'default')};
`;

const TableHeaderContent = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    justify-content: flex-start;
    white-space: nowrap;
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
    sortable?: boolean;
    sortValue?: (item: T) => any;
}

interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    emptyMessage?: string;
    showToolbar?: boolean;
    toolbarProps?: ToolbarProps;
    initialSortBy?: string;
    initialSortDirection?: 'asc' | 'desc';
}

function Table<T>({
                      columns,
                      data,
                      emptyMessage = "No items to display.",
                      showToolbar = false,
                      toolbarProps,
                      initialSortBy,
                      initialSortDirection = 'asc',
                  }: TableProps<T>) {
    const [sortBy, setSortBy] = useState<string | undefined>(initialSortBy);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSortDirection);

    const handleSort = (columnKey: string) => {
        if (sortBy === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnKey);
            setSortDirection('asc');
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortBy) return 0;

        const column = columns.find(col => col.key === sortBy);
        if (!column || (!column.sortable && !column.sortValue)) return 0;

        const valA = column.sortValue ? column.sortValue(a) : (a as any)[sortBy];
        const valB = column.sortValue ? column.sortValue(b) : (b as any)[sortBy];

        if (valA === null || valA === undefined) return sortDirection === 'asc' ? 1 : -1;
        if (valB === null || valB === undefined) return sortDirection === 'asc' ? -1 : 1;

        if (typeof valA === 'string' && typeof valB === 'string') {
            return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        if (typeof valA === 'number' && typeof valB === 'number') {
            return sortDirection === 'asc' ? valA - valB : valB - valA;
        }
        return sortDirection === 'asc' ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
    });

    return (
        <CardLayout $padding="1.5rem">
            {showToolbar && toolbarProps && (
                <Toolbar {...toolbarProps} />
            )}

            <TableWrapper>
                <StyledTable>
                    <thead>
                    <tr>
                        {columns.map((column) => (
                            <Th
                                key={column.key}
                                onClick={column.sortable ? () => handleSort(column.key) : undefined}
                                $sortable={column.sortable}
                            >
                                <TableHeaderContent>
                                    {column.label}
                                    {column.sortable && sortBy === column.key && (
                                        sortDirection === 'asc' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>
                                    )}
                                </TableHeaderContent>
                            </Th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {sortedData.length > 0 ? (
                        <AnimatePresence mode="sync">
                            {sortedData.map((item, index) => (
                                <TableRowAnimated
                                    key={item[columns[0].key as keyof T] as React.Key || index}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.3}}
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
                        <motion.tr initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}>
                            <Td colSpan={columns.length} style={{textAlign: 'center', padding: '2rem', color: '#6b7280'}}>
                                {emptyMessage}
                            </Td>
                        </motion.tr>
                    )}
                    </tbody>
                </StyledTable>
            </TableWrapper>
        </CardLayout>
    );
}

export default Table;