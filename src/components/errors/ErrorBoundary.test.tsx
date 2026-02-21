// import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { ConfigProvider } from 'antd';
// import { ErrorBoundary } from './ErrorBoundary';
// import { lightTheme } from '@lib/antd/theme';

// const renderWithTheme = (ui: React.ReactElement) => {
//   return render(<ConfigProvider theme={lightTheme}>{ui}</ConfigProvider>);
// };

// // Component that throws an error
// function ThrowError({ shouldThrow = true }: { shouldThrow?: boolean }) {
//   if (shouldThrow) {
//     throw new Error('Test error message');
//   }
//   return <div>No error</div>;
// }

// function ConditionalThrow() {
//   if (shouldThrow) {
//     throw new Error('Test error');
//   }
// //   return <div>Recovered content</div>;
// // }

// // const { rerender } = renderWithTheme(
// //   <ErrorBoundary>
// //     <ConditionalThrow />
// //   </ErrorBoundary>
// // );

// // Should show error state
// expect(screen.getByText('Something went wrong')).toBeInTheDocument();

// // Stop throwing and click reset
// shouldThrow = false;
// await user.click(screen.getByRole('button', { name: 'Try again' }));

// // Should show recovered content
// expect(screen.getByText('Recovered content')).toBeInTheDocument();
// }

// // Component that throws on click
// // function ThrowOnClick() {
// //   const handleClick = () => {
// //     throw new Error('Click error');
// //   };
// //   return <button onClick={handleClick}>Throw Error</button>;
// // }

// describe('ErrorBoundary', () => {
//   let consoleSpy: ReturnType<typeof vi.spyOn>;

//   beforeEach(() => {
//     // Suppress console.error during tests
//     consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
//   });

//   afterEach(() => {
//     consoleSpy.mockRestore();
//   });

//   it('renders children when there is no error', () => {
//     renderWithTheme(
//       <ErrorBoundary>
//         <div>Child content</div>
//       </ErrorBoundary>
//     );
//     expect(screen.getByText('Child content')).toBeInTheDocument();
//   });

//   it('renders ErrorFallback when an error is thrown', () => {
//     renderWithTheme(
//       <ErrorBoundary>
//         <ThrowError />
//       </ErrorBoundary>
//     );
//     expect(screen.getByRole('alert')).toBeInTheDocument();
//     expect(screen.getByText('Something went wrong')).toBeInTheDocument();
//     expect(screen.getByText('Test error message')).toBeInTheDocument();
//   });

//   it('renders custom fallback when provided', () => {
//     renderWithTheme(
//       <ErrorBoundary fallback={<div>Custom error UI</div>}>
//         <ThrowError />
//       </ErrorBoundary>
//     );
//     expect(screen.getByText('Custom error UI')).toBeInTheDocument();
//     expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
//   });

//   it('logs error to console', () => {
//     renderWithTheme(
//       <ErrorBoundary>
//         <ThrowError />
//       </ErrorBoundary>
//     );

//     expect(consoleSpy).toHaveBeenCalled();
//     // Check that the error was logged with the correct message
//     const errorCalls = consoleSpy.mock.calls.filter(
//       (call) => call[0] === 'Error caught by boundary:'
//     );
//     expect(errorCalls.length).toBeGreaterThan(0);
//   });

//   it('shows Try again button in default fallback', () => {
//     renderWithTheme(
//       <ErrorBoundary>
//         <ThrowError />
//       </ErrorBoundary>
//     );
//     expect(
//       screen.getByRole('button', { name: 'Try again' })
//     ).toBeInTheDocument();
//   });

//   it('resets error state when Try again is clicked', async () => {
//     const user = userEvent.setup();
//     let shouldThrow = true;

//     // function ConditionalThrow() {
//     //   if (shouldThrow) {
//     //     throw new Error('Test error');
//     //   }
//     //   return <div>Recovered content</div>;
//     // }

//     // const { rerender } = renderWithTheme(
//     //   <ErrorBoundary>
//     //     <ConditionalThrow />
//     //   </ErrorBoundary>
//     // );

//     // Should show error state
//     expect(screen.getByText('Something went wrong')).toBeInTheDocument();

//     // Stop throwing and click reset
//     shouldThrow = false;
//     await user.click(screen.getByRole('button', { name: 'Try again' }));

//     // Should show recovered content
//     expect(screen.getByText('Recovered content')).toBeInTheDocument();
//   });

//   it('handles multiple children', () => {
//     renderWithTheme(
//       <ErrorBoundary>
//         <div>Child 1</div>
//         <div>Child 2</div>
//         <div>Child 3</div>
//       </ErrorBoundary>
//     );
//     expect(screen.getByText('Child 1')).toBeInTheDocument();
//     expect(screen.getByText('Child 2')).toBeInTheDocument();
//     expect(screen.getByText('Child 3')).toBeInTheDocument();
//   });

//   it('catches errors from nested components', () => {
//     function NestedComponent() {
//       return (
//         <div>
//           <ThrowError />
//         </div>
//       );
//     }

//     renderWithTheme(
//       <ErrorBoundary>
//         <NestedComponent />
//       </ErrorBoundary>
//     );

//     expect(screen.getByRole('alert')).toBeInTheDocument();
//     expect(screen.getByText('Test error message')).toBeInTheDocument();
//   });

//   it('isolates errors to single boundary', () => {
//     renderWithTheme(
//       <div>
//         <ErrorBoundary>
//           <ThrowError />
//         </ErrorBoundary>
//         <ErrorBoundary>
//           <div>This should render</div>
//         </ErrorBoundary>
//       </div>
//     );

//     expect(screen.getByRole('alert')).toBeInTheDocument();
//     expect(screen.getByText('This should render')).toBeInTheDocument();
//   });
// });
