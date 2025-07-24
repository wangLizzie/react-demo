import { useOptimistic, startTransition } from 'react'
 import { reserveSeat, processPayment, sendConfirmation } from './api'

 function BookFlight() {
     const [message, setMessage] = useOptimistic('准备预订')

     async function handleBooking(formData) {
         let cancelled = false
         const cancelIfUnmounted = () => {
             if (cancelled) throw new Error('Component unmounted')
         }

         startTransition(async () => {
             try {
                 setMessage('正在预订座位...')
                 await reserveSeat(formData.get('flight'))
                 cancelIfUnmounted()

                 setMessage('正在处理付款...')
                 await processPayment(formData.get('passenger'))
                 cancelIfUnmounted()

                 setMessage('正在发送确认信息...')
                 const bookingId = await sendConfirmation(
                     formData.get('passenger'),
                     formData.get('flight'),
                 )
                 cancelIfUnmounted()

                 setMessage('预订成功！正在跳转...')
                 console.log(`跳转到 /booking/${bookingId}`)
             } catch (e) {
                 console.error('预订失败', e)
                 setMessage('预订失败，请稍后重试')
             }
         })

         return () => {
             cancelled = true
         }
     }

     return (
         <form action={handleBooking}>
             <input name="passenger" placeholder="乘客姓名" required />
             <input name="flight" placeholder="航班号" required />
             <button type="submit">预订航班</button>
             <div className="mt-2">
                 <strong>状态：</strong> {message}
             </div>
         </form>
     )
 }
 export default BookFlight;