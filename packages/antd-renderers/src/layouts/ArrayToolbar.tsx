/* eslint-disable react/display-name */
import { PageHeader } from '@ant-design/pro-components';
import { Button, Col, Row, Tooltip, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import ValidationIcon from '../complex/ValidationIcon';
import { ArrayTranslations } from '@jsonforms/core';
export interface ArrayLayoutToolbarProps {
  translations: ArrayTranslations;
  label: string;
  errors: string;
  path: string;
  addItem(path: string, data: any): () => void;
  createDefault(): any;
}

const { Title } = Typography;

const renderTitle = (label: string, errors: string) => (
  <Row>
    <Col key='col_1'>
      <Title level={3}>{label}</Title>
    </Col>
    <Col key='col_2' style={{ padding: '0 10px' }}>
      <ValidationIcon id='tooltip-validation' errorMessages={errors} />
    </Col>
  </Row>
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
        ghost={false}
        title={renderTitle(label, errors)}
        extra={
          <Tooltip key='1' title={translations.addTooltip}>
            <Button
              aria-label={translations.addAriaLabel}
              type='primary'
              onClick={addItem(path, createDefault())}
              shape='circle'
              icon={<PlusOutlined />}
            />
          </Tooltip>
        }
      />
    );
  }
);
