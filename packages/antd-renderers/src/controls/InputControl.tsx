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
  isDescriptionHidden,
} from '@jsonforms/core';
import { Control } from '@jsonforms/react';
import { Form } from 'antd';
import merge from 'lodash/merge';
import Hidden from '../util/Hidden';

export interface WithInput {
  input: any;
}

export abstract class InputControl extends Control<
  ControlProps & WithInput,
  ControlState
> {
  render() {
    const {
      id,
      description,
      errors,
      label,
      uischema,
      visible,
      required,
      config,
      input,
    } = this.props;
    const isValid = errors.length === 0;
    const appliedUiSchemaOptions = merge({}, config, uischema.options);

    const showDescription = !isDescriptionHidden(
      visible,
      description,
      this.state.isFocused,
      appliedUiSchemaOptions.showUnfocusedDescription
    );

    // const firstFormHelperText = showDescription
    //   ? description
    //   : !isValid
    //     ? errors
    //     : null;
    // const secondFormHelperText = showDescription && !isValid ? errors : null;
    const help = !isValid ? errors : showDescription ? description : null;
    const InnerComponent = input;
    const style = !appliedUiSchemaOptions.trim ? { width: '100%' } : {};

    return (
      <Hidden hidden={!visible}>
        <Form.Item
          required={required}
          hasFeedback={!isValid}
          validateStatus={isValid ? 'success' : 'error'}
          label={label}
          help={help}
          style={style}
          htmlFor={id + '-input'}
          id={id}
        >
          <InnerComponent
            {...this.props}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            id={id + '-input'}
            isValid={isValid}
            visible={visible}
          />
        </Form.Item>
      </Hidden>
    );
  }
}
