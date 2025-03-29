import { Request, Response } from "express";
import { Order } from "../../app/models/Order";


export async function changeOrderStatus(req: Request, res: Response ){
  try {
    const { orderId } = req.params
    const { status } = req.body
    console.log(orderId)
    if(['WAITING', '  ', 'DONE'].includes(status)){
      res.status(400).json({
        error: "Status should be waiting, in production or done"
      })
    }

    await Order.findByIdAndUpdate(orderId, {status});

    res.send(204)
  } catch (error){
    console.log(error)
    res.sendStatus(500)
  }

}
