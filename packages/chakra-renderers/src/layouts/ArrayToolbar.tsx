/* eslint-disable react/display-name */
import { AddIcon } from '@chakra-ui/icons';
import React from 'react';
import { ArrayTranslations } from '@reactjsonforms/core';
import ValidationIcon from '../complex/ValidationIcon';
import PageHeader from '../util/PageHeader';
import { Box, Flex, Heading, IconButton, Tooltip } from '@chakra-ui/react';
import _ from 'lodash';
export interface ArrayLayoutToolbarProps {
  translations: ArrayTranslations;
  label: string;
  errors: string;
  path: string;
  addItem(path: string, data: any): () => void;
  createDefault(): any;
}

const renderTitle = (label: string, errors: string) => (
  <Flex direction='row' alignItems='center'>
    <Box key='col_1'>
      <Heading as='h4' size='md'>
        {label}
      </Heading>
    </Box>
    <Box key='col_2' style={{ padding: '0 10px' }}>
      <ValidationIcon id='tooltip-validation' errorMessages={errors} />
    </Box>
  </Flex>
);

export const ArrayLayoutToolbar = React.memo(
  ({
    label,
    errors,
    addItem,
    path,
    createDefault,
    translations,
  }: ArrayLayoutToolbarProps) => {
    return (
      <PageHeader
        title={renderTitle(label, errors)}
        extra={
          <Tooltip key='1' label={translations.addTooltip}>
            <IconButton
              aria-label={translations.addAriaLabel || ''}
              onClick={addItem(path, createDefault())}
              icon={<AddIcon />}
            />
          </Tooltip>
        }
      />
    );
  }
);
