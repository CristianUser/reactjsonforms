/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/display-name */
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
import isEmpty from 'lodash/isEmpty';
import React, { ComponentType } from 'react';

import Ajv from 'ajv';
import type { UISchemaElement } from '@jsonforms/core';
import {
  getAjv,
  JsonFormsCellRendererRegistryEntry,
  JsonFormsRendererRegistryEntry,
  JsonSchema,
  OwnPropsOfRenderer,
} from '@jsonforms/core';
import { JsonFormsDispatch, useJsonForms } from '@jsonforms/react';
import { Col, Row } from 'antd';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  row: {
    width: '100%',
    '& > div:not([class]), & > div[class^="ant-"]': {
      width: '100%',
    },
  },
});

export const renderLayoutElements = (
  elements: UISchemaElement[],
  schema: JsonSchema,
  path: string,
  enabled: boolean,
  direction: 'row' | 'column',
  renderers?: JsonFormsRendererRegistryEntry[],
  cells?: JsonFormsCellRendererRegistryEntry[]
) => {
  const GridChild = direction === 'row' ? Col : Row;
  const containerProps: any = {};
  const styles = useStyles();

  if (direction === 'row') {
    containerProps.flex = 1;
  } else {
    containerProps.className = styles.row;
  }

  return elements.map((child, index) => (
    <GridChild {...containerProps} key={`${path}-${index}`}>
      <JsonFormsDispatch
        uischema={child}
        schema={schema}
        path={path}
        enabled={enabled}
        renderers={renderers}
        cells={cells}
      />
    </GridChild>
  ));
};

export interface LayoutRendererProps extends OwnPropsOfRenderer {
  elements: UISchemaElement[];
  direction: 'row' | 'column';
}
export const LayoutRenderer = ({
  // visible,
  elements,
  schema,
  path,
  enabled,
  direction,
  renderers,
  cells,
}: LayoutRendererProps) => {
  const GridContainer = direction === 'row' ? Row : Col;
  const containerProps: any = {};

  if (direction === 'row') {
    containerProps.gutter = 2;
    containerProps.style = { width: '100%' };
  }

  if (isEmpty(elements)) {
    return null;
  } else {
    return (
      <GridContainer {...containerProps}>
        {renderLayoutElements(
          elements,
          schema,
          path,
          enabled,
          direction,
          renderers,
          cells
        )}
      </GridContainer>
    );
  }
};

export interface AjvProps {
  ajv: Ajv;
}
// TODO fix @typescript-eslint/ban-types
// eslint-disable-next-line @typescript-eslint/ban-types
export const withAjvProps = <P extends {}>(
  Component: ComponentType<AjvProps & P>
) =>
  function WithAjvProps(props: P) {
    const ctx = useJsonForms();
    const ajv = getAjv({ jsonforms: { ...ctx } });

    return <Component {...props} ajv={ajv} />;
  };
