interface Props {
  children?: React.ReactNode
  isShown: boolean
  onSubmit?: () => void
  onClose?: () => void
  submitName?: string
}

function Modal ({ children, isShown, onSubmit, onClose, submitName }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    ;(onSubmit != null) && onSubmit()
  }

  const handleClose = () => {
    (onClose != null) && onClose()
  }

  if (!isShown) return null

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 1,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0,0,0,0.6)'
      }}
    >
      <main
        style={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          height: '100%'
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '19rem',
            height: '21rem',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: '0.7rem'
          }}
        >
          <div
            style={{
              margin: '0.4rem 0rem'
            }}
          >
            <h3 style={{ display: 'inline-block' }}>Filters</h3>
            <i
              style={{
                float: 'right',
                fontStyle: 'normal',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#b6b6b6'
              }}
              onClick={handleClose}
            >
              x
            </i>
          </div>
          {children}
          <button type='submit'>{submitName || 'APPLY'}</button>
        </form>
      </main>
    </div>
  )
}

export default Modal
