import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Modal component built on Ant Design Modal.

## Features
- Four size presets: sm, md, lg, xl
- Configurable close behavior (overlay click, escape key)
- Support for custom footer actions
- Centered by default
- All Ant Design Modal props supported

## Usage
\`\`\`tsx
import { Modal } from '@components/ui/Modal/Modal';

<Modal
  isOpen={showModal}
  onCancel={() => setShowModal(false)}
  title="Confirm"
>
  Modal content
</Modal>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Control modal visibility',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Modal width preset',
    },
    title: {
      control: 'text',
      description: 'Modal header title',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close when clicking overlay',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close on Escape key',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive example with state
const ModalDemo = ({
  size,
  title,
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  title?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        title={title || 'Modal Title'}
        size={size}
        onOk={() => setIsOpen(false)}
      >
        <p>This is the modal content.</p>
        <p>You can put any content here.</p>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const Small: Story = {
  render: () => <ModalDemo size="sm" title="Small Modal" />,
};

export const Medium: Story = {
  render: () => <ModalDemo size="md" title="Medium Modal" />,
};

export const Large: Story = {
  render: () => <ModalDemo size="lg" title="Large Modal" />,
};

export const ExtraLarge: Story = {
  render: () => <ModalDemo size="xl" title="Extra Large Modal" />,
};

// Modal with custom footer
const CustomFooterDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Custom Footer"
        footer={[
          <Button key="cancel" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger>
            Delete
          </Button>,
          <Button key="save" type="primary" onClick={() => setIsOpen(false)}>
            Save Changes
          </Button>,
        ]}
      >
        <p>This modal has a custom footer with multiple actions.</p>
      </Modal>
    </>
  );
};

export const CustomFooter: Story = {
  render: () => <CustomFooterDemo />,
};

// Modal without footer
const NoFooterDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Information"
        footer={null}
      >
        <p>This modal has no footer buttons.</p>
        <p>Close it using the X button or press Escape.</p>
      </Modal>
    </>
  );
};

export const NoFooter: Story = {
  render: () => <NoFooterDemo />,
};

// Confirmation modal
const ConfirmDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="primary" danger onClick={() => setIsOpen(true)}>
        Delete Item
      </Button>
      <Modal
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Confirm Delete"
        size="sm"
        okText="Delete"
        okButtonProps={{ danger: true }}
        onOk={() => setIsOpen(false)}
      >
        <p>Are you sure you want to delete this item?</p>
        <p>This action cannot be undone.</p>
      </Modal>
    </>
  );
};

export const Confirmation: Story = {
  render: () => <ConfirmDemo />,
};
