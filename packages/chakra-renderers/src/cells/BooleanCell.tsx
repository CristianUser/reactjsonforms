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
import { Checkbox } from '@chakra-ui/react';
import {
  CellProps,
  createLabelDescriptionFrom,
  isBooleanControl,
  RankedTester,
  rankWith,
} from '@reactjsonforms/core';
import { withJsonFormsCellProps } from '@reactjsonforms/react';
import type { FC } from 'react';
import type { VanillaRendererProps } from '../index';
import { withVanillaBooleanCellProps } from '../util/index';

export const BooleanCell: FC<CellProps> = (
  props: CellProps & VanillaRendererProps
) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;
  const { text: label } = createLabelDescriptionFrom(uischema, props.schema);

  return (
    <Checkbox
      isChecked={!!data}
      onChange={(ev) => handleChange(path, ev.target.checked)}
      className={className}
      id={id}
      isDisabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
    >
      {label}
    </Checkbox>
  );
};

/**
 * Default tester for boolean controls.
 * @type {RankedTester}
 */
export const booleanCellTester: RankedTester = rankWith(2, isBooleanControl);

export default withJsonFormsCellProps(withVanillaBooleanCellProps(BooleanCell));
