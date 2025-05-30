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
import React, { useMemo } from 'react';
import { EnumCellProps, WithClassname } from '@reactjsonforms/core';

import { Select } from '@chakra-ui/react';
import merge from 'lodash/merge';
import { i18nDefaults } from '../util';
import { TranslateProps } from '@reactjsonforms/react';

export const ChakraSelect = (
  props: EnumCellProps & WithClassname & TranslateProps
) => {
  const {
    data,
    className,
    id,
    enabled,
    schema,
    t,
    uischema,
    path,
    handleChange,
    options = [],
    config,
  } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const selectStyle = appliedUiSchemaOptions.trim ? {} : { width: '100%' };
  const noneOptionLabel = useMemo(
    () => t('enum.none', i18nDefaults['enum.none'], { schema, uischema, path }),
    [t, schema, uischema, path]
  );

  return (
    <Select
      className={className}
      id={id}
      isDisabled={!enabled}
      autoFocus={appliedUiSchemaOptions.focus}
      value={data || ''}
      onChange={(ev) =>
        handleChange(
          path,
          ev.target.selectedIndex === 0 ? undefined : ev.target.value
        )
      }
      style={selectStyle}
    >
      <option value={''} key={'jsonforms.enum.none'}>
        {noneOptionLabel}
      </option>
      ,
      {options.map((optionValue) => (
        <option value={optionValue.value} key={optionValue.value}>
          {optionValue.label}
        </option>
      ))}
    </Select>
  );
};
