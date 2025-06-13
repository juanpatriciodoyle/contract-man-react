import React, {useState} from 'react';
import styled from 'styled-components';
import {NavLink, useNavigate} from 'react-router-dom';
import {BarChart2, Bot, FileBarChart, FileText, LayoutDashboard, LucideIcon, UploadCloud, Users} from 'lucide-react';
import {motion} from 'framer-motion';

const SidebarWrapper = styled.div`
    width: 300px;
    background-color: #ffffff;
    border-right: 1px solid #e5e7eb;
    padding: 1.3rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 0.5rem 0.5rem;
`;

const LogoIcon = styled.div`
    width: 40px;
    height: 40px;
    background-color: #4f46e5;
    color: white;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AppTitle = styled.h1`
    color: #111827;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
`;

const AppSubtitle = styled.p`
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0.25rem 0 0;
`;

const NavList = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const StyledNavLink = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    color: #374151;
    text-decoration: none;
    font-weight: 500;
    transition: background-color 0.2s, color 0.2s;

    svg {
        color: #6b7280;
        transition: color 0.2s;
    }

    &:hover {
        background-color: #f3f4f6;
        color: #111827;

        svg {
            color: #111827;
        }
    }

    &.active {
        background-image: linear-gradient(to right, #4f46e5, #6366f1);
        color: #ffffff;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        svg {
            color: #ffffff;
        }

        &:hover {
            background-image: linear-gradient(to right, #4f46e5, #6366f1);
        }
    }
`;

const LinkContent = styled.span`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const NotificationBadge = styled.span`
    background-color: #ef4444;
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 9999px;
`;

const SeparatorLine = styled.div`
    border-bottom: 1px solid #e5e7eb;
    margin: 1rem 0;
    width: 100%;
`;

const UserSwitchContainer = styled.div`
    display: flex;
    position: relative;
    justify-content: space-between;
    background-color: #f3f4f6;
    border-radius: 0.5rem;
    padding: 0.25rem;
    gap: 0.8rem;
`;

const UserSwitchButton = styled.button<{ $isActive: boolean }>`
    flex: 1;
    padding: 0.5rem 0.75rem;
    border-radius: 0.4rem;
    border: none;
    cursor: pointer;
    background-color: transparent;
    color: ${({$isActive}) => ($isActive ? '#ffffff' : '#4b5563')};
    transition: color 0.2s ease-in-out;
    font-size: 0.875rem;
    font-weight: 500;
    position: relative;
    z-index: 1;
`;

const ActiveSwitchBackground = styled(motion.div)`
    position: absolute;
    top: 0.25rem;
    bottom: 0.25rem;
    left: 0.25rem;
    border-radius: 0.4rem;
    background-image: linear-gradient(to right, #4f46e5, #6366f1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 0;
`;

interface SidebarProps {
    contractCount: number;
}

type UserProfile = 'admin' | 'vendor';

interface MenuItem {
    to: string;
    icon: LucideIcon;
    label: string;
    notification?: number;
}

const Sidebar: React.FC<SidebarProps> = ({contractCount}) => {
    const [activeProfile, setActiveProfile] = useState<UserProfile>('admin');
    const [buttonWidth, setButtonWidth] = useState(0);
    const navigate = useNavigate();

    React.useEffect(() => {
        const calculateWidth = () => {
            const container = document.getElementById('user-switch-container');
            if (container) {
                setButtonWidth((container.offsetWidth - 0.5 * 16 - 0.25 * 16 * 2) / 2);
            }
        };
        calculateWidth();
        window.addEventListener('resize', calculateWidth);
        return () => window.removeEventListener('resize', calculateWidth);
    }, []);

    const ADMIN_MENU_ITEMS: MenuItem[] = [
        {to: "/", icon: LayoutDashboard, label: "Dashboard"},
        {to: "/contracts", icon: FileText, label: "Contracts", notification: contractCount},
        {to: "/ai-analytics", icon: BarChart2, label: "AI Analytics"},
        {to: "/admin-vendors", icon: Users, label: "Vendors"},
        {to: "/reports", icon: FileBarChart, label: "Reports"},
    ];

    const VENDOR_MENU_ITEMS: MenuItem[] = [
        {to: "/vendor-dashboard", icon: UploadCloud, label: "Verification Status"},
    ];

    const MENU_ITEMS = activeProfile === 'admin' ? ADMIN_MENU_ITEMS : VENDOR_MENU_ITEMS;

    const SWITCH_X = activeProfile === 'admin' ? 0 : buttonWidth + 0.8 * 16;

    const handleAdminClick = () => {
        setActiveProfile('admin');
        navigate('/');
    };

    const handleVendorClick = () => {
        setActiveProfile('vendor');
        navigate('/vendor-dashboard');
    };

    return (
        <SidebarWrapper>
            <LogoWrapper>
                <LogoIcon><Bot size={24}/></LogoIcon>
                <div>
                    <AppTitle>ContractFlow</AppTitle>
                    <AppSubtitle>AI-Powered Management</AppSubtitle>
                </div>
            </LogoWrapper>

            <SeparatorLine/>

            <UserSwitchContainer id="user-switch-container">
                {buttonWidth > 0 && (
                    <ActiveSwitchBackground
                        initial={{x: SWITCH_X, width: buttonWidth}}
                        animate={{x: SWITCH_X, width: buttonWidth}}
                        transition={{type: "spring", stiffness: 400, damping: 30}}
                    />
                )}
                <UserSwitchButton
                    $isActive={activeProfile === 'admin'}
                    onClick={handleAdminClick}
                >
                    Admin
                </UserSwitchButton>
                <UserSwitchButton
                    $isActive={activeProfile === 'vendor'}
                    onClick={handleVendorClick}
                >
                    Vendor
                </UserSwitchButton>
            </UserSwitchContainer>

            <SeparatorLine/>

            <NavList>
                {MENU_ITEMS.map((item) => (
                    <StyledNavLink key={item.to} to={item.to}>
                        <LinkContent>
                            <item.icon size={20}/>
                            {item.label}
                        </LinkContent>
                        {item.notification && item.notification > 0 &&
                            <NotificationBadge>{item.notification}</NotificationBadge>}
                    </StyledNavLink>
                ))}
            </NavList>
        </SidebarWrapper>
    );
};

export default Sidebar;