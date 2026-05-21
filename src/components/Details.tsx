import React, {type ReactNode} from 'react';
import Details from '@theme/Details';

interface DetailsProps {
  summary: string;
  children: ReactNode;
}

export default function CustomDetails({summary, children}: DetailsProps) {
  return (
    <Details summary={summary}>
      <div>{children}</div>
    </Details>
  );
}
