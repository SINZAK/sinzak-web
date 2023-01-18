import React from "react";

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

// This is the first reusable type utility we built
type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// This is a new type utitlity with ref!
type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

// This is the type for the "ref" only
type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

// This is the type used in the type annotation for the component
type PolymorphicComponent<
  T extends React.ElementType,
  TProps
> = React.FunctionComponent &
  (<C extends React.ElementType = T>(
    props: PolymorphicComponentPropWithRef<C, TProps>
  ) => React.ReactElement | null);

// helper function which wraps React.forwardRef
export function forwardRefWithPolymorphic<
  TTag extends React.ElementType,
  TProps = {}
>(
  fn: (
    props: PolymorphicComponentPropWithRef<TTag, TProps>,
    ref?: PolymorphicRef<TTag>
  ) => React.ReactElement | null
): PolymorphicComponent<TTag, TProps> {
  return React.forwardRef(fn as unknown as any);
}
