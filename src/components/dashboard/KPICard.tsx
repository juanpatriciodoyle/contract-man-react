import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { TrendingUp, TrendingDown, AlertTriangle, LucideIcon } from 'lucide-react';
import styled from 'styled-components';
import React, { useEffect, useMemo } from 'react';
import { formatValue, parseValue } from '../utils';

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
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => colorStyles[props.color].bg};
  color: ${(props) => colorStyles[props.color].text};
`;

const Title = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Value = styled(motion.p)`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
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
  const isCurrency = value.includes('$');
  const targetValue = useMemo(() => isCurrency ? parseValue(value) : 0, [value, isCurrency]);
  const count = useMotionValue(0);
  const displayValue = useTransform(count, (latest) => formatValue(Math.round(latest)));

  useEffect(() => {
    if (isCurrency) {
      const controls = animate(count, targetValue, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [targetValue, isCurrency, count]);

  return (
      <Card>
        <CardContent>
          <CardBody>
            <div>
              <Title>{title}</Title>
              <Value>
                {isCurrency ? displayValue : value}
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