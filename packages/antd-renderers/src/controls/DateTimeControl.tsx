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
import merge from 'lodash/merge';
import {
  ControlProps,
  ControlState,
  isDateTimeControl,
  RankedTester,
  rankWith,
} from '@reactjsonforms/core';
import { Control, withJsonFormsControlProps } from '@reactjsonforms/react';
import { DatePicker, Form } from 'antd';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(weekday);
dayjs.extend(localeData);

export class DateTimeControl extends Control<ControlProps, ControlState> {
  render() {
    const {
      id,
      description,
      errors,
      label,
      uischema,
      visible,
      enabled,
      required,
      path,
      handleChange,
      data,
      config,
    } = this.props;
    const appliedUiSchemaOptions = merge({}, config, uischema.options);
    const isValid = errors.length === 0;
    const pickerStyle = !appliedUiSchemaOptions.trim ? { width: '100%' } : {};

    return (
      <Form.Item
        hidden={!visible}
        required={required}
        hasFeedback={!isValid}
        status={isValid ? 'success' : 'error'}
        help={!isValid ? errors : description}
        label={label}
      >
        <DatePicker
          id={id + '-input'}
          style={pickerStyle}
          showTime={true}
          value={(data ? dayjs(data) : null) as any}
          onChange={(datetime) =>
            handleChange(path, datetime ? datetime.format() : '')
          }
          format={'MM/DD/YYYY h:mm a'}
          allowClear={true}
          disabled={!enabled}
          autoFocus={appliedUiSchemaOptions.focus}
        />
      </Form.Item>
    );
  }
}

export const dateTimeControlTester: RankedTester = rankWith(
  2,
  isDateTimeControl
);

export default withJsonFormsControlProps(DateTimeControl);
