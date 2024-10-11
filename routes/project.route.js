const router=require("express").Router();
const ProjectController=require("../controller/project.controller");
const { auth, IsUser } = require("../utils/auth");
const upload=require("../utils/csv.upload")
/**
 * @swagger
 * /addproject:
 *   post:
 *     summary: Create a new project
 *     security:
 *       - bearerAuth: []
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               budget:
 *                 type: number
 *               clientId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Bad request
 */
router.post("/addproject", auth, IsUser, ProjectController.CreateProject);
/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all projects
 *     security:
 *       - bearerAuth: []
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                     format: date
 *                   endDate:
 *                     type: string
 *                     format: date
 *                   budget:
 *                     type: number
 *                   clientId:
 *                     type: string
 *       400:
 *         description: Bad request
 */
router.get("/", auth, IsUser, ProjectController.FindAllProject);
/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a project by its ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Projects]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project data
 *       404:
 *         description: Project not found
 */
router.get("/:id", auth, IsUser, ProjectController.FindById);
/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a project by its ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Projects]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 */
router.delete("/:id", auth, IsUser, ProjectController.DeleteProject);
/**
 * @swagger
 * /{id}:
 *   patch:
 *     summary: Update a project by its ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Projects]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               budget:
 *                 type: number
 *               clientId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       404:
 *         description: Project not found
 */
router.patch("/:id", auth, IsUser, ProjectController.UpdateProject);
/**
 * @swagger
 * /export:
 *   get:
 *     summary: Export all project data to CSV
 *     security:
 *       - bearerAuth: []
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A CSV file of all projects
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get("/export", auth, IsUser, ProjectController.BulkUpload);
/**
 * @swagger
 * /import:
 *   post:
 *     summary: Import project data from a CSV file
 *     security:
 *       - bearerAuth: []
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Projects imported successfully
 *       400:
 *         description: Invalid CSV format
 */
router.post("/import", auth, IsUser, upload.single("file"), ProjectController.ImportCsv);

module.exports=router;