import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { TrendingUp, TrendingDown, AlertTriangle, LucideIcon } from 'lucide-react';
import styled from 'styled-components';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'warning';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'purple';
}

const colorStyles = {
  blue: { bg: '#DBEAFE', text: '#2563EB' },
  green: { bg: '#D1FAE5', text: '#059669' },
  yellow: { bg: '#FEF3C7', text: '#D97706' },
  purple: { bg: '#E9D5FF', text: '#9333EA' },
};

const trendColorStyles = {
  up: '#10B981',
  down: '#10B981',
  warning: '#F59E0B',
};

const trendIconMap = {
  up: <TrendingUp size={16} />,
  down: <TrendingDown size={16} />,
  warning: <AlertTriangle size={16} />,
};

const IconWrapper = styled(motion.div)<{ color: KPICardProps['color'] }>`
  width: 3rem;  /* w-12 */
  height: 3rem; /* h-12 */
  border-radius: 0.75rem; /* rounded-xl */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => colorStyles[props.color].bg};
  color: ${(props) => colorStyles[props.color].text};
`;

const Title = styled.p`
  color: #6b7280; /* text-gray-500 */
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  text-transform: uppercase;
  letter-spacing: 0.05em; /* tracking-wide */
`;

const Value = styled(motion.p)`
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700; /* font-bold */
  color: #111827; /* text-gray-900 */
  margin-top: 0.5rem;
`;

const Change = styled.div<{ trend: KPICardProps['trend'] }>`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.875rem; 
  color: ${(props) => trendColorStyles[props.trend]};

  span {
    margin-left: 0.25rem;
  }
`;

const CardBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


export default function KPICard({ title, value, change, trend, icon: Icon, color }: KPICardProps) {
  return (
      <Card>
        <CardContent>
          <CardBody>
            <div>
              <Title>{title}</Title>
              <Value
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                {value}
              </Value>
              <Change trend={trend}>
                {trendIconMap[trend]}
                <span>{change}</span>
              </Change>
            </div>
            <IconWrapper
                color={color}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
            >
              <Icon size={24} />
            </IconWrapper>
          </CardBody>
        </CardContent>
      </Card>
  );
}