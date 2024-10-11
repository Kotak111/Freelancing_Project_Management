const router=require("express").Router();
const PaymentController=require("../controller/payment.controller");
const { auth, IsUser } = require("../utils/auth");
/**
 * @swagger
 * /addpayment:
 *   post:
 *     summary: Create a new payment
 *     security:
 *       - bearerAuth: []
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               projectId:
 *                 type: string
 *               paymentDate:
 *                 type: string
 *                 format: date
 *               paymentMethod:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Bad request
 */
router.post("/addpayment", auth, IsUser, PaymentController.CreatePayment);
/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all payments
 *     security:
 *       - bearerAuth: []
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: A list of payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   projectId:
 *                     type: string
 *                   paymentDate:
 *                     type: string
 *                     format: date
 *                   paymentMethod:
 *                     type: string
 *                   status:
 *                     type: string
 *       400:
 *         description: Bad request
 */
router.get("/", auth, IsUser, PaymentController.FindAllPayment);
/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a payment by its ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Payments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment data
 *       404:
 *         description: Payment not found
 */
router.get("/:id", auth, IsUser, PaymentController.FindByIdPayment);
/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a payment by its ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Payments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment not found
 */
router.delete("/:id", auth, IsUser, PaymentController.DeletePayment);
/**
 * @swagger
 * /{id}:
 *   patch:
 *     summary: Update a payment by its ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Payments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       404:
 *         description: Payment not found
 */
router.patch("/:id", auth, IsUser, PaymentController.UpdatePayment);
/**
 * @swagger
 * /{id}/pay:
 *   post:
 *     summary: Mark a payment as paid (simulate payment gateway like Stripe)
 *     security:
 *       - bearerAuth: []
 *     tags: [Payments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment status updated successfully (Paid)
 *       404:
 *         description: Payment not found
 */
router.post("/:id/pay", auth, IsUser, PaymentController.PaymentStatus);


module.exports=router;