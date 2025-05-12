/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import { StatePropsOfMasterItem } from '@reactjsonforms/core';
import { withJsonFormsMasterListItemProps } from '@reactjsonforms/react';
import React, { useMemo } from 'react';
import { Avatar, Flex, IconButton, Text } from '@chakra-ui/react';
import { Tooltip } from '../components/ui/tooltip';
import { LuTrash2 } from 'react-icons/lu';

const ListWithDetailMasterItem = ({
  index,
  childLabel,
  selected,
  handleSelect,
  removeItem,
  path,
  translations,
}: StatePropsOfMasterItem) => {
  const avatarStyle = useMemo(
    () => (selected ? { bgColor: 'blue.600' } : {}),
    [selected]
  );

  return (
    <Flex
      justifyContent='space-between'
      alignItems='center'
      key={index}
      onClick={handleSelect(index)}
      _active={{
        bgColor: 'gray.100',
      }}
      w='100%'
    >
      <Flex alignItems='center'>
        <Avatar.Root size={'sm'} bgColor='gray.200' me='2' {...avatarStyle}>
          <Avatar.Fallback>{`${index + 1}`}</Avatar.Fallback>
        </Avatar.Root>
        <Text>{childLabel}</Text>
      </Flex>
      <Tooltip content={translations.removeTooltip} key='action_1'>
        <IconButton
          onClick={removeItem(path, index)}
          aria-label={translations.removeAriaLabel || ''}
        >
          <LuTrash2 />
        </IconButton>
      </Tooltip>
    </Flex>
  );
};

export default withJsonFormsMasterListItemProps(ListWithDetailMasterItem);
