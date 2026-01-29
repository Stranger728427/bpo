import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer, DrawerProps } from './Drawer';
import { Button } from '../Button/Button';

const meta = {
  title: 'UI/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const DrawerDemo = (args: DrawerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
      <Drawer {...args} isOpen={open} onClose={() => setOpen(false)}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export const Default: Story = {
  render: () => <DrawerDemo title="Default Drawer" />,
};

export const Small: Story = {
  render: () => <DrawerDemo title="Small Drawer" size="sm" />,
};

export const Medium: Story = {
  render: () => <DrawerDemo title="Medium Drawer" size="md" />,
};

export const Large: Story = {
  render: () => <DrawerDemo title="Large Drawer" size="lg" />,
};

export const FullWidth: Story = {
  render: () => <DrawerDemo title="Full Width Drawer" size="full" />,
};

export const LeftPlacement: Story = {
  render: () => <DrawerDemo title="Left Drawer" placement="left" />,
};

export const TopPlacement: Story = {
  render: () => <DrawerDemo title="Top Drawer" placement="top" size="md" />,
};

export const WithFooter: Story = {
  render: () => (
    <DrawerDemo
      title="Drawer with Footer"
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button style={{ marginRight: 8 }}>Cancel</Button>
          <Button type="primary">Submit</Button>
        </div>
      }
    />
  ),
};

export const NoMask: Story = {
  render: () => <DrawerDemo title="No Mask Drawer" mask={false} />,
};
