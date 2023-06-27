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
import merge from 'lodash/merge';
import React from 'react';
import {
  ControlState,
  DispatchPropsOfControl,
  isDateControl,
  isDescriptionHidden,
  RankedTester,
  rankWith,
  StatePropsOfControl,
} from '@jsonforms/core';
import { Control, withJsonFormsControlProps } from '@jsonforms/react';
import dayjs from 'dayjs';

import { DatePicker, Form } from 'antd';

export interface DateControl {
  dateLocale?: dayjs.Dayjs;
}

export class DateControl extends Control<
  StatePropsOfDateControl & DispatchPropsOfControl & DateControl,
  ControlState
> {
  render() {
    const {
      description,
      id,
      errors,
      label,
      uischema,
      visible,
      enabled,
      required,
      path,
      handleChange,
      data,
      dateLocale,
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
    const localeDateTimeFormat = dateLocale ? 'L' : 'YYYY-MM-DD';

    const pickerStyle = !appliedUiSchemaOptions.trim ? { width: '100%' } : {};

    return (
      <Form.Item
        hidden={!visible}
        required={required}
        hasFeedback={!isValid}
        status={isValid ? 'success' : 'error'}
        help={!isValid ? errors : showDescription ? description : ' '}
        label={label}
      >
        <DatePicker
          id={id + '-input'}
          style={pickerStyle}
          value={(data ? dayjs(data) : null) as any}
          onChange={(datetime: any) =>
            handleChange(path, datetime ? datetime.format('YYYY-MM-DD') : '')
          }
          format={localeDateTimeFormat}
          allowClear={true}
          disabled={!enabled}
          autoFocus={appliedUiSchemaOptions.focus}
        />
      </Form.Item>
    );
  }
}

export interface StatePropsOfDateControl extends StatePropsOfControl {
  defaultLabel: string;
  cancelLabel: string;
  clearLabel: string;
}

export const dateControlTester: RankedTester = rankWith(4, isDateControl);

export default withJsonFormsControlProps(DateControl);
