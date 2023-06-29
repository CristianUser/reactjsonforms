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
import React from 'react';
import {
  GroupLayout,
  LayoutProps,
  RankedTester,
  rankWith,
  uiTypeIs,
  withIncreasedRank,
} from '@reactjsonforms/core';
import { withJsonFormsLayoutProps } from '@reactjsonforms/react';
import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';
import { LayoutRenderer, LayoutRendererProps } from '../util/layout';

export const groupTester: RankedTester = rankWith(1, uiTypeIs('Group'));

const GroupComponent = React.memo(
  ({ visible, enabled, uischema, ...props }: LayoutRendererProps) => {
    const groupLayout = uischema as GroupLayout;
    return (
      <Card hidden={!visible} mb='10px' w='100%'>
        <CardHeader>
          <Heading size='md'>{groupLayout.label}</Heading>
        </CardHeader>
        <CardBody>
          <LayoutRenderer
            {...props}
            visible={visible}
            enabled={enabled}
            elements={groupLayout.elements}
          />
        </CardBody>
      </Card>
    );
  }
);

export const GroupLayoutRenderer = ({
  uischema,
  schema,
  path,
  visible,
  enabled,
  renderers,
  cells,
  direction,
}: LayoutProps) => {
  const groupLayout = uischema as GroupLayout;

  return (
    <GroupComponent
      elements={groupLayout.elements}
      schema={schema}
      path={path}
      direction={direction}
      visible={visible}
      enabled={enabled}
      uischema={uischema}
      renderers={renderers}
      cells={cells}
    />
  );
};

export default withJsonFormsLayoutProps(GroupLayoutRenderer);

export const antdGroupTester: RankedTester = withIncreasedRank(1, groupTester);
