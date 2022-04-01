import Swal from 'sweetalert2'

export const handleError = ({ reason = '發生無法預期的錯誤', message = '' }) => {
  Swal.fire({
    icon: 'error',
    title: '發生錯誤',
    text: `${reason || message}`,
  })
}