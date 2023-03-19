import { useState, useRef, useId, type ElementType } from 'react'
import { useFloating, offset, arrow, shift, FloatingPortal, type Placement } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderChildren: React.ReactNode
  as?: ElementType
  initialState?: boolean
  placement?: Placement
  className?: string
}

function Popover({
  children,
  renderChildren,
  as: Element = 'div',
  initialState,
  placement = 'bottom-end',
  className
}: Props) {
  const shiftByOnePixel = {
    name: 'shiftByOnePixel',
    fn: ({ x, y }: { x: number; y: number }) => ({ x: x + 10, y: y + 0 })
  }
  const id = useId()
  const arrowRef = useRef(null)
  const [isOpen, setIsOpen] = useState(initialState || false)
  const { x, y, strategy, refs, middlewareData } = useFloating({
    middleware: [
      offset(5),
      shift(),
      arrow({
        element: arrowRef
      }),
      shiftByOnePixel
    ],
    placement: placement
  })
  const Show = () => {
    setIsOpen(true)
  }
  const hide = () => {
    setIsOpen(false)
  }

  const newClassName = className ? className : 'flex cursor-pointer items-center py-2 hover:text-gray-300'
  return (
    <Element ref={refs.setReference} className={newClassName} onMouseEnter={Show} onMouseLeave={hide}>
      {/* children */}
      {children}
      {/* popover menu */}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {/* Floating */}
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                zIndex: 20,
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
                className='absolute z-10 hidden translate-y-[-95%] translate-x-[-10px] border-[11px] border-x-transparent border-t-transparent border-b-white sm:block'
                style={{
                  top: middlewareData.arrow?.y,
                  left: middlewareData.arrow?.x
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
