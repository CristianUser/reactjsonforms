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
  ControlProps,
  ControlState,
  isDateControl,
  isDescriptionHidden,
  isTimeControl,
  or,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import { Control, withJsonFormsControlProps } from '@jsonforms/react';
import merge from 'lodash/merge';
import { Form, Input } from 'antd';

export class NativeControl extends Control<ControlProps, ControlState> {
  render() {
    const {
      id,
      errors,
      label,
      schema,
      description,
      enabled,
      visible,
      required,
      path,
      handleChange,
      data,
      config,
    } = this.props;
    const isValid = errors.length === 0;
    const appliedUiSchemaOptions = merge(
      {},
      config,
      this.props.uischema.options
    );
    const onChange = (ev: any) => handleChange(path, ev.target.value);
    const fieldType = schema.format;
    const showDescription = !isDescriptionHidden(
      visible,
      description,
      this.state.isFocused,
      appliedUiSchemaOptions.showUnfocusedDescription
    );

    const inputStyle = appliedUiSchemaOptions.trim ? {} : { width: '100%' };

    return (
      <Form.Item
        hidden={!visible}
        required={required}
        label={label}
        hasFeedback={!isValid}
        status={isValid ? 'success' : 'error'}
        help={!isValid ? errors : showDescription ? description : null}
      >
        <Input
          id={id + '-input'}
          type={fieldType}
          disabled={!enabled}
          style={inputStyle}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          value={data}
          onChange={onChange}
        />
      </Form.Item>
    );
  }
}

export const nativeControlTester: RankedTester = rankWith(
  2,
  or(isDateControl, isTimeControl)
);

export default withJsonFormsControlProps(NativeControl);
