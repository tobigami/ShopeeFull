import { useState, useRef, useId, type ElementType } from 'react'
import { useFloating, offset, arrow, shift, FloatingPortal } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderChildren: React.ReactNode
  as?: ElementType
}

function Popover({ children, renderChildren, as: Element = 'div' }: Props) {
  const id = useId()
  const arrowRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const { x, y, strategy, refs, middlewareData } = useFloating({
    middleware: [
      offset(5),
      shift(),
      arrow({
        element: arrowRef
      })
    ]
  })
  const show = () => setIsOpen(true)
  const hide = () => setIsOpen(false)
  return (
    <Element
      ref={refs.setReference}
      className='flex items-center py-2 hover:text-gray-300 cursor-pointer'
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {/* children */}
      {children}
      {/* popover menu */}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              {/* arrow */}
              <span
                ref={arrowRef}
                className='border-x-transparent border-t-transparent absolute z-10 translate-y-[-95%] border-b-white border-[11px]'
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />
              {/* render children */}
              {renderChildren}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}

export default Popover
