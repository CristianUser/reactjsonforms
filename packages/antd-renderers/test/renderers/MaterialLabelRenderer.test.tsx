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
import './MatchMediaMock';
import * as React from 'react';
import { NOT_APPLICABLE } from '@reactjsonforms/core';
import '../../src/cells';
import LabelRenderer, {
  labelRendererTester,
} from '../../src/additional/LabelRenderer';
import { renderers } from '../../src';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { JsonForms, JsonFormsStateProvider } from '@reactjsonforms/react';
import { initCore } from './util';

Enzyme.configure({ adapter: new Adapter() });

const data = {};
const schema = {
  type: 'object',
  properties: {},
};
const uischema = {
  type: 'Label',
  text: 'Foo',
};

describe('Material Label Renderer tester', () => {
  it('should fail', () => {
    expect(labelRendererTester(undefined, undefined)).toBe(NOT_APPLICABLE);
    expect(labelRendererTester(null, undefined)).toBe(NOT_APPLICABLE);
    expect(labelRendererTester({ type: 'Foo' }, undefined)).toBe(
      NOT_APPLICABLE
    );
    expect(labelRendererTester({ type: 'Label' }, undefined)).toBe(1);
  });
});

describe('Material Label Renderer', () => {
  let wrapper: ReactWrapper;

  afterEach(() => wrapper.unmount());

  it('render', () => {
    wrapper = mount(
      <JsonForms
        data={undefined}
        schema={schema}
        uischema={uischema}
        renderers={renderers}
      />
    );
    expect(wrapper.find(LabelRenderer).length).toBeTruthy();

    const label = wrapper.find('h6').first();
    expect(label.text()).toBe('Foo');
  });

  it('can be hidden', () => {
    const core = initCore(schema, uischema, data);
    wrapper = mount(
      <JsonFormsStateProvider initState={{ renderers, core }}>
        <LabelRenderer schema={schema} uischema={uischema} visible={false} />
      </JsonFormsStateProvider>
    );
    const labels = wrapper.find('h6');
    expect(labels.length).toBe(0);
  });

  it('should be shown by default', () => {
    wrapper = mount(
      <JsonForms
        data={undefined}
        schema={schema}
        uischema={uischema}
        renderers={renderers}
      />
    );
    expect(wrapper.find(LabelRenderer).length).toBeTruthy();
    const label = wrapper.find('h6').first();
    expect(label.props().hidden).toBeFalsy();
  });
});
