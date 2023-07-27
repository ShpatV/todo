/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const errorHandlerMiddleware = require('../error/errorHandlerMiddleware');



router.get('/tasks', todoController.getAllTasks);
router.get('/tasks/:taskId', todoController.getTaskById);
router.post('/tasks', todoController.createTask);
router.put('/tasks/:taskId', todoController.updateTask);
router.delete('/tasks/:taskId', todoController.deleteTask);

router.use(errorHandlerMiddleware);

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         categoryId:
 *           type: string
 *         due_date:
 *           type: string
 *           format: date
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Merr të gjitha Task-et
 *     description: Kthen një listë me të gjitha Task-et
 *     responses:
 *       200:
 *         description: Sukses
 *       500:
 *         description: Gabim gjatë kërkesës
 */

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   get:
 *     summary: Merr një Task me ID
 *     description: Kthen një Task me ID të dhënë
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID e Task-ut
 *     responses:
 *       200:
 *         description: Sukses
 *       404:
 *         description: Task-i nuk u gjet
 *       500:
 *         description: Gabim gjatë kërkesës
 */

/**
 * @swagger
 /**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Krijo një Task të ri
 *     description: Krijo një Task të ri me të dhënat e dhëna
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: integer
 *               due_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Task-i u krijua me sukses
 *       400:
 *         description: Dështoi krijimi i Task-ut
 *       500:
 *         description: Gabim gjatë kërkesës
 */


/**
 * @swagger
 * /api/tasks/{taskId}:
 *   put:
 *     summary: Përditëso një Task me ID
 *     description: Përditëso një Task me ID të dhënë me të dhënat e reja
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID e Task-ut
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task-i u përditësua me sukses
 *       404:
 *         description: Task-i nuk u gjet
 *       500:
 *         description: Gabim gjatë kërkesës
 */

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   delete:
 *     summary: Fshi një Task me ID
 *     description: Fshi një Task me ID të dhënë
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID e Task-ut
 *     responses:
 *       200:
 *         description: Task-i u fshi me sukses
 *       404:
 *         description: Task-i nuk u gjet
 *       500:
 *         description: Gabim gjatë kërkesës
 */



module.exports = router;
