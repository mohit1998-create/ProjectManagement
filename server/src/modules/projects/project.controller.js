const asyncHandler =
  require("../../utils/asyncHandler");

const sendResponse =
  require("../../utils/response");

const projectService =
  require("./project.service");

const createProject =
  asyncHandler(
    async (req, res) => {
      const project =
        await projectService.createProject(
          req.body,
          req.user._id
        );

      sendResponse(
        res,
        201,
        "Project created successfully",
        project
      );
    }
  );

const getProjects = asyncHandler(
  async (req, res) => {
    const result =
      await projectService.getProjects({
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        search: req.query.search,
        status: req.query.status,
        managerId: req.query.managerId,
      });

    sendResponse(
      res,
      200,
      "Projects fetched successfully",
      result
    );
  }
);

const getProjectById = asyncHandler(    
    async (req, res) => {   
        const project = await projectService.getProjectById(
            req.params.id
        );

        sendResponse(
            res,
            200,
            "Project fetched successfully",
            project
        );
    }
);
    
const updateProject = asyncHandler(
    async (req, res) => {
        const project = await projectService.updateProject(
            req.params.id,
            req.body
        );

        sendResponse(
            res,
            200,
            "Project updated successfully",
            project
        );
    }
);

const archiveProject = asyncHandler(    
    async (req, res) => {       
        const project = await projectService.archiveProject(
            req.params.id
        );

        sendResponse(
            res,
            200,
            "Project archived successfully",
            project
        );
    }
);              
module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  archiveProject
};  