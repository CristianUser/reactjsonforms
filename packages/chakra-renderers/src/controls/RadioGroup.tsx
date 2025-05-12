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
import React, { useState } from 'react';
import {
  ControlProps,
  isDescriptionHidden,
  OwnPropsOfEnum,
} from '@reactjsonforms/core';
import { RadioGroup, Field, HStack } from '@chakra-ui/react';
import type { VanillaRendererProps } from '../index';
import merge from 'lodash/merge';

export const RadioGroupInput = ({
  id,
  label,
  options,
  required,
  description,
  errors,
  data,
  uischema,
  visible,
  config,
  enabled,
  path,
  handleChange,
}: ControlProps & VanillaRendererProps & OwnPropsOfEnum) => {
  const [isFocused, setFocus] = useState(false);
  const isValid = errors.length === 0;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const showDescription = !isDescriptionHidden(
    visible,
    description,
    isFocused,
    appliedUiSchemaOptions.showUnfocusedDescription
  );
  return (
    <Field.Root
      as='fieldset'
      invalid={!isValid}
      disabled={!enabled}
      required={required}
      hidden={!visible}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <Field.Label as='legend'>{label}</Field.Label>

      <RadioGroup.Root
        name={id}
        onValueChange={(e) => handleChange(path, e.value)}
      >
        <HStack gap='8px'>
          {options &&
            options.map((option) => (
              <RadioGroup.Item
                key={option.label}
                value={option.value}
                id={option.value}
                // checked={data === option.value}
              >
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
        </HStack>
      </RadioGroup.Root>
      <Field.HelperText>{showDescription ? description : ''}</Field.HelperText>
      <Field.ErrorText>{errors}</Field.ErrorText>
    </Field.Root>
  );
};
