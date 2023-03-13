import React from 'react';

export interface RenderProps {
  render?: React.ComponentType,
}

/**
@example
const TestView = ({ code }: any) => (
  <>{code} world</>
);

const TestContainer = ({ render, ...otherProps }: any) => (
  render(otherProps)
);

const TestComponent = withContainer(TestContainer, TestView)

...
<TestComponent code="1234" />
 */
const withContainer = <PP extends RenderProps, CP>(
  WrapperContainer: React.ComponentType<PP>,
  CustomComponent: React.ComponentType<CP>,
) => function ParentComponent(hocProps: PP) {
  return <WrapperContainer
    {...hocProps}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render={(props: any) => {
      const dumyProps = props;

      // props로 넘어오는 불필요하거나 중복 데이터 객체 제거
      delete dumyProps.render;
      delete dumyProps.props;
      delete dumyProps.state;
      delete dumyProps.updater;
      // eslint-disable-next-line no-underscore-dangle
      delete dumyProps._reactInternalFiber;
      // eslint-disable-next-line no-underscore-dangle
      delete dumyProps._reactInternalInstance;

      return (
        <CustomComponent {...dumyProps} />
      );
    }
    }
  />
};

export default withContainer;
