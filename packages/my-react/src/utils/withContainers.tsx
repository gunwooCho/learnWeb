/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import withContainer, { RenderProps } from './withContainer';

/**
@example
const TestView = ({ code1, code2, code3 }: any) => (
  <>{code1} {code2} {code3} world</>
);

const TestContainer1 = ({ render, ...otherProps }: any) => (
  render({
    code1: 'test1',
    ...otherProps,
  })
)

const TestContainer2 = ({ render, ...otherProps }: any) => (
  render({
    code2: 'test2',
    ...otherProps,
  })
)

interface Props {
  code3: string; 
}

const TestComponent = withContainers<Props>([TestContainer1, TestContainer2], TestView);
// or const TestComponent = withContainers([TestContainer1, TestContainer2], TestView)

...
<TestComponent code3="4444"></TestComponent>

*/
const withContainers = <P=any>(
  containers: React.ComponentType<RenderProps>[],
  childComponent: (props: any) => JSX.Element,
) => {
  const component: (props: P) => JSX.Element = containers.reduce((currentComponent, container) => (
    withContainer(container, currentComponent)
  ), childComponent);

  return component;
};

export default withContainers;
