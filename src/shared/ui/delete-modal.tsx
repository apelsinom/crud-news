import { createPortal } from 'react-dom'
import { Button } from '@/shared/ui/button.tsx'

type Props = {
  title: string
  actionTitle: string
  cancelTitle: string
  onOpenChange: () => void
  handleDelete: () => void
}

export const DeleteModal = ({
  onOpenChange,
  handleDelete,
  title,
  cancelTitle,
  actionTitle,
}: Props) => {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white text-black dark:bg-dark-bg dark:text-white p-6 rounded shadow-xl">
        <p className="mb-4 text-lg">{title}</p>
        <div className="flex justify-end gap-3">
          <Button onClick={onOpenChange}>{cancelTitle}</Button>
          <Button onClick={handleDelete} variant={'danger'}>
            {actionTitle}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}
