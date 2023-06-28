/* eslint-disable react/display-name */
import { AddIcon } from '@chakra-ui/icons';
import React from 'react';
import { ArrayTranslations } from '@reactjsonforms/core';
import ValidationIcon from '../complex/ValidationIcon';
import { Flex, Heading, IconButton, Tooltip } from '@chakra-ui/react';
export interface ArrayLayoutToolbarProps {
  translations: ArrayTranslations;
  label: string;
  errors: string;
  path: string;
  addItem(path: string, data: any): () => void;
  createDefault(): any;
}

const renderTitle = (label: string, errors: string) => (
  <Flex direction={'row'}>
    <Flex direction={'column'} key='col_1'>
      <Heading as='h3'>{label}</Heading>
    </Flex>
    <Flex direction={'column'} key='col_2' style={{ padding: '0 10px' }}>
      <ValidationIcon id='tooltip-validation' errorMessages={errors} />
    </Flex>
  </Flex>
);

type PageHeaderProps = {
  title: React.ReactNode;
  extra: React.ReactNode;
};

export const PageHeader = ({ title, extra }: PageHeaderProps) => {
  return (
    <Flex justifyContent='space-between' w='100%' mb='4'>
      <Heading as='h3' size='md'>
        {title}
      </Heading>
      {extra}
    </Flex>
  );
};

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
