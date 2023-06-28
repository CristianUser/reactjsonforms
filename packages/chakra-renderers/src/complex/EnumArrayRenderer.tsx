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
} from '@reactjsonforms/core';
import { withJsonFormsMultiEnumProps } from '@reactjsonforms/react';

import { startCase } from 'lodash';
import {
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
import Hidden from '../util/Hidden';

export const EnumArrayRenderer = ({
  visible,
  errors,
  path,
  options,
  data,
  addItem,
  removeItem,
}: ControlProps & OwnPropsOfEnum & DispatchPropsOfMultiEnumControl) => {
  const isValid = errors.length === 0;

  // NOTE: probably will need to remove the marginBottom of Form.Item
  return (
    <Hidden hidden={!visible}>
      <FormControl isInvalid={!isValid}>
        {(options || []).map((option: any, index: number) => {
          const optionPath = Paths.compose(path, `${index}`);
          const isChecked = data?.includes(option.value);
          return (
            <Flex key={optionPath}>
              <FormLabel>{startCase(option.label)}</FormLabel>
              <Checkbox
                id={option.value}
                onChange={(e) =>
                  e.target.checked
                    ? addItem(path, option.value)
                    : removeItem?.(path, option.value)
                }
                isChecked={isChecked}
              />
            </Flex>
          );
        })}
        <FormErrorMessage>{errors}</FormErrorMessage>
      </FormControl>
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
          (hasType(schema, 'array') &&
            !Array.isArray(schema.items) &&
            schema.uniqueItems) ??
          false
      ),
      schemaSubPathMatches('items', (schema) => {
        return hasOneOfItems(schema) || hasEnumItems(schema);
      })
    )
  )
);

export default withJsonFormsMultiEnumProps(EnumArrayRenderer);
