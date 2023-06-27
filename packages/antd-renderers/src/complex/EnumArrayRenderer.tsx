import React from 'react';
import {
  and,
  ControlProps,
  DispatchPropsOfMultiEnumControl,
  hasType,
  JsonSchema,
  OwnPropsOfEnum,
  Paths,
  RankedTester,
  rankWith,
  schemaMatches,
  schemaSubPathMatches,
  uiTypeIs,
} from '@jsonforms/core';
import { withJsonFormsMultiEnumProps } from '@jsonforms/react';

import { Form } from 'antd';
import { isEmpty, startCase } from 'lodash';
import { AntdCheckbox } from '../antd-controls';
import Hidden from '../util/Hidden';

export const EnumArrayRenderer = ({
  schema,
  visible,
  errors,
  path,
  options,
  data,
  addItem,
  removeItem,
  ...otherProps
}: ControlProps & OwnPropsOfEnum & DispatchPropsOfMultiEnumControl) => {
  const isValid = errors.length === 0;

  // NOTE: probably will need to remove the marginBottom of Form.Item
  return (
    <Hidden hidden={!visible}>
      <Form.Item
        hasFeedback={!isValid}
        validateStatus={isValid ? '' : 'error'}
        help={errors}
      >
        {options.map((option: any, index: number) => {
          const optionPath = Paths.compose(path, `${index}`);
          const checkboxValue = data?.includes(option.value)
            ? option.value
            : undefined;
          return (
            <AntdCheckbox
              id={option.value}
              key={option.value}
              label={startCase(option.label)}
              isValid={isEmpty(errors)}
              path={optionPath}
              handleChange={(_childPath, newValue) =>
                newValue
                  ? addItem(path, option.value)
                  : removeItem(path, option.value)
              }
              data={checkboxValue}
              errors={errors}
              schema={schema}
              visible={visible}
              {...otherProps}
            />
          );
        })}
      </Form.Item>
    </Hidden>
  );
};

const hasOneOfItems = (schema: JsonSchema): boolean =>
  schema.oneOf !== undefined &&
  schema.oneOf.length > 0 &&
  (schema.oneOf as JsonSchema[]).every((entry: JsonSchema) => {
    return entry.const !== undefined;
  });

const hasEnumItems = (schema: JsonSchema): boolean =>
  schema.type === 'string' && schema.enum !== undefined;

export const enumArrayRendererTester: RankedTester = rankWith(
  5,
  and(
    uiTypeIs('Control'),
    and(
      schemaMatches(
        (schema) =>
          hasType(schema, 'array') &&
          !Array.isArray(schema.items) &&
          schema.uniqueItems
      ),
      schemaSubPathMatches('items', (schema) => {
        return hasOneOfItems(schema) || hasEnumItems(schema);
      })
    )
  )
);

export default withJsonFormsMultiEnumProps(EnumArrayRenderer);
