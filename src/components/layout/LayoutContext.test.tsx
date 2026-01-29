import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LayoutProvider, useLayout } from './LayoutContext';

// Test component to access context values
function TestConsumer() {
  const { isSidebarExpanded, toggleSidebar, expandSidebar, collapseSidebar } =
    useLayout();

  return (
    <div>
      <span data-testid="status">
        {isSidebarExpanded ? 'expanded' : 'collapsed'}
      </span>
      <button onClick={toggleSidebar}>Toggle</button>
      <button onClick={expandSidebar}>Expand</button>
      <button onClick={collapseSidebar}>Collapse</button>
    </div>
  );
}

describe('LayoutContext', () => {
  describe('LayoutProvider', () => {
    it('provides context to children', () => {
      render(
        <LayoutProvider>
          <TestConsumer />
        </LayoutProvider>
      );
      expect(screen.getByTestId('status')).toBeInTheDocument();
    });

    it('defaults to collapsed sidebar', () => {
      render(
        <LayoutProvider>
          <TestConsumer />
        </LayoutProvider>
      );
      expect(screen.getByTestId('status')).toHaveTextContent('collapsed');
    });

    it('respects defaultExpanded prop when true', () => {
      render(
        <LayoutProvider defaultExpanded={true}>
          <TestConsumer />
        </LayoutProvider>
      );
      expect(screen.getByTestId('status')).toHaveTextContent('expanded');
    });

    it('respects defaultExpanded prop when false', () => {
      render(
        <LayoutProvider defaultExpanded={false}>
          <TestConsumer />
        </LayoutProvider>
      );
      expect(screen.getByTestId('status')).toHaveTextContent('collapsed');
    });
  });

  describe('useLayout', () => {
    it('throws error when used outside LayoutProvider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestConsumer />);
      }).toThrow('useLayout must be used within a LayoutProvider');

      consoleSpy.mockRestore();
    });

    it('toggleSidebar toggles the sidebar state', async () => {
      const user = userEvent.setup();
      render(
        <LayoutProvider>
          <TestConsumer />
        </LayoutProvider>
      );

      expect(screen.getByTestId('status')).toHaveTextContent('collapsed');

      await user.click(screen.getByRole('button', { name: 'Toggle' }));
      expect(screen.getByTestId('status')).toHaveTextContent('expanded');

      await user.click(screen.getByRole('button', { name: 'Toggle' }));
      expect(screen.getByTestId('status')).toHaveTextContent('collapsed');
    });

    it('expandSidebar sets sidebar to expanded', async () => {
      const user = userEvent.setup();
      render(
        <LayoutProvider defaultExpanded={false}>
          <TestConsumer />
        </LayoutProvider>
      );

      expect(screen.getByTestId('status')).toHaveTextContent('collapsed');

      await user.click(screen.getByRole('button', { name: 'Expand' }));
      expect(screen.getByTestId('status')).toHaveTextContent('expanded');

      // Clicking expand again should keep it expanded
      await user.click(screen.getByRole('button', { name: 'Expand' }));
      expect(screen.getByTestId('status')).toHaveTextContent('expanded');
    });

    it('collapseSidebar sets sidebar to collapsed', async () => {
      const user = userEvent.setup();
      render(
        <LayoutProvider defaultExpanded={true}>
          <TestConsumer />
        </LayoutProvider>
      );

      expect(screen.getByTestId('status')).toHaveTextContent('expanded');

      await user.click(screen.getByRole('button', { name: 'Collapse' }));
      expect(screen.getByTestId('status')).toHaveTextContent('collapsed');

      // Clicking collapse again should keep it collapsed
      await user.click(screen.getByRole('button', { name: 'Collapse' }));
      expect(screen.getByTestId('status')).toHaveTextContent('collapsed');
    });

    it('context functions are stable (memoized)', async () => {
      let capturedFunctions: {
        toggleSidebar: () => void;
        expandSidebar: () => void;
        collapseSidebar: () => void;
      }[] = [];

      function CaptureFunctions() {
        const { toggleSidebar, expandSidebar, collapseSidebar } = useLayout();
        capturedFunctions.push({ toggleSidebar, expandSidebar, collapseSidebar });
        return <button onClick={toggleSidebar}>Toggle</button>;
      }

      const { rerender } = render(
        <LayoutProvider>
          <CaptureFunctions />
        </LayoutProvider>
      );

      rerender(
        <LayoutProvider>
          <CaptureFunctions />
        </LayoutProvider>
      );

      // Functions should be the same reference between renders
      expect(capturedFunctions[0].toggleSidebar).toBe(
        capturedFunctions[1].toggleSidebar
      );
      expect(capturedFunctions[0].expandSidebar).toBe(
        capturedFunctions[1].expandSidebar
      );
      expect(capturedFunctions[0].collapseSidebar).toBe(
        capturedFunctions[1].collapseSidebar
      );
    });
  });
});
