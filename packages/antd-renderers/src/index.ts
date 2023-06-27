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
import {
  JsonFormsCellRendererRegistryEntry,
  JsonFormsRendererRegistryEntry,
} from '@jsonforms/core';
import {
  allOfControlTester,
  AllOfRenderer,
  anyOfControlTester,
  AnyOfRenderer,
  ArrayControlRenderer,
  arrayControlTester,
  EnumArrayRenderer,
  enumArrayRendererTester,
  objectControlTester,
  ObjectRenderer,
  oneOfControlTester,
  OneOfRenderer,
} from './complex';
import {
  LabelRenderer,
  labelRendererTester,
  ListWithDetailRenderer,
  listWithDetailTester,
} from './additional';
import {
  AnyOfStringOrEnumControl,
  anyOfStringOrEnumControlTester,
  BooleanControl,
  booleanControlTester,
  BooleanToggleControl,
  booleanToggleControlTester,
  dateControlTester,
  DateTimeControl,
  dateTimeControlTester,
  enumControlTester,
  IntegerControl,
  integerControlTester,
  MaterialDateControl,
  MaterialEnumControl,
  MaterialNumberControl,
  NativeControl,
  nativeControlTester,
  numberControlTester,
  OneOfEnumControl,
  oneOfEnumControlTester,
  OneOfRadioGroupControl,
  oneOfRadioGroupControlTester,
  RadioGroupControl,
  radioGroupControlTesterGroup,
  SliderControl,
  sliderControlTester,
  TextControl,
  textControlTester,
} from './controls';
import {
  antdGroupTester,
  ArrayLayout,
  arrayLayoutTester,
  CategorizationLayout,
  categorizationTester,
  GroupLayout,
  HorizontalLayout,
  horizontalLayoutTester,
  VerticalLayout,
  verticalLayoutTester,
} from './layouts';
import {
  BooleanCell,
  BooleanCellTester,
  BooleanToggleCell,
  BooleanToggleCellTester,
  DateCell,
  DateCellTester,
  EnumCell,
  EnumCellTester,
  IntegerCell,
  IntegerCellTester,
  NumberCell,
  NumberCellTester,
  NumberFormatCell,
  numberFormatCellTester,
  OneOfEnumCell,
  oneOfEnumCellTester,
  TextCell,
  textCellTester,
  TimeCell,
  timeCellTester,
} from './cells';
import MaterialCategorizationStepperLayout, {
  categorizationStepperTester,
} from './layouts/CategorizationStepperLayout';

export * from './complex';
export * from './controls';
export * from './layouts';
export * from './cells';
export * from './antd-controls';
export * from './util';

export const renderers: JsonFormsRendererRegistryEntry[] = [
  // controls
  {
    tester: arrayControlTester,
    renderer: ArrayControlRenderer,
  },
  { tester: booleanControlTester, renderer: BooleanControl },
  { tester: booleanToggleControlTester, renderer: BooleanToggleControl },
  { tester: nativeControlTester, renderer: NativeControl },
  { tester: enumControlTester, renderer: MaterialEnumControl },
  { tester: integerControlTester, renderer: IntegerControl },
  { tester: numberControlTester, renderer: MaterialNumberControl },
  { tester: textControlTester, renderer: TextControl },
  { tester: dateTimeControlTester, renderer: DateTimeControl },
  { tester: dateControlTester, renderer: MaterialDateControl },
  { tester: sliderControlTester, renderer: SliderControl },
  { tester: objectControlTester, renderer: ObjectRenderer },
  { tester: allOfControlTester, renderer: AllOfRenderer },
  { tester: anyOfControlTester, renderer: AnyOfRenderer },
  { tester: oneOfControlTester, renderer: OneOfRenderer },
  {
    tester: radioGroupControlTesterGroup,
    renderer: RadioGroupControl,
  },
  {
    tester: oneOfRadioGroupControlTester,
    renderer: OneOfRadioGroupControl,
  },
  { tester: oneOfEnumControlTester, renderer: OneOfEnumControl },
  // layouts
  { tester: antdGroupTester, renderer: GroupLayout },
  {
    tester: horizontalLayoutTester,
    renderer: HorizontalLayout,
  },
  { tester: verticalLayoutTester, renderer: VerticalLayout },
  {
    tester: categorizationTester,
    renderer: CategorizationLayout,
  },
  {
    tester: categorizationStepperTester,
    renderer: MaterialCategorizationStepperLayout,
  },
  { tester: arrayLayoutTester, renderer: ArrayLayout },
  // additional
  { tester: labelRendererTester, renderer: LabelRenderer },
  {
    tester: listWithDetailTester,
    renderer: ListWithDetailRenderer,
  },
  {
    tester: anyOfStringOrEnumControlTester,
    renderer: AnyOfStringOrEnumControl,
  },
  {
    tester: enumArrayRendererTester,
    renderer: EnumArrayRenderer,
  },
];

export const cells: JsonFormsCellRendererRegistryEntry[] = [
  { tester: BooleanCellTester, cell: BooleanCell },
  { tester: BooleanToggleCellTester, cell: BooleanToggleCell },
  { tester: DateCellTester, cell: DateCell },
  { tester: EnumCellTester, cell: EnumCell },
  { tester: oneOfEnumCellTester, cell: OneOfEnumCell },
  { tester: IntegerCellTester, cell: IntegerCell },
  { tester: NumberCellTester, cell: NumberCell },
  { tester: numberFormatCellTester, cell: NumberFormatCell },
  { tester: textCellTester, cell: TextCell },
  { tester: timeCellTester, cell: TimeCell },
];
