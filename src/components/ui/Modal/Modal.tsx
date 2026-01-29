import { Modal as AntdModal } from 'antd';
import type { ModalProps as AntdModalProps } from 'antd';
import styles from './Modal.module.scss';

export interface ModalProps extends AntdModalProps {
  /**
   * Control modal visibility (alias for `open`).
   */
  isOpen?: boolean;
  /**
   * Size preset for modal width.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Close modal when clicking overlay/mask.
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * Close modal on Escape key press.
   * @default true
   */
  closeOnEscape?: boolean;
}

const sizeWidthMap: Record<'sm' | 'md' | 'lg' | 'xl', number> = {
  sm: 400,
  md: 520,
  lg: 720,
  xl: 1000,
};

/**
 * Modal component built on Ant Design Modal.
 *
 * Provides dialog overlay with customizable size and behavior.
 *
 * @example
 * ```tsx
 * // Basic modal
 * <Modal
 *   isOpen={showModal}
 *   onCancel={() => setShowModal(false)}
 *   title="Confirm Action"
 * >
 *   Are you sure you want to proceed?
 * </Modal>
 *
 * // Large modal with custom footer
 * <Modal
 *   isOpen={showModal}
 *   onCancel={handleClose}
 *   title="Edit Profile"
 *   size="lg"
 *   footer={[
 *     <Button key="cancel" onClick={handleClose}>Cancel</Button>,
 *     <Button key="save" type="primary" onClick={handleSave}>Save</Button>,
 *   ]}
 * >
 *   <Form>...</Form>
 * </Modal>
 * ```
 */
export function Modal({
  isOpen,
  open,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  ...props
}: ModalProps) {
  const classNames = [styles.modal, className].filter(Boolean).join(' ');

  return (
    <AntdModal
      open={isOpen ?? open}
      width={sizeWidthMap[size]}
      maskClosable={closeOnOverlayClick}
      keyboard={closeOnEscape}
      className={classNames}
      centered
      {...props}
    />
  );
}
