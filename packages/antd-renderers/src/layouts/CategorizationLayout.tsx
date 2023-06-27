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
  and,
  Categorization,
  Category,
  isVisible,
  RankedTester,
  rankWith,
  StatePropsOfLayout,
  Tester,
  UISchemaElement,
  uiTypeIs,
} from '@jsonforms/core';
import { RendererComponent, withJsonFormsLayoutProps } from '@jsonforms/react';
import { Tabs } from 'antd';
import {
  AjvProps,
  LayoutRenderer as LayoutRenderer,
  LayoutRendererProps as LayoutRendererProps,
  withAjvProps,
} from '../util/layout';
import Hidden from '../util/Hidden';

const { TabPane } = Tabs;

export const isSingleLevelCategorization: Tester = and(
  uiTypeIs('Categorization'),
  (uischema: UISchemaElement): boolean => {
    const categorization = uischema as Categorization;

    return (
      categorization.elements &&
      categorization.elements.reduce(
        (acc, e) => acc && e.type === 'Category',
        true
      )
    );
  }
);

export const categorizationTester: RankedTester = rankWith(
  1,
  isSingleLevelCategorization
);
export interface CategorizationState {
  activeCategory: number;
}

export interface CategorizationLayoutRendererProps
  extends StatePropsOfLayout,
    AjvProps {
  selected?: number;
  ownState?: boolean;
  data?: any;
  onChange?(selected: number, prevSelected: number): void;
}

export class CategorizationLayoutRenderer extends RendererComponent<
  CategorizationLayoutRendererProps,
  CategorizationState
> {
  state = {
    activeCategory: 0,
  };

  render() {
    const {
      data,
      path,
      renderers,
      cells,
      schema,
      uischema,
      visible,
      enabled,
      selected,
      ajv,
    } = this.props;
    const categorization = uischema as Categorization;
    const value = this.hasOwnState() ? this.state.activeCategory : selected;
    const childProps: LayoutRendererProps = {
      elements: categorization.elements[value].elements,
      schema,
      path,
      direction: 'column',
      enabled,
      visible,
      renderers,
      cells,
    };

    const categories = categorization.elements.filter((category: Category) =>
      isVisible(category, data, undefined, ajv)
    );
    return (
      <Hidden hidden={!visible}>
        <Tabs activeKey={value?.toString()} onTabClick={this.handleChange}>
          {categories.map((e: Category, idx: number) => (
            <TabPane key={idx} tab={e.label} />
          ))}
        </Tabs>
        <div style={{ marginTop: '0.5em' }}>
          <LayoutRenderer {...childProps} />
        </div>
      </Hidden>
    );
  }

  hasOwnState = () => {
    return this.props.ownState !== undefined ? this.props.ownState : true;
  };

  private handleChange = (value: any, _event: any) => {
    if (this.props.onChange) {
      this.props.onChange(value, this.state.activeCategory);
    }
    const hasOwnState = this.hasOwnState();
    if (hasOwnState) {
      this.setState({ activeCategory: value });
    }
  };
}

export default withJsonFormsLayoutProps(
  withAjvProps(CategorizationLayoutRenderer)
);
