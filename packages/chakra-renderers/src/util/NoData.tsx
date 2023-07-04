import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

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
      <Box as={InfoIcon} fontSize='5xl' color='gray.500' mb='2' />
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
