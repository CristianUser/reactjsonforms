import React from 'react';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { LuInfo } from 'react-icons/lu';

type NoDataProps = {
  title: string;
  description?: string;
};

const NoData = (props: NoDataProps) => {
  const { title = 'No Data', description } = props;
  return (
    <Flex
      textAlign='center'
      py='4'
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <Icon fontSize='5xl' color='gray.500' mb='2'>
        <LuInfo />
      </Icon>
      <Text fontSize='2xl' fontWeight='bold' color='gray.500'>
        {title}
      </Text>
      <Text fontSize='xl' mt='4' color='gray.500'>
        {description}
      </Text>
    </Flex>
  );
};

export default NoData;
