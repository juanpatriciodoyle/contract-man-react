import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {AnimatePresence, motion} from 'framer-motion';
import {ChevronDown, Search, SlidersHorizontal} from 'lucide-react';

const ToolbarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const SearchInputWrapper = styled.div`
    position: relative;
    width: 320px;
    color: #9ca3af;

    input {
        width: 100%;
        padding: 0.5rem 0.75rem 0.5rem 2.5rem;
        border-radius: 0.5rem;
        border: 1px solid #d1d5db;

        &:focus {
            outline: 2px solid #3b82f6;
            border-color: transparent;
        }
    }

    svg {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const FilterWrapper = styled.div`
    position: relative;
`;

const FilterButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    background: white;
    border: 1px solid #d1d5db;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
`;

const DropdownMenu = styled(motion.div)`
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
    width: 200px;
    padding: 0.5rem;
    z-index: 10;
`;

const DropdownItem = styled.button<{ selected: boolean }>`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: none;
    background-color: ${({selected}) => (selected ? '#f3f4f6' : 'transparent')};
    border-radius: 0.25rem;
    text-align: left;
    cursor: pointer;
    font-weight: ${({selected}) => (selected ? '500' : '400')};

    &:hover {
        background-color: #f3f4f6;
    }
`;

export interface ToolbarProps {
    searchQuery: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedFilter: string;
    onFilterChange: (filter: string) => void;
    filterOptions: string[];
    placeholder?: string;
    showSearch?: boolean;
    showFilter?: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
                                                    searchQuery,
                                                    onSearchChange,
                                                    selectedFilter,
                                                    onFilterChange,
                                                    filterOptions,
                                                    placeholder = "Search...",
                                                    showSearch = true,
                                                    showFilter = true,
                                                }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!showSearch && !showFilter) {
        return null;
    }

    return (
        <ToolbarWrapper>
            {showSearch && (
                <SearchInputWrapper>
                    <Search size={18}/>
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={searchQuery}
                        onChange={onSearchChange}
                    />
                </SearchInputWrapper>
            )}

            {showFilter && (
                <FilterWrapper ref={dropdownRef}>
                    <FilterButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <SlidersHorizontal size={16}/> {selectedFilter} <ChevronDown size={16}/>
                    </FilterButton>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <DropdownMenu
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -10}}
                                transition={{duration: 0.2}}
                            >
                                {filterOptions.map(option => (
                                    <DropdownItem
                                        key={option}
                                        selected={option === selectedFilter}
                                        onClick={() => {
                                            onFilterChange(option);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        {option}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        )}
                    </AnimatePresence>
                </FilterWrapper>
            )}
        </ToolbarWrapper>
    );
};