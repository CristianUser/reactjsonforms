import React from 'react';
import { Flex, Heading, Spacer } from '@chakra-ui/react';
import _ from 'lodash';
type PageHeaderProps = {
  title: string | React.ReactNode;
  extra: React.ReactNode;
};

const PageHeader = ({ title, extra }: PageHeaderProps) => {
  return (
    <Flex w='100%' my='2'>
      {_.isString(title) ? <Heading as='h4'>{title}</Heading> : title}
      <Spacer />
      {extra}
    </Flex>
  );
};

export default PageHeader;
