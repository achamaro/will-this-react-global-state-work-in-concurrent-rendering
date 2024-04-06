# Will this React global state work in concurrent rendering?

Test tearing and branching in React concurrent rendering

- [Discussion in React 18 WG](https://github.com/reactwg/react-18/discussions/116)

## Introduction

React 18 comes with a new feature called "concurrent rendering".
With global state, there's a theoretical issue called "tearing"
that might occur in React concurrent rendering.

Let's test the behavior!

## What is tearing?

- [What is tearing in React 18 WG](https://github.com/reactwg/react-18/discussions/69)
- [Stack Overflow](https://stackoverflow.com/questions/54891675/what-is-tearing-in-the-context-of-the-react-redux)
- [Talk by Mark Erikson](https://www.youtube.com/watch?v=yOZ4Ml9LlWE&t=933s)
- [Talk by Flarnie Marchan](https://www.youtube.com/watch?v=V1Ly-8Z1wQA&t=1079s)
- Some other resources
  - https://github.com/reactjs/rfcs/pull/147
  - https://gist.github.com/bvaughn/054b82781bec875345bd85a5b1344698

## What is branching?

- Old resources
  - https://reactjs.org/docs/concurrent-mode-intro.html

## How does it work?

A small app is implemented with each library.
The state has one count.
The app shows the count in fifty components.

There's a button outside of React and
if it's clicked it will trigger state mutation.
This is to emulate mutating an external state outside of React,
for example updating state by Redux middleware.

The render has intentionally expensive computation.
If the mutation happens during rendering with in a tree,
there could be an inconsistency in the state.
If it finds the inconsistency, the test will fail.

## How to run

```bash
git clone https://github.com/dai-shi/will-this-react-global-state-work-in-concurrent-rendering.git
cd will-this-react-global-state-work-in-concurrent-rendering
yarn install
yarn run build-all
yarn run jest
```

To automatically run tests and update the README.md on OSX:
```
yarn jest:json
yarn jest:update
```

## Screencast (old one with react-redux v7. v8 works great.)

<img src="https://user-images.githubusercontent.com/490574/61502196-ce109200-aa0d-11e9-9efc-6203545d367c.gif" alt="Preview" width="350" />

## Test scenario

- With useTransition
  - Level 1
    - 1: No tearing finally on update
    - 2: No tearing finally on mount
  - Level 2
    - 3: No tearing temporarily on update
    - 4: No tearing temporarily on mount
  - Level 3
    - 5: Can interrupt render (time slicing)
    - 6: Can branch state (wip state)
- With useDeferredValue
  - Level 1
    - 7: No tearing finally on update
    - 8: No tearing finally on mount
  - Level 2
    - 9: No tearing temporarily on update
    - 10: No tearing temporarily on mount

## Results

<details>
<summary>Raw Output</summary>

```
   With useTransition
     Level 1
       ✓ No tearing finally on update (8007 ms)
       ✓ No tearing finally on mount (4649 ms)
     Level 2
       ✓ No tearing temporarily on update (12953 ms)
       ✓ No tearing temporarily on mount (4612 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7954 ms)
       ✕ Can branch state (wip state) (6753 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9662 ms)
       ✓ No tearing finally on mount (4638 ms)
     Level 2
       ✓ No tearing temporarily on update (14640 ms)
       ✓ No tearing temporarily on mount (4554 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (7977 ms)
       ✓ No tearing finally on mount (4630 ms)
     Level 2
       ✓ No tearing temporarily on update (12952 ms)
       ✓ No tearing temporarily on mount (4567 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7927 ms)
       ✕ Can branch state (wip state) (6691 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9595 ms)
       ✓ No tearing finally on mount (4646 ms)
     Level 2
       ✓ No tearing temporarily on update (14643 ms)
       ✓ No tearing temporarily on mount (4602 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5581 ms)
       ✓ No tearing finally on mount (9534 ms)
     Level 2
       ✓ No tearing temporarily on update (8629 ms)
       ✓ No tearing temporarily on mount (9461 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3636 ms)
       ✓ Can branch state (wip state) (8184 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15407 ms)
       ✓ No tearing finally on mount (6550 ms)
     Level 2
       ✓ No tearing temporarily on update (19486 ms)
       ✓ No tearing temporarily on mount (6482 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4556 ms)
       ✓ No tearing finally on mount (7475 ms)
     Level 2
       ✓ No tearing temporarily on update (8661 ms)
       ✓ No tearing temporarily on mount (7463 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3665 ms)
       ✓ Can branch state (wip state) (5189 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9664 ms)
       ✓ No tearing finally on mount (5713 ms)
     Level 2
       ✓ No tearing temporarily on update (14652 ms)
       ✓ No tearing temporarily on mount (5653 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (7972 ms)
       ✓ No tearing finally on mount (4607 ms)
     Level 2
       ✓ No tearing temporarily on update (12966 ms)
       ✓ No tearing temporarily on mount (4575 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7929 ms)
       ✕ Can branch state (wip state) (6700 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9641 ms)
       ✓ No tearing finally on mount (4620 ms)
     Level 2
       ✓ No tearing temporarily on update (14654 ms)
       ✓ No tearing temporarily on mount (4562 ms)
 use-context-selector-base
   With useTransition
     Level 1
       ✓ No tearing finally on update (7914 ms)
       ✓ No tearing finally on mount (8522 ms)
     Level 2
       ✓ No tearing temporarily on update (12907 ms)
       ✓ No tearing temporarily on mount (7477 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7887 ms)
       ✕ Can branch state (wip state) (7644 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9678 ms)
       ✓ No tearing finally on mount (5714 ms)
     Level 2
       ✓ No tearing temporarily on update (14663 ms)
       ✓ No tearing temporarily on mount (5601 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5558 ms)
       ✓ No tearing finally on mount (11516 ms)
     Level 2
       ✓ No tearing temporarily on update (8675 ms)
       ✓ No tearing temporarily on mount (11470 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3612 ms)
       ✓ Can branch state (wip state) (8184 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15425 ms)
       ✓ No tearing finally on mount (6538 ms)
     Level 2
       ✓ No tearing temporarily on update (19498 ms)
       ✓ No tearing temporarily on mount (6487 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (7967 ms)
       ✓ No tearing finally on mount (4582 ms)
     Level 2
       ✓ No tearing temporarily on update (12940 ms)
       ✓ No tearing temporarily on mount (4568 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7939 ms)
       ✕ Can branch state (wip state) (6750 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9639 ms)
       ✓ No tearing finally on mount (4589 ms)
     Level 2
       ✓ No tearing temporarily on update (14691 ms)
       ✓ No tearing temporarily on mount (4582 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (8153 ms)
       ✓ No tearing finally on mount (4625 ms)
     Level 2
       ✓ No tearing temporarily on update (13097 ms)
       ✓ No tearing temporarily on mount (5571 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8063 ms)
       ✕ Can branch state (wip state) (7797 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (6528 ms)
       ✓ No tearing finally on mount (5636 ms)
     Level 2
       ✓ No tearing temporarily on update (9618 ms)
       ✕ No tearing temporarily on mount (5622 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (8020 ms)
       ✓ No tearing finally on mount (4644 ms)
     Level 2
       ✓ No tearing temporarily on update (12975 ms)
       ✓ No tearing temporarily on mount (4618 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7961 ms)
       ✕ Can branch state (wip state) (6730 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9676 ms)
       ✓ No tearing finally on mount (4647 ms)
     Level 2
       ✓ No tearing temporarily on update (14686 ms)
       ✓ No tearing temporarily on mount (4614 ms)
 recoil_UNSTABLE
   With useTransition
     Level 1
       ✓ No tearing finally on update (5649 ms)
       ✓ No tearing finally on mount (5551 ms)
     Level 2
       ✓ No tearing temporarily on update (8644 ms)
       ✕ No tearing temporarily on mount (5514 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3647 ms)
       ✕ Can branch state (wip state) (10197 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11335 ms)
       ✓ No tearing finally on mount (6542 ms)
     Level 2
       ✓ No tearing temporarily on update (15422 ms)
       ✕ No tearing temporarily on mount (5534 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (5576 ms)
       ✓ No tearing finally on mount (6495 ms)
     Level 2
       ✓ No tearing temporarily on update (9651 ms)
       ✕ No tearing temporarily on mount (7536 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4620 ms)
       ✕ Can branch state (wip state) (10204 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10652 ms)
       ✓ No tearing finally on mount (5676 ms)
     Level 2
       ✓ No tearing temporarily on update (15647 ms)
       ✕ No tearing temporarily on mount (5580 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (6569 ms)
       ✓ No tearing finally on mount (11512 ms)
     Level 2
       ✓ No tearing temporarily on update (9679 ms)
       ✓ No tearing temporarily on mount (9479 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4655 ms)
       ✓ Can branch state (wip state) (9275 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16430 ms)
       ✓ No tearing finally on mount (6569 ms)
     Level 2
       ✓ No tearing temporarily on update (20537 ms)
       ✓ No tearing temporarily on mount (6503 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (7998 ms)
       ✓ No tearing finally on mount (4664 ms)
     Level 2
       ✓ No tearing temporarily on update (12969 ms)
       ✓ No tearing temporarily on mount (4633 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7948 ms)
       ✕ Can branch state (wip state) (6709 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9620 ms)
       ✓ No tearing finally on mount (4587 ms)
     Level 2
       ✓ No tearing temporarily on update (14679 ms)
       ✓ No tearing temporarily on mount (4562 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (7979 ms)
       ✓ No tearing finally on mount (4591 ms)
     Level 2
       ✓ No tearing temporarily on update (12961 ms)
       ✓ No tearing temporarily on mount (4567 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7939 ms)
       ✕ Can branch state (wip state) (6663 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9623 ms)
       ✓ No tearing finally on mount (4587 ms)
     Level 2
       ✓ No tearing temporarily on update (14596 ms)
       ✓ No tearing temporarily on mount (4611 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (7995 ms)
       ✓ No tearing finally on mount (4591 ms)
     Level 2
       ✓ No tearing temporarily on update (13012 ms)
       ✓ No tearing temporarily on mount (4562 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7951 ms)
       ✕ Can branch state (wip state) (6723 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9653 ms)
       ✓ No tearing finally on mount (4641 ms)
     Level 2
       ✓ No tearing temporarily on update (14651 ms)
       ✓ No tearing temporarily on mount (4555 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4552 ms)
       ✓ No tearing finally on mount (7509 ms)
     Level 2
       ✓ No tearing temporarily on update (8630 ms)
       ✓ No tearing temporarily on mount (8502 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3647 ms)
       ✕ Can branch state (wip state) (9203 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9642 ms)
       ✓ No tearing finally on mount (6690 ms)
     Level 2
       ✓ No tearing temporarily on update (14655 ms)
       ✓ No tearing temporarily on mount (6583 ms)
 react-query
   With useTransition
     Level 1
       ✓ No tearing finally on update (8046 ms)
       ✓ No tearing finally on mount (4602 ms)
     Level 2
       ✕ No tearing temporarily on update (13039 ms)
       ✓ No tearing temporarily on mount (4567 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8023 ms)
       ✕ Can branch state (wip state) (6768 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9515 ms)
       ✓ No tearing finally on mount (4621 ms)
     Level 2
       ✓ No tearing temporarily on update (13623 ms)
       ✓ No tearing temporarily on mount (4567 ms)
 mobx-react-lite
   With useTransition
     Level 1
       ✓ No tearing finally on update (8006 ms)
       ✓ No tearing finally on mount (4607 ms)
     Level 2
       ✓ No tearing temporarily on update (12996 ms)
       ✓ No tearing temporarily on mount (4618 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7952 ms)
       ✕ Can branch state (wip state) (6696 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9713 ms)
       ✓ No tearing finally on mount (4629 ms)
     Level 2
       ✓ No tearing temporarily on update (14645 ms)
       ✓ No tearing temporarily on mount (4565 ms)
 global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (4597 ms)
       ✓ No tearing finally on mount (5503 ms)
     Level 2
       ✓ No tearing temporarily on update (8816 ms)
       ✕ No tearing temporarily on mount (6475 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3664 ms)
       ✕ Can branch state (wip state) (9138 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9627 ms)
       ✓ No tearing finally on mount (5543 ms)
     Level 2
       ✓ No tearing temporarily on update (14658 ms)
       ✕ No tearing temporarily on mount (5635 ms)

```
</details>

<table>
<tr><th>Test</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr>
	<tr>
		<th><a href="https://react-redux.js.org">react-redux</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/zustand">zustand</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://react-tracked.js.org">react-tracked</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/diegohaz/constate">constate</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/react-hooks-global-state">react-hooks-global-state</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/use-context-selector">use-context-selector</a> (w/ useReducer, w/o useContextUpdate)</th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/use-context-selector">use-context-selector</a> (w/ useReducer)</th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/facebook/react/tree/master/packages/use-subscription">use-subscription</a> (w/ redux)</th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/apollographql/apollo-client">apollo-client</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://recoiljs.org">recoil</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://recoiljs.org">recoil (UNSTABLE)</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/jotai">jotai</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/use-atom">use-atom</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/valtio">valtio</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/zerobias/effector">effector</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://react-rxjs.org">react-rxjs</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/MrWolfZ/simplux">simplux</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://react-query.tanstack.com/">react-query</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/mobxjs/mobx-react-lite">mobx-react-lite</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th>global-state</th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>

</table>

## Caveats

- Tearing and state branching may not be an issue depending on app requirements.
- The test is done in a very limited way.
  - Passing tests don't guarantee anything.
- The results may not be accurate.
  - Do not fully trust the results.

## If you are interested

The reason why I created this is to test my projects.

- [react-tracked](https://github.com/dai-shi/react-tracked)
- [use-context-selector](https://github.com/dai-shi/use-context-selector)
- and so on

## Contributing

This repository is a tool for us to test some of global state libraries.
While it is totally fine to use the tool for other libraries under the license,
we don't generally accept adding a new library to the repository.

However, we are interested in various approaches.
If you have any suggestions feel free to open issues or pull requests.
We may consider adding (and removing) libraries.
Questions and discussions are also welcome in issues.

For listing global state libraries, we have another repository
https://github.com/dai-shi/lets-compare-global-state-with-react-hooks
in which we accept contributions. It's recommended to run this tool
and we put the result there, possibly a reference link to a PR
in this repository or a fork of this repository.
