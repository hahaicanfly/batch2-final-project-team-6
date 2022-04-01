import Swal from 'sweetalert2'

export const handleError = ({ reason = '發生無法預期的錯誤', message = '' }) => {
  Swal.fire({
    icon: 'error',
    title: '發生錯誤',
    text: `${reason || message}`,
  })
}

export const showConnectWallet = () => {
  Swal.fire({
    icon: 'info',
    title: '提醒',
    text: `請先連接錢包`,
  })
}