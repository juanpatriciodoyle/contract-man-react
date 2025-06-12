export const formatValue = (num: number | null): string => {
  if (num === 0) return '$0';
  if (!num) return 'Unknown';

  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(0)}K`;
  }
  return `$${num}`;
};