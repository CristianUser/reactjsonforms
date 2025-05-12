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
  CellProps,
  isIntegerControl,
  RankedTester,
  rankWith,
} from '@reactjsonforms/core';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { withJsonFormsCellProps } from '@reactjsonforms/react';
import type { VanillaRendererProps } from '../index';
import { withVanillaCellProps } from '../util/index';

const toNumber = (value: string) =>
  value === '' ? undefined : parseInt(value, 10);

export const IntegerCell = (props: CellProps & VanillaRendererProps) => {
  const { data, id, enabled, uischema, path, handleChange } = props;

  return (
    <NumberInput
      inputMode='numeric'
      step={1}
      value={data ?? ''}
      onChange={(value) => handleChange(path, toNumber(value))}
      id={id}
      disabled={!enabled}
      focusInputOnChange={uischema.options && uischema.options.focus}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};
/**
 * Default tester for integer controls.
 * @type {RankedTester}
 */
export const integerCellTester: RankedTester = rankWith(2, isIntegerControl);

export default withJsonFormsCellProps(withVanillaCellProps(IntegerCell));
