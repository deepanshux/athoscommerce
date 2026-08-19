import { memo } from 'react';
import './ActivityIndicator.css';

export interface ActivityIndicatorProps {
  loading: boolean;
}

const ActivityIndicator = ({ loading }: ActivityIndicatorProps) => {
  return (
    <span
      aria-hidden={!loading}
      aria-label={loading ? 'Loading' : undefined}
      className={`activity-indicator${loading ? '' : ' activity-indicator--hidden'}`}
      role={loading ? 'status' : undefined}
    />
  );
};

export default memo(ActivityIndicator);