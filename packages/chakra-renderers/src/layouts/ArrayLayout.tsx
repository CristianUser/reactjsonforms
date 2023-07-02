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
import range from 'lodash/range';
import React from 'react';
import {
  ArrayLayoutProps,
  computeLabel,
  // computeLabel,
  createDefaultValue,
} from '@reactjsonforms/core';
import map from 'lodash/map';
import ExpandPanelRenderer from './ExpandPanelRenderer';
import merge from 'lodash/merge';
import { Accordion, Box } from '@chakra-ui/react';
import { ArrayLayoutToolbar } from './ArrayToolbar';
import NoData from '../util/NoData';

interface ArrayLayoutState {
  expanded: number;
}
export class ArrayLayout extends React.PureComponent<
  ArrayLayoutProps,
  ArrayLayoutState
> {
  state: ArrayLayoutState = {
    expanded: NaN,
  };
  innerCreateDefaultValue = () => createDefaultValue(this.props.schema);
  handleChange = (key: number) => {
    this.setState({
      expanded: key,
    });
  };
  isExpanded = (index: number) => this.state.expanded === index;
  render() {
    const {
      data,
      path,
      schema,
      uischema,
      errors,
      addItem,
      renderers,
      cells,
      label,
      required,
      rootSchema,
      config,
      uischemas,
      translations,
    } = this.props;
    const appliedUiSchemaOptions = merge(
      {},
      config,
      this.props.uischema.options
    );

    return (
      <Box w='100%'>
        <ArrayLayoutToolbar
          translations={translations}
          label={computeLabel(
            label,
            required,
            appliedUiSchemaOptions.hideRequiredAsterisk
          )}
          errors={errors}
          path={path}
          addItem={addItem}
          createDefault={this.innerCreateDefaultValue}
        />
        {data > 0 ? (
          <Accordion allowMultiple>
            {map(range(data), (index) => {
              return (
                <ExpandPanelRenderer
                  index={index}
                  translations={translations}
                  schema={schema}
                  path={path}
                  renderers={renderers}
                  uischema={uischema}
                  uischemas={uischemas}
                  cells={cells}
                  key={`${path}_${index}`}
                  rootSchema={rootSchema}
                  enableMoveUp={index != 0}
                  enableMoveDown={index < data - 1}
                  config={config}
                  childLabelProp={appliedUiSchemaOptions.elementLabelProp}
                  enabled={false}
                  expanded={false}
                />
              );
            })}
          </Accordion>
        ) : (
          <NoData title='No data' />
        )}
      </Box>
    );
  }
}
