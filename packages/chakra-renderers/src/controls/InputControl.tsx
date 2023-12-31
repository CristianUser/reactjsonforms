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
import maxBy from 'lodash/maxBy';
import React from 'react';
import {
  ControlProps,
  ControlState,
  isControl,
  isDescriptionHidden,
  NOT_APPLICABLE,
  RankedTester,
  rankWith,
} from '@reactjsonforms/core';
import {
  Control,
  DispatchCell,
  withJsonFormsControlProps,
} from '@reactjsonforms/react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
  Text,
} from '@chakra-ui/react';
import { withVanillaControlProps } from '../util';
import type { VanillaRendererProps } from '../index';
import merge from 'lodash/merge';

export class InputControl extends Control<
  ControlProps & VanillaRendererProps,
  ControlState
> {
  render() {
    const {
      description,
      id,
      errors,
      label,
      uischema,
      schema,
      rootSchema,
      visible,
      enabled,
      required,
      path,
      cells,
      config,
    } = this.props;

    const isValid = errors.length === 0;

    const appliedUiSchemaOptions = merge({}, config, uischema.options);
    const showDescription = !isDescriptionHidden(
      visible,
      description,
      this.state.isFocused,
      appliedUiSchemaOptions.showUnfocusedDescription
    );
    const testerContext = {
      rootSchema: rootSchema,
      config: config,
    };
    const cell = maxBy(cells, (r) => r.tester(uischema, schema, testerContext));
    if (
      cell === undefined ||
      cell.tester(uischema, schema, testerContext) === NOT_APPLICABLE
    ) {
      console.warn('No applicable cell found.', uischema, schema);
      return null;
    } else {
      return (
        <FormControl
          hidden={!visible}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          isRequired={required}
          id={id}
          isInvalid={!isValid}
        >
          <FormLabel
            requiredIndicator={
              <Text as='span' ms='0.5' color='blue.600' fontWeight='bold'>
                {appliedUiSchemaOptions.hideRequiredAsterisk ? '' : '*'}
              </Text>
            }
          >
            {label}
          </FormLabel>
          <DispatchCell
            uischema={uischema}
            schema={schema}
            path={path}
            enabled={enabled}
          />
          <FormHelperText>{showDescription ? description : ''}</FormHelperText>
          <FormErrorMessage>{errors}</FormErrorMessage>
        </FormControl>
      );
    }
  }
}

export const inputControlTester: RankedTester = rankWith(1, isControl);

export default withVanillaControlProps(withJsonFormsControlProps(InputControl));
