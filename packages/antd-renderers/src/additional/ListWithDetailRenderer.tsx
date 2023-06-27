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
import {
  ArrayLayoutProps,
  composePaths,
  computeLabel,
  createDefaultValue,
  findUISchema,
  RankedTester,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import {
  JsonFormsDispatch,
  withJsonFormsArrayLayoutProps,
} from '@jsonforms/react';
import { Col, Empty, List, Row } from 'antd';
import range from 'lodash/range';
import merge from 'lodash/merge';
import React, { useCallback, useMemo, useState } from 'react';

import { ArrayLayoutToolbar } from '../layouts/ArrayToolbar';
import ListWithDetailMasterItem from './ListWithDetailMasterItem';
import Hidden from '../util/Hidden';

export const ListWithDetailRenderer = ({
  uischemas,
  schema,
  uischema,
  path,
  errors,
  visible,
  label,
  required,
  removeItems,
  addItem,
  data,
  renderers,
  cells,
  config,
  translations,
}: ArrayLayoutProps) => {
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const handleRemoveItem = useCallback(
    (p: string, value: any) => () => {
      removeItems(p, [value])();
      if (selectedIndex === value) {
        setSelectedIndex(undefined);
      } else if (selectedIndex > value) {
        setSelectedIndex(selectedIndex - 1);
      }
    },
    [removeItems, setSelectedIndex]
  );
  const handleListItemClick = useCallback(
    (index: number) => () => setSelectedIndex(index),
    [setSelectedIndex]
  );
  const handleCreateDefaultValue = useCallback(
    () => createDefaultValue(schema),
    [createDefaultValue]
  );
  const foundUISchema = useMemo(
    () =>
      findUISchema(
        uischemas,
        schema,
        uischema.scope,
        path,
        undefined,
        uischema
      ),
    [uischemas, schema, uischema.scope, path, uischema]
  );
  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  return (
    <Hidden hidden={!visible}>
      <ArrayLayoutToolbar
        translations={translations}
        label={computeLabel(
          label,
          required,
          appliedUiSchemaOptions.hideRequiredAsterisk
        )}
        errors={errors}
        path={path}
        addItem={addItem}
        createDefault={handleCreateDefaultValue}
      />
      <Row gutter={10}>
        <Col xs={6}>
          <List
            dataSource={range(data)}
            renderItem={(_item, index) => (
              <ListWithDetailMasterItem
                translations={translations}
                index={index}
                path={path}
                schema={schema}
                handleSelect={handleListItemClick}
                removeItem={handleRemoveItem}
                selected={selectedIndex === index}
                key={index}
              />
            )}
          />
        </Col>
        <Col xs={18}>
          {selectedIndex !== undefined ? (
            <JsonFormsDispatch
              renderers={renderers}
              cells={cells}
              visible={visible}
              schema={schema}
              uischema={foundUISchema}
              path={composePaths(path, `${selectedIndex}`)}
            />
          ) : (
            <Empty description='No Selection' />
          )}
        </Col>
      </Row>
    </Hidden>
  );
};

export const listWithDetailTester: RankedTester = rankWith(
  4,
  uiTypeIs('ListWithDetail')
);

export default withJsonFormsArrayLayoutProps(ListWithDetailRenderer);
