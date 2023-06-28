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
import type { UISchemaElement } from '@reactjsonforms/core';
import {
  getAjv,
  JsonFormsCellRendererRegistryEntry,
  JsonFormsRendererRegistryEntry,
  JsonSchema,
  OwnPropsOfRenderer,
} from '@reactjsonforms/core';
import { JsonFormsDispatch, useJsonForms } from '@reactjsonforms/react';
import { Flex } from '@chakra-ui/react';

export const renderLayoutElements = (
  elements: UISchemaElement[],
  schema: JsonSchema,
  path: string,
  enabled: boolean,
  direction: 'row' | 'column',
  renderers?: JsonFormsRendererRegistryEntry[],
  cells?: JsonFormsCellRendererRegistryEntry[]
) => {
  const dir = direction === 'row' ? 'column' : 'row';
  const childProps: any = {};

  if (direction === 'row') {
    childProps.w = '100%';
  }

  return elements.map((child, index) => (
    <Flex direction={dir} key={`${path}-${index}`} {...childProps}>
      <JsonFormsDispatch
        uischema={child}
        schema={schema}
        path={path}
        enabled={enabled}
        renderers={renderers}
        cells={cells}
      />
    </Flex>
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
  const containerProps: any = {};
  const dir = direction === 'row' ? direction : 'column';

  if (dir === 'row') {
    containerProps.w = '100%';
  }

  if (isEmpty(elements)) {
    return null;
  } else {
    return (
      <Flex direction={dir} {...containerProps}>
        {renderLayoutElements(
          elements,
          schema as JsonSchema,
          path as string,
          enabled as boolean,
          direction,
          renderers,
          cells
        )}
      </Flex>
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
