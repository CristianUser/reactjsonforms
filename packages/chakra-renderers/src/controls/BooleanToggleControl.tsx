/*
  The MIT License

  Copyright (c) 2017-2021 EclipseSource Munich
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
import React from 'react';
import {
  and,
  ControlProps,
  isBooleanControl,
  optionIs,
  RankedTester,
  rankWith,
} from '@reactjsonforms/core';
import { withJsonFormsControlProps } from '@reactjsonforms/react';
import { Field } from '@chakra-ui/react';
import Hidden from '../util/Hidden';
import { ChakraToggle } from '../chakra-controls/ChakraToggle';

export const BooleanToggleControl = ({
  data,
  visible,
  required,
  label,
  description,
  id,
  enabled,
  uischema,
  schema,
  rootSchema,
  handleChange,
  errors,
  path,
  config,
}: ControlProps) => {
  const isValid = isEmpty(errors);

  return (
    <Hidden hidden={!visible}>
      <Field.Root id={id} invalid={!isValid} required={required}>
        <Field.Label>{label}</Field.Label>
        <ChakraToggle
          id={`${id}-input`}
          isValid={isValid}
          data={data}
          enabled={enabled}
          visible={visible}
          path={path}
          uischema={uischema}
          schema={schema}
          rootSchema={rootSchema}
          handleChange={handleChange}
          errors={errors}
          config={config}
        />
        <Field.HelperText>{description}</Field.HelperText>
        <Field.ErrorText>{errors}</Field.ErrorText>
      </Field.Root>
    </Hidden>
  );
};

export const booleanToggleControlTester: RankedTester = rankWith(
  3,
  and(isBooleanControl, optionIs('toggle', true))
);

export default withJsonFormsControlProps(BooleanToggleControl);
