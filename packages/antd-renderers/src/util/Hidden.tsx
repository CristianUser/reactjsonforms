import React, { FC } from 'react';

type HiddenProps = {
  hidden: boolean;
};

const Hidden: FC<HiddenProps> = ({ children, hidden }) => {
  return <>{hidden ? null : children}</>;
};

export default Hidden;
